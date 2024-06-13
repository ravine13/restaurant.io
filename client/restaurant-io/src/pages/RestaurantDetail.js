
import React, { useContext, useEffect, useState } from 'react'
import peopleOutline from '../assets/images/people-outline.svg'
import locationOutline from '../assets/images/location-outline.svg'
import callOutline from '../assets/images/call-outline.svg'
import Review from '../components/Review'
import BookingForm from '../components/BookingForm'
import { Link, useParams } from 'react-router-dom'
import AddReviewForm from '../components/AddReviewForm'
import { UserContext } from '../context/UserContext'
import { RestaurantsContext } from '../context/RestaurantsContext'
import { Button } from 'flowbite-react'
import Swal from 'sweetalert2'
import Loader from '../components/Loader'

const RestaurantDetail = () => {
  const [restaurant, setRestaurant] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(true)
  const [onchange, setOnchange] = useState(false)
  const { apiEndpoint, currentUser } = useContext(UserContext)
  const {currentRestaurant, setCurrentRestaurant, deleteRestaurant} = useContext(RestaurantsContext)

  const { id } = useParams()

  useEffect(() => {
    setIsLoading(true)
    setError(false)
    fetch(`http://127.0.0.1:5555/restaurants/${id}`)
      .then((res) => {
        if (res.status === 404) {
          setError(true)
          return
        }
        return res.json()
      })
      .then((data) => {
        setRestaurant(data)
        setCurrentRestaurant(data)
        setIsLoading(false)
        window.scrollTo(0, 0);
      })
  }, [onchange, id, apiEndpoint, setCurrentRestaurant])

  function handleDelete(){
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: 'gray',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        deleteRestaurant()
      }
    })
  }

  if (isLoading)
    return <Loader />

  if (error)
    return <h2 className="text-2xl text-center mt-12">Restaurant not found</h2>

  return (
    <section className="w-full max-w-[1280px] mx-auto px-4">
      <h2 className="text-3xl font-semibold my-12">{restaurant.name}</h2>
      <div className="flex flex-col md:flex-row gap-6 md:gap-10 xl:gap-20">
        <div className="w-full max-w-[670px]">
          <img
            className="rounded-2xl max-h-[600px] w-full object-cover"
            src={restaurant.restaurant_img}
            alt={restaurant.name}
          />
          <h3 className="mt-6 mb-4 text-2xl">About</h3>
          <p>{restaurant.description}</p>
          <div className="flex flex-wrap flex-col md:flex-row gap-6 mt-4">
            <p className="flex gap-2">
              {' '}
              <img className="w-5" src={peopleOutline} alt="icon" />
              Available seats {restaurant.capacity}
            </p>
            <p className="flex gap-2">
              {' '}
              <img className="w-5" src={locationOutline} alt="icon" />
              {restaurant.location}
            </p>
            <p className="flex gap-2">
              {' '}
              <img className="w-5" src={callOutline} alt="icon" />
              {restaurant.phone_no}
            </p>
          </div>
        </div>
        <div>
          {currentRestaurant?.owner_id !== currentUser?.id  && (
            <BookingForm onchange={onchange} setOnchange={setOnchange} />
          )}
          {currentRestaurant?.owner_id === currentUser?.id  && (
            <div className="flex gap-4 mt-5">
              <Button gradientDuoTone="cyanToBlue">
                <Link to="/edit_restaurant">Update</Link>
              </Button>
              <button onClick={handleDelete} className="px-4 py-2 rounded-lg text-white bg-red-500 hover:bg-red-600">
                Delete
              </button>
            </div>
          )}
        </div>
      </div>
      <div className="mt-12 w-full max-w-[800px] ">
        <h5 className="text-xl text-center mb-8">Reviews</h5>
        <ul className="flex flex-col gap-4 mt-4">
          {restaurant.reviews.map((review) => {
            return (
              <Review
                onchange={onchange}
                setOnchange={setOnchange}
                isLoading={isLoading}
                review={review}
                key={review.id}
              />
            )
          })}
        </ul>
        <AddReviewForm onchange={onchange} setOnchange={setOnchange} />
      </div>
      <Link to="/restaurants" className="text-cyan-500 mt-8 inline-block">
        {' '}
        &lt; Back
      </Link>
    </section>
  )
}

export default RestaurantDetail
