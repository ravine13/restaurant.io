import React, { useContext, useEffect} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { UserContext } from '../context/UserContext'
import Swal from 'sweetalert2'
import { Button } from 'flowbite-react'

const Profile = () => {
  const { currentUser, onchange, authToken, logout, apiEndpoint } = useContext(UserContext)

  const navigate = useNavigate()

    useEffect(()=>{
          if (!currentUser) {
            navigate('/')
          }

    },[onchange, currentUser, navigate])
  function deleteProfile() {
    fetch(`http://127.0.0.1:5555/users`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authToken}`,
      },
    })
      .then((data) => {
        console.log('Success:', data)
        Swal.fire({
          title: 'Deleted!',
          text: 'Your profile has been deleted.',
          icon: 'success',
        }).then(() => {
            navigate('/')
          logout()
        })
      })
      .catch((error) => {
        console.error('Error:', error)
        Swal('Error!', 'There was a problem deleting the profile.', 'error')
      })
  }

  function handleSubmit(e){
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    console.log([...formData.entries()]);
  }

  return (
    <div className="container max-w-[1280px] px-6 mx-auto mt-5 text-gray-600">
      <div className="flex flex-wrap -mx-5">
        <div className="w-full px-5">
          <div className="my-5 max-w-7xl">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-3">
              <h3 className="text-lg font-semibold">My Profile</h3>
              <div className="flex gap-4">
                <Link to={'/update_profile'}>
                  <Button gradientDuoTone="cyanToBlue">Update Profile</Button>
                </Link>
                <button
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                  onClick={() => {
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
                        deleteProfile()
                      }
                    })
                  }}>
                  Delete
                </button>
              </div>
            </div>

            <hr />
          </div>
          <form onSubmit={handleSubmit} className="file-upload w-full max-w-7xl">
            <div className="flex flex-col items-center md:items-start md:flex-row gap-5">
              <div className="w-full">
                <div className="flex flex-wrap px-6 py-10 bg-gray-200 rounded">
                  <div className="flex flex-col w-full md:grid md:grid-cols-2 gap-3">
                    <div>
                      <label className="form-label"> Username *</label>
                      <input
                        type="text"
                        className="w-full p-2 border border-gray-300 rounded"
                        placeholder=""
                        aria-label="First name"
                        defaultValue={currentUser ? currentUser.username : ''}
                        name="username"
                        disabled
                      />
                    </div>
                    <div>
                      <label className="form-label">First Name *</label>
                      <input
                        type="text"
                        className="w-full p-2 border border-gray-300 rounded"
                        placeholder=""
                        aria-label="First name"
                        defaultValue={currentUser ? currentUser.first_name : ''}
                        name="first_name"
                        disabled
                      />
                    </div>
                    <div>
                      <label className="form-label">Last Name *</label>
                      <input
                        type="text"
                        className="w-full p-2 border border-gray-300 rounded"
                        placeholder=""
                        aria-label="Last name"
                        defaultValue={currentUser ? currentUser.last_name : ''}
                        name="last_name"
                        disabled
                      />
                    </div>
                    <div>
                      <label className="form-label">Contact Info *</label>
                      <input
                        type="text"
                        className="w-full p-2 border border-gray-300 rounded"
                        placeholder=""
                        aria-label="Phone number"
                        defaultValue={
                          currentUser ? currentUser.contact_info : ''
                        }
                        name="contact_info"
                        disabled
                      />
                    </div>
                    <div>
                      <label className="form-label" htmlFor="inputEmail4">
                        Email *
                      </label>
                      <input
                        type="email"
                        className="w-full p-2 border border-gray-300 rounded"
                        id="inputEmail4"
                        defaultValue={currentUser ? currentUser.email : ''}
                        disabled
                        name="email"
                      />
                    </div>
                    <div>
                      <label className="form-label">Password *</label>
                      <input
                        type="text"
                        className="w-full p-2 border border-gray-300 rounded"
                        placeholder=""
                        aria-label="Phone number"
                        defaultValue="*******"
                        name="password"
                        disabled
                      />
                    </div>
                    <div>
                      <label className="form-label">Profile Image</label>
                      <input
                        type="text"
                        className="w-full p-2 border border-gray-300 rounded"
                        placeholder=""
                        aria-label="profile image"
                        defaultValue={
                          currentUser ? currentUser.profile_img : ''
                        }
                        name="profile_img"
                        disabled
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="mx-auto px-5">
                <div className="p-4 bg-gray-200 rounded">
                  <div className="flex flex-col gap-3">
                    <h4 className="mb-4 mt-0 text-lg font-semibold">
                      Profile photo
                    </h4>
                    <div className="text-center">
                      <div className="h-64 w-64 mx-auto border border-gray-300 bg-white rounded">
                        {currentUser && currentUser.profile_img ? (
                          <img
                            src={currentUser.profile_img}
                            alt="Profile"
                            className="object-cover object-center w-full h-full rounded"
                          />
                        ) : (
                          <div className="square position-relative display-2 mb-3">
                            <i
                              className="fas fa-fw fa-user position-absolute top-50 start-50 translate-middle text-secondary"
                              style={{ fontSize: '3rem' }}></i>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Profile