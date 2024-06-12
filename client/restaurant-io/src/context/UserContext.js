import { createContext, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'

export const UserContext = createContext()

export default function UserProvider({ children }) {
  const [onchange, setOnchange] = useState(false)
  const [authToken, setAuthToken] = useState(() =>
    sessionStorage.getItem('authToken')
      ? sessionStorage.getItem('authToken')
      : null
  )
  const [currentUser, setCurrentUser] = useState(null)

  const navigate = useNavigate()
  const apiEndpoint = 'http://127.0.0.1:5555'
//   const apiEndpoint = 'http://127.0.0.1:5000'
  // add user
  function addUser(username, email, password) {
    fetch(`${apiEndpoint}/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, email, password }),
    })
      .then((res) => {
        if (res.ok) {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Your account has been created, login.',
            showConfirmButton: false,
            timer: 1500,
          })
          navigate('/login')
        } else if (res.status === 400) {
          Swal.fire({
            icon: 'error',
            text: 'Username or email already exists!',
          })
        }
      })
      .catch((err) => console.log(err))
  }

  // login user
  function login(username, password) {
    fetch(`${apiEndpoint}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    })
      .then((res) => res.json())
      .then((response) => {
        if (response.access_token) {
          sessionStorage.setItem('authToken', response.access_token)
          setAuthToken(response.access_token)
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Login successful.',
            showConfirmButton: false,
            timer: 1500,
          })
          navigate('/')
          setOnchange(!onchange)
        } else {
          Swal.fire({
            icon: 'error',
            text: response.error,
          })
        }
      })
  }

  // Logout user
  function logout() {
    sessionStorage.removeItem('authToken')
    setCurrentUser(null)
    setAuthToken(null)
    setOnchange(!onchange)
  }

  // Get Authenticated user
  useEffect(() => {
    if (authToken) {
      fetch(`${apiEndpoint}/authenticated_user`, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${authToken}`,
        },
      })
        .then((res) => res.json())
        .then((response) => {
          if (response.email || response.username) {
            setCurrentUser(response)
          } else {
            setCurrentUser(null)
          }
        })
    }
  }, [authToken, onchange])
  
  // context data
  const contextData = {
    addUser,
    login,
    logout,
    currentUser,
    authToken,
    onchange,
    setOnchange, 
    apiEndpoint
  }

  return (
    <UserContext.Provider value={contextData}>{children}</UserContext.Provider>
  )
}