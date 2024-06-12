import React from 'react'
import { Outlet } from 'react-router-dom'
import Nav from '../components/Navbar'
import Foot from '../components/Footer'

const Layout = () => {
  return (
    <div className="relative min-h-[100vh] pb-24 w-full">
      {/* navbar */}
      <div className="w-full px-2 py-2 border-b border-b-zinc-300">
        <Nav />
      </div>
      {/* outlet */}
      <Outlet />
      {/* footer */}
      <div className="w-full py-4 mb-auto bg-white px-2 border-t border-t-zinc-300 absolute -bottom-0">
        <Foot />
      </div>
      </div>
  )
}

export default Layout