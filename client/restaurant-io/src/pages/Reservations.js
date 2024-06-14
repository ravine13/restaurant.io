import React, { useContext, useEffect, useState } from 'react'
import Booking from '../components/Booking'
import { UserContext } from '../context/UserContext'

const Reservations = () => {
    const [bookings, setBookings] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const {authToken, apiEndpoint} = useContext(UserContext)
    

    useEffect(() => {
        setIsLoading(true)
        fetch(`http://127.0.0.1:5555/bookings`, {
          method:"GET",
          headers: {
            Authorization: `Bearer ${authToken && authToken}`,
          },
        })
          .then((res) => {
            if (res.ok) {
              return res.json()
            }
          })
          .then((data) => {
            setBookings(data)
            setIsLoading(false)
          })
    },[authToken, apiEndpoint])

    if (isLoading)
        return <h2 className="text-2xl text-center mt-12">Loading...</h2>

  return (
    <ul className="my-12 flex flex-col flex-wrap gap-4">
      {bookings?.length > 0 ? (
        bookings?.map((booking) => {
          return <Booking key={booking.id} booking={booking} />
        })
      ) : (
        <h2 className="text-2xl text-center mt-12">
          No reservations available.
        </h2>
      )}
    </ul>
  )
}

export default Reservations