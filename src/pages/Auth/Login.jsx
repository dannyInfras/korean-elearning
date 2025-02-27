import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useTheme } from "../../ThemeContext";
import Navbar from "../../components/Navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle, faFacebook } from "@fortawesome/free-brands-svg-icons";
import Image from "rc-image";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { season } = useTheme();

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);

    try {
      const response = await fetch("https://exekoreanapi-production.up.railway.app/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({ 
          username: email,
          password 
        }),
        credentials: "include",
      });
  
      if (!response.ok) throw new Error("Đăng nhập thất bại!");
  
      const data = await response.json();
      localStorage.setItem("token", data.access_token);
  
      alert("Đăng nhập thành công!");
      navigate("/home");
    } catch (err) {
      setError("Đăng nhập thất bại, vui lòng kiểm tra lại tài khoản/mật khẩu.");
    }
  }

  const handleGoogleLogin = () => {
    window.location.href = "https://exekoreanapi-production.up.railway.app/auth/google";
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("access_token"); // Lấy token từ URL
  
    if (token) {
      localStorage.setItem("token", token);
      alert("Đăng nhập Google thành công!");
      navigate("/home");
    }
  }, []);
  

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
          {error && <p className="text-red-500 text-center">{error}</p>}
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

          {/* Nút đăng nhập bằng Google */}
          <div className="mt-6 flex justify-center">
            <button
              onClick={handleGoogleLogin}
              className="flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              <FontAwesomeIcon icon={faGoogle} className="mr-2" />
              Sign in with Google
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
