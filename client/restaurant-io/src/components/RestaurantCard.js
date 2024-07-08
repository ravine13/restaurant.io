import peopleOutline from '../assets/images/people-outline.svg'
import locationOutline from '../assets/images/location-outline.svg'
import { Link } from 'react-router-dom'

export default function RestaurantCard({restaurant}) {
  return (
    <Link to={`https://restaurant-io-c3kq.onrender.com/restaurants/${restaurant.id}`}>
      <div className="w-[360px] p-0 border rounded-2xl">
        <img
          className="object-cover w-full h-[240px] rounded-t-2xl"
          src={restaurant.poster}
          alt={restaurant.name}
        />
        <div className="p-4 h-[120px] flex flex-col gap-1">
          <h5 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
            {restaurant.name}
          </h5>
          <p className="flex gap-2 text-sm">
            {' '}
            <img className="w-5" src={peopleOutline} alt="restaurant icon" />
            Available seats {restaurant.capacity}
          </p>
          <p className="flex gap-2 text-sm">
            {' '}
            <img className="w-5" src={locationOutline} alt="restaurant icon" />
            {restaurant.location}
          </p>
        </div>
      </div>
    </Link>
  )
}