import React, { useContext, useState } from "react";
import { Button, Label, TextInput } from "flowbite-react";
import { Link } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import Swal from "sweetalert2";

const Signup = () => {
  const { addUser } = useContext(UserContext);
  const [formErrors, setFormErrors] = useState({});

  function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const username = formData.get("username");
    const email = formData.get("email");
    const password = formData.get("password");
    const password2 = formData.get("password2");

    let errors = {};
    if (!username) errors.username = "Username is required.";
    if (!email) errors.email = "Email is required.";
    if (!password) errors.password = "Password is required.";
    if (password !== password2) errors.password2 = "Passwords do not match.";

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      Swal.fire({
        icon: "error",
        text: "Please correct the errors in the form.",
      });
      return;
    }

    addUser(username, email, password);
    Swal.fire({
      icon: "success",
      text: "Account created successfully!",
    });
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex max-w-md flex-col gap-4 mx-auto my-16 px-4 md:px-6 border py-10 rounded-2xl border-zinc-300 shadow-xl"
    >
      <h3 className="text-2xl text-center">Create Account</h3>

      <div>
        <div className="mb-4 block h-6">
          <Label htmlFor="username" value="Username" />
        </div>
        <TextInput
          id="username"
          name="username"
          type="text"
          placeholder="Username"
          required
          className="px-4 text-black"
          color={formErrors.username ? "failure" : "default"}
        />
        {formErrors.username && (
          <p className="text-red-600 text-sm mt-1">{formErrors.username}</p>
        )}
      </div>

      <div>
        <div className="mb-2 block">
          <Label htmlFor="email1" value="Email" />
        </div>
        <TextInput
          id="email1"
          type="email"
          name="email"
          placeholder="name@example.com"
          required
          className="px-4 text-black"
          color={formErrors.email ? "failure" : "default"}
        />
        {formErrors.email && (
          <p className="text-red-600 text-sm mt-1">{formErrors.email}</p>
        )}
      </div>

      <div>
        <div className="mb-2 block">
          <Label htmlFor="password" value="Password" />
        </div>
        <TextInput
          id="password"
          name="password"
          type="password"
          placeholder="Password"
          required
          className="px-4 text-black"
          color={formErrors.password ? "failure" : "default"}
        />
        {formErrors.password && (
          <p className="text-red-600 text-sm mt-1">{formErrors.password}</p>
        )}
      </div>

      <div>
        <div className="mb-2 block">
          <Label htmlFor="password2" value="Confirm password" />
        </div>
        <TextInput
          id="password2"
          name="password2"
          type="password"
          placeholder="Confirm Password"
          required
          className="px-4 text-black"
          color={formErrors.password2 ? "failure" : "default"}
        />
        {formErrors.password2 && (
          <p className="text-red-600 text-sm mt-1">{formErrors.password2}</p>
        )}
      </div>

      <Button
        className="bg-cyan-500 hover:bg-cyan-700 text-white font-bold py-2 px-4 rounded-full"
        type="submit"
      >
        Signup
      </Button>

      <p className="text-center">
        Already have an account?
        <Link className="text-cyan-500 ml-1" to="/login">
          Login
        </Link>
      </p>
    </form>
  );
};

export default Signup;
