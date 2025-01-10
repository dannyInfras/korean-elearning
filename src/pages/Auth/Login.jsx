import React, { useState, FormEvent } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useTheme } from "../../ThemeContext";
import Navbar from "../../components/Navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle, faFacebook } from "@fortawesome/free-brands-svg-icons";
import Image from "rc-image";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { season } = useTheme();

  function handleSubmit(e) {
    e.preventDefault();
    // Add authentication logic here
    navigate("/home");
  }

  const handleGoogleLogin = () => {
    // Add Google login logic
  };

  const handleFacebookLogin = () => {
    // Add Facebook login logic
  };

  return (
    <div className={`${season}-gradient min-h-screen`}>
      <Navbar active="signin" />
      <div className="flex items-center justify-center min-h-screen">
        <div className="bg-white/30 backdrop-blur-md p-8 rounded-lg shadow-lg w-96">
          <div className="flex justify-center mb-6">
            <Image
              src={`/src/assets/logo-${season}.png`}
              alt="Cherry Blossom"
              width={80}
              height={80}
              className="w-20 h-20"
            />
          </div>
          <h2 className="text-2xl font-bold mb-6 text-center">Welcome Back Learner</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="block mb-1 font-medium">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label htmlFor="password" className="block mb-1 font-medium">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div className="flex justify-between text-sm">
              <Link to="/forgot-password" className="text-blue-600 hover:underline">
                Forgot Password?
              </Link>
              <Link to="/register" className="text-blue-600 hover:underline">
                Register
              </Link>
            </div>
            <button
              type="submit"
              className={`w-full py-2 px-4 ${season}-button-gradient rounded-md text-white font-medium hover:opacity-90 transition-opacity`}
            >
              Sign In
            </button>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white/30 text-gray-500">Or continue with</span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <button
                onClick={handleGoogleLogin}
                className="flex justify-center items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                <FontAwesomeIcon icon={faGoogle} className="mr-2" />
                Google
              </button>
              <button
                onClick={handleFacebookLogin}
                className="flex justify-center items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                <FontAwesomeIcon icon={faFacebook} className="mr-2" />
                Facebook
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
