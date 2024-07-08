import React, { useContext } from 'react'
import { Button, Textarea, Label, TextInput } from 'flowbite-react'
import { useNavigate, useParams } from 'react-router-dom'
import { UserContext } from '../context/UserContext'

const AddReview= ({onchange, setOnchange}) => {
    const { authToken, currentUser } = useContext(UserContext)
    const {id} = useParams()

    const navigate = useNavigate()

    function handleSubmit(e){
        e.preventDefault()
        if (!currentUser) {
            navigate('/login')
        }
        const formData = new FormData(e.currentTarget)
        const comment = formData.get('comment')
        const rating = formData.get('rating')
        if(!comment || !rating) return
        fetch(`https://restaurant-io-c3kq.onrender.com/reviews`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${authToken && authToken}`,
            },
            body: JSON.stringify({comment, rating, restaurant_id:id})
        })
        .then(res => {
            if(res.ok){
                setOnchange(!onchange)
            }
        })
    }
  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-4 w-full">
      <div className="flex flex-col md:flex-row gap-4">
          <div className='w-full'>
            <div className="mb-2 block">
              <Label htmlFor="comment" value="Comment" />
            </div>
            <Textarea id="comment" name="comment" required rows={3} />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="rating" value="Rating" />
            </div>
            <TextInput
              className="md:w-24"
              id="rating"
              name="rating"
              type="number"
              min="1"
              max="5"
              required
            />
          </div>
      </div>
      <Button gradientDuoTone="cyanToBlue" type="submit" className="md:w-1/3">
        Add review
      </Button>
    </form>
  )
}

export default AddReview