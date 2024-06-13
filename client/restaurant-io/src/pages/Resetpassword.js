import React, { useContext } from 'react'
import { Button, Label, TextInput } from 'flowbite-react'
import {Link} from 'react-router-dom'
import Swal from "sweetalert2"
import {useNavigate} from "react-router-dom"
import { UserContext } from '../context/UserContext'


export default function Resetpassword() {
    const {apiEndpoint} = useContext(UserContext)
    const navigate = useNavigate()
    
    function handleSubmit(e) {
        e.preventDefault()
        const formData = new FormData(e.currentTarget)
        const username = formData.get('username')
        const email = formData.get('email')
        const new_password = formData.get('new_password')

        if (email !== '' && username !== '') {
            const requestData = {
                username: username,
                email: email,
                new_password: new_password,
            };

            fetch(`http://127.0.0.1:5555/reset_password`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(requestData),
            })
            .then((res) => res.json())
            .then((response) => {
                if (response.message) {
                    navigate("/login");
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: response.message,
                        showConfirmButton: false,
                        timer: 1500,
                    });
                } else {
                    Swal.fire({
                        position: "center",
                        icon: "error",
                        title: response.error,
                        showConfirmButton: false,
                        timer: 1500,
                    });
                }
            })
            .catch((error) => {
                console.error('Error:', error);
            });
        }
    }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex max-w-md mx-auto mt-24 px-4 md:px-6 flex-col gap-4 border py-10 rounded-2xl border-zinc-300 shadow-xl">
      <h3 className="text-2xl text-center">Reset Password</h3>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="username" value="Username" />
        </div>
        <TextInput id="username" name="username" type="text" required />
      </div>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="email" value="Email" />
        </div>
        <TextInput id="email" name="email" type="text" required />
      </div>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="password" value="New Password" />
        </div>
        <TextInput
          id="new_password"
          name="new_password"
          type="password"
          required
        />
      </div>
      <Button gradientDuoTone="cyanToBlue" type="submit">
        Reset
      </Button>
      <p>
        Don't have an account?
        <Link className="text-cyan-500 ml-1" to="/signup">
          Sign Up
        </Link>
      </p>
    </form>
  )
}