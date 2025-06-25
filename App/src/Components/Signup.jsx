import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const Signup = ({ state }) => {
  const [formData, setFormData] = useState({
    Name: "",
    Email: "",
    Password: "",
    Confirm_Password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    const { Name, Email, Password, Confirm_Password } = formData;

    if (!Name || !Email || !Password || !Confirm_Password) {
      return toast.error("Please fill all fields");
    }

    if (Password.length < 6) {
      return toast.error("Password must be at least 6 characters");
    }

    if (Password !== Confirm_Password) {
      return toast.error("Passwords do not match");
    }

    try {
      const res = await axios.post("http://localhost:5000/api/users/register", formData);
      toast.success("Account created successfully");
      state();
    } catch (err) {
      toast.error(err.response?.data?.Msg || "Something went wrong");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center w-100">
      <div className="w-[90%] max-w-md bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-blue-600 mb-6">Create an Account</h2>
        <form onSubmit={handleSignup} className="space-y-4">
          <div>
            <label className="block text-sm text-gray-700">Name</label>
            <input
              type="text"
              name="Name"
              value={formData.Name}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Your name"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-700">Email</label>
            <input
              type="email"
              name="Email"
              value={formData.Email}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-700">Password</label>
            <input
              type="password"
              name="Password"
              value={formData.Password}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="********"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-700">Confirm Password</label>
            <input
              type="password"
              name="Confirm_Password"
              value={formData.Confirm_Password}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="********"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
          >
            Sign Up
          </button>
          <p className="text-center text-sm text-gray-600 mt-4">
            Already have an account?{" "}
            <button onClick={state} type="button" className="text-blue-600 underline cursor-pointer">
              Log in
            </button>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
