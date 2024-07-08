import React, { useContext } from "react"
import trashOutline from '../assets/images/trash-outline.svg'
import { UserContext } from "../context/UserContext"
import RatingComponent from "./Rating"

const Review = ({review, onchange, setOnchange}) => {
    const {authToken, currentUser, apiEndpoint} = useContext(UserContext)

    function handleDelete(id){
        fetch(`https://restaurant-io-c3kq.onrender.com/reviews/${id}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${authToken && authToken}`,
          }
        }).then(res => {
            if(res.ok){
                setOnchange(!onchange)
            }
        })
    }
  return (
    <li className="border border-zinc-300 py-2 px-4 rounded-[10px]">
      <div className="flex justify-between items-center">
          <div className='flex gap-4 items-center my-2'>
            <img className='w-12 h-12 rounded-full object-cover object-top'
              src={review.user?.profile_img}
              alt={review.user?.username}
            />
            <span>{review.user?.username}</span>
          </div>
          <div className="flex gap-2">
            {currentUser && review.user_id === currentUser.id ?
            <button onClick={id => handleDelete(review.id)} aria-label="delete">
                <img className="w-4" src={trashOutline} alt="icon" />
            </button>
            : null
        }
          </div>
      </div>
      <p>
        {review.comment}
      </p>
      <div className="flex justify-between mt-2">
        <span> 
          <RatingComponent rating={review.rating} />
        </span>
        <small className='text-zinc-400'>{review.date_posted}</small>
      </div>
    </li>
  )
}

export default Review