import React from 'react'
import peopleOutline from '../assets/images/people-outline.svg'

const Booking = ({booking}) => {
  return (
    <li className="border border-zinc-300 py-2 px-4 max-w-xl rounded-md">
      <div className="flex flex-wrap gap-4 justify-between items-center my-2">
        <h3 className="text-lg font-semibold">
          {booking?.restaurant?.name} Reservation no: 00{booking?.id}
        </h3>
        <span className="flex gap-2">
          <img className="w-5" src={peopleOutline} alt="restaurant icon" />
          seats {booking.party_size}
        </span>
      </div>
      <div className="flex justify-between mt-2">
        <span>{booking.booking_time}</span>
        <small>{booking.booking_date}</small>
      </div>
    </li>
  )
}

export default Booking