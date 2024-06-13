import React, { useContext} from 'react'
import { Button, Label, TextInput } from 'flowbite-react'
import {Link} from 'react-router-dom'
import { UserContext } from '../context/UserContext'
import Swal from 'sweetalert2'

const Signup = () => {
    const {addUser} = useContext(UserContext)

    function handleSubmit(e){
        e.preventDefault()
        const formData = new FormData(e.currentTarget)
        const username = formData.get('username')
        const email = formData.get('email')
        const password = formData.get('password')
        const password2 = formData.get('password2')
        if(password !== password2){
            console.log("password error");
            Swal.fire({
              icon: 'error',
              text: 'Passwords do not match!'
            })
            return
        }
        if(password !== "" && username !== "" && email !== ''){
            addUser(username, email, password)
        } 
    }
    
  return (
    <form
      onSubmit={handleSubmit}
      className="flex max-w-md flex-col gap-4 mx-auto my-16 px-4 md:px-6 border py-10 rounded-2xl border-zinc-300 shadow-xl">
      <h3 className="text-2xl text-center">Create Account</h3>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="username" value="Username" />
        </div>
        <TextInput
          id="username"
          name="username"
          type="text"
          placeholder="username"
          required
        />
      </div>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="email1" value="Email" />
        </div>
        <TextInput
          id="email1"
          type="email"
          name="email"
          placeholder="name@flowbite.com"
          required
        />
      </div>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="password" value="Password" />
        </div>
        <TextInput id="password" name="password" type="password" required />
      </div>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="password2" value="Confirm password" />
        </div>
        <TextInput id="password2" name="password2" type="password" required />
      </div>
      <Button gradientDuoTone="cyanToBlue" type="submit">
        Signup
      </Button>
      <p>
        Already have an account?
        <Link className="text-cyan-500" to="/login">
          {' '}
          Login
        </Link>
      </p>
    </form>
  )
}

export default Signup