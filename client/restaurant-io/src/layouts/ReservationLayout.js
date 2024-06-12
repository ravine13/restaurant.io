import React from 'react'
import { NavLink, Outlet } from 'react-router-dom'

const ReservationLayout = () => {
  return (
    <main className='w-full max-w-[1280px] mt-12 mx-auto px-6'>
      <nav className='flex gap-4'>
        <NavLink className={({isActive}) => isActive ? "text-cyan-500 underline underline-offset-2" : null} end to=".">Personal</NavLink>
        <div>|</div>
        <NavLink className={({isActive}) => isActive ? "text-cyan-500 underline underline-offset-2" : null} to="restaurant">Restaurant</NavLink>
      </nav>
      <Outlet />
    </main>
  )
}

export default ReservationLayout