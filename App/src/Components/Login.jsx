import { useState } from "react";
import Doodle from "../assets/doodle.svg";
import Signup from "./Signup";
import { useNavigate } from "react-router-dom";
import { Typewriter } from "react-simple-typewriter";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
  const [showSignup, setShowSignup] = useState(false);
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const navigate = useNavigate();

  const toggleSignup = () => {
    setShowSignup(!showSignup);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/users/login", {
        Email,
        Password
      });
      localStorage.setItem("token", res.data.Token);
      toast.success("Login Successful");
      setTimeout(() => {
        navigate("/", { state: { user: res.data.Data } });
      }, 1500);
    } catch (err) {
      toast.error(err.response?.data?.Msg || "Login failed");
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-white">
      <ToastContainer />
      <div className="w-full md:w-1/2 bg-blue-400 text-white flex flex-col items-center justify-center relative p-6">
        <h1 className="text-2xl md:text-3xl font-bold text-center mb-6">
          <Typewriter
            words={["Welcome to TaskApp", "Manage Your Tasks Smartly", "Stay Organized Every Day"]}
            loop={true}
            cursor
            cursorStyle="|"
            typeSpeed={70}
            deleteSpeed={50}
            delaySpeed={2000}
          />
        </h1>
        <img
          src={Doodle}
          alt="Login Visual"
          className="w-60 h-60 mt-4 object-contain hidden md:block"
        />
      </div>
      <div className="flex flex-1 items-center justify-center bg-white">
        {!showSignup ? (
          <div className="w-[90%] max-w-md p-6 rounded-md shadow-md">
            <h2 className="text-2xl font-bold text-center mb-6 text-blue-400">Login to TaskApp</h2>
            <form className="space-y-4" onSubmit={handleLogin}>
              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  value={Email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Password</label>
                <input
                  type="password"
                  value={Password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 outline-none"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-400 text-white py-2 rounded-md hover:bg-blue-700 transition"
              >
                Login
              </button>
            </form>
            <p className="text-sm text-center mt-4 text-gray-600">
              Don’t have an account?{" "}
              <button onClick={toggleSignup} className="text-blue-400 underline cursor-pointer">
                Sign up
              </button>
            </p>
          </div>
        ) : (
          <Signup state={toggleSignup} />
        )}
      </div>
    </div>
  );
};

export default Login;
