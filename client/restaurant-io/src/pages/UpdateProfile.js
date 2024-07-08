import {React, useContext} from 'react'
import { Button, Label, TextInput } from 'flowbite-react'
import { UserContext } from '../context/UserContext';
import Swal from "sweetalert2"
import { useNavigate } from 'react-router-dom';

export default function UpdateProfile() {
const { currentUser, authToken, setOnchange, onchange, apiEndpoint } = useContext(UserContext);

const navigate = useNavigate()

const handleSubmit = (event) => {
    event.preventDefault();
     const formData = new FormData(event.currentTarget)
     const user = Object.fromEntries(formData)
  
    fetch(`https://restaurant-io-c3kq.onrender.com/users`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authToken}`,
      },
      body: JSON.stringify(user),
    })
    .then(response => {
      if (response.ok) {
        setOnchange(!onchange)
        Swal.fire('Success', 'Profile updated successfully', 'success')
        navigate('/profile')
        return response.json();
      } 
    })
    .catch(error => {
      Swal.fire("Error", error.message, "error");
    });
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="flex max-w-lg mx-auto my-24 px-4 flex-col gap-4 md:px-6 border py-10 rounded-2xl border-zinc-300 shadow-xl">
        <h3 className="text-2xl text-center">Update Profile</h3>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="username" value="Username" />
          </div>
          <TextInput
            id="username"
            name="username"
            type="text"
            required
            defaultValue={currentUser ? currentUser.username : ''}
            placeholder="Type username here"
          />
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="email" value="Email" />
          </div>
          <TextInput
            id="email"
            name="email"
            type="text"
            defaultValue={currentUser ? currentUser.email : ''}
            placeholder="Type email here"
            required
          />
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="firstname" value="First Name" />
          </div>
          <TextInput
            id="firstname"
            name="first_name"
            type="text"
            defaultValue={currentUser ? currentUser.first_name : ''}
            placeholder="Type first name here"
          />
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="lastname" value="Last Name" />
          </div>
          <TextInput
            id="lastname"
            name="last_name"
            type="text"
            defaultValue={currentUser ? currentUser.last_name : ''}
            placeholder="Type last name here"
          />
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="phone" value="Phone" />
          </div>
          <TextInput
            id="phone"
            name="contact_info"
            type="text"
            defaultValue={currentUser ? currentUser.contact_info : ''}
            placeholder="Type phone number here"
          />
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="profilepicture" value="Profile picture" />
          </div>
          <TextInput
            id="profilepicture"
            name="profile_img"
            type="url"
            defaultValue={currentUser ? currentUser.profile_img : ''}
            placeholder="Paste image link here"
          />
        </div>
        <Button gradientDuoTone="cyanToBlue" type="submit">
          Update
        </Button>
      </form>
    </div>
  )
}