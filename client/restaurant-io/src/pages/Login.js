import React, { useContext } from 'react'
import { Button, Label, TextInput } from 'flowbite-react'
import {Link} from 'react-router-dom'
import { UserContext } from '../context/UserContext'

const Login = () => {
    const {login} = useContext(UserContext)

    function handleSubmit(e) {
        e.preventDefault()
        const formData = new FormData(e.currentTarget)
        const username = formData.get('username')
        const password = formData.get('password')

        if (password !== '' && username !== '') {
            login(username, password)
        }
    }
  return (
    <form
      onSubmit={handleSubmit}
      className="flex max-w-md mx-auto mt-24 px-4 md:px-6 flex-col gap-4 border py-10 rounded-2xl border-zinc-300 shadow-xl">
      <h3 className="text-2xl text-center">Login</h3>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="username" value="Username" />
        </div>
        <TextInput id="username" name="username" type="text" required />
      </div>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="password" value="Password" />
        </div>
        <TextInput
          id="password"
          name="password"
          type="password"
          autoComplete="on"
          required
        />
      </div>
      <Button gradientDuoTone="cyanToBlue" type="submit">
        Login
      </Button>
      <div className="flex justify-between">
        <p>
          Don't have an account?
          <Link className="text-cyan-500 ml-1" to="/signup">
            Sign Up
          </Link>
        </p>
        <Link className="text-cyan-500 ml-1" to="/reset_password">
          Forgot password
        </Link>
      </div>
    </form>
  )
}

export default Login