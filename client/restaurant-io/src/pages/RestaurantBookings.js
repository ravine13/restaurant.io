import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../context/UserContext'
import Booking from '../components/Booking'
import { Link } from 'react-router-dom'

const RestaurantBookings = () => {
    const [restaurants, setRestaurants] = useState({})
    const [isLoading, setIsLoading] = useState(true)
    const {authToken, apiEndpoint} = useContext(UserContext)

    useEffect(()=> {
        setIsLoading(true)
        fetch(`http://127.0.0.1:5555/user/restaurant`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${authToken && authToken}`,
          },
        }).then(res => {
            if(res.ok){
                return res.json()
            }
        }).then(data => {
            setRestaurants(data)
            setIsLoading(false)
        })
    }, [authToken, apiEndpoint])

    if (isLoading)
      return <h2 className="text-2xl text-center mt-12">Loading...</h2>

    return (
      <div className="my-12 max-w-xl flex flex-col gap-4 border border-zinc-300 p-4 rounded">
        {restaurants?.length > 0 ? (
          restaurants.map((restaurant) => {
            return (
              <section>
                <h3 className="text-lg font-semibold mb-4">
                  Reservations for {restaurant.name}
                </h3>
                <ul className="flex flex-col gap-4 ">
                  {restaurant.bookings.map((booking) => {
                    return <Booking booking={booking} key={booking.id} />
                  })}
                </ul>
              </section>
            )
          })
        ) : (
          <h2 className="text-2xl text-center mt-12">No restaurants available. <Link to='/register_restaurant' className="text-cyan-500 ml-1">Register here.</Link></h2>
        )}
      </div>
    )
}

export default RestaurantBookings