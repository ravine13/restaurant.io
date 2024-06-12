import { Navbar, Button, ListGroup } from 'flowbite-react'
import { useContext, useState } from 'react'
import {NavLink} from 'react-router-dom'
import { UserContext } from '../context/UserContext'
import personOutline from '../assets/images/person-circle-outline.svg'
 

export default function Nav() {
    const {currentUser, logout} = useContext(UserContext)
    const [isVisible, setIsVisible] = useState(false)

    function handleEnter(){
        setIsVisible(true)
    }
    function handleLeave(){
        setIsVisible(false)
    }

  return (
    <Navbar fluid className="max-w-[1280px] px-0 mx-auto">
      <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
        Restaurant.io
      </span>
      <Navbar.Toggle />
      <Navbar.Collapse>
        <div className="flex px-4 md:px-0 flex-col md:flex-row gap-4 items-end md:items-center">
          <NavLink
            className={({ isActive }) => (isActive ? 'text-cyan-500' : null)}
            to="/">
            Home
          </NavLink>
          <NavLink
            className={({ isActive }) => (isActive ? 'text-cyan-500' : null)}
            to="/restaurants">
            Restaurants
          </NavLink>
          {currentUser && <NavLink
            className={({ isActive }) => (isActive ? 'text-cyan-500' : null)}
            to="/reservations">
            Reservations
          </NavLink>}
          {currentUser ? (
            <div className="relative">
              <button onClick={handleEnter}>
                <img onMouseEnter={handleEnter} onMouseLeave={handleLeave}
                  className="w-10 h-10 rounded-full object-cover object-top"
                  src={currentUser.profile_img || personOutline}
                  alt="icon"
                />
              </button>
              {isVisible && (
                <ListGroup onMouseOver={handleEnter} onMouseLeave={handleLeave} className="w-24 absolute top-10 right-0 z-30">
                  <ListGroup.Item>
                    <NavLink to="/profile">Profile</NavLink>
                  </ListGroup.Item>
                  <ListGroup.Item onClick={logout}>
                    <NavLink onClick={handleLeave} to="/login">Logout</NavLink>
                  </ListGroup.Item>
                </ListGroup>
              )}
            </div>
          ) : (
            <>
              <NavLink
                className={({ isActive }) =>
                  isActive ? 'text-cyan-500' : null
                }
                to="/login">
                Login
              </NavLink>
              <NavLink
                className={({ isActive }) =>
                  isActive ? 'text-cyan-500' : null
                }
                to="/signup">
                <Button gradientDuoTone="cyanToBlue" size="xs">
                  Sign Up
                </Button>
              </NavLink>
            </>
          )}
        </div>
      </Navbar.Collapse>
    </Navbar>
  )
}