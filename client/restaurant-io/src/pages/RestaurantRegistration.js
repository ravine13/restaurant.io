import React, { useContext, useEffect } from 'react'
import { Button, Textarea, Label, TextInput } from 'flowbite-react'
import { RestaurantsContext } from '../context/RestaurantsContext'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../context/UserContext'

const RestaurantRegistration = () => {
    const {addRestaurant} = useContext(RestaurantsContext)
    const {currentUser} = useContext(UserContext)

    const navigate = useNavigate()

    useEffect(() => {
      if (!currentUser) {
        navigate('/login')
      }
    }, [currentUser, navigate])

    function handleSubmit(e) {
        e.preventDefault()
        const formData = new FormData(e.currentTarget)
        const restaurant = Object.fromEntries(formData)

        for (const arr of [...formData.entries()]){
            if(arr.includes(' ')) return
        }
        
        addRestaurant(restaurant)
    }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex max-w-xl mx-auto px-4 md:px-6 mt-12 flex-col gap-4 border py-10 rounded-2xl border-zinc-300 shadow-xl">
      <h2 className="text-2xl font-semibold text-center mb-6">
        Register your restaurant
      </h2>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="name" value="Restaurant name" />
        </div>
        <TextInput id="name" name="name" type="text" required />
      </div>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="phone" value="Phone" />
        </div>
        <TextInput id="phone" name="phone_no" type="number" required />
      </div>
      <div className="max-w-md">
        <div className="mb-2 block">
          <Label htmlFor="description" value="Description" />
        </div>
        <Textarea id="description" name="description" required rows={4} />
      </div>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="image" value="Image" />
        </div>
        <TextInput id="image" name="restaurant_img" type="text" required />
      </div>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="location" value="Location" />
        </div>
        <TextInput id="location" name="location" type="text" />
      </div>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="capacity" value="Capacity" />
        </div>
        <TextInput
          id="capacity"
          name="capacity"
          type="number"
          min="1"
          required
        />
      </div>
      <Button gradientDuoTone="cyanToBlue" type="submit">
        Submit
      </Button>
    </form>
  )
}

export default RestaurantRegistration