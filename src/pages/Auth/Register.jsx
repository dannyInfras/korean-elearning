import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useTheme } from "../../ThemeContext";
import Navbar from "../../components/Navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle, faFacebook } from "@fortawesome/free-brands-svg-icons";
import Image from "rc-image";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { season } = useTheme();

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);
  
    if (password !== confirmPassword) {
      setError("Mật khẩu không khớp!");
      return;
    }
  
    try {
      const response = await fetch("https://exekoreanapi-production.up.railway.app/user", { 
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });
  
      const data = await response.json();
      if (response.ok) {
        alert("Đăng ký thành công!");
        navigate("/login");
      } else {
        setError(data.message || "Đăng ký thất bại!");
      }
    } catch (err) {
      setError("Lỗi hệ thống, vui lòng thử lại!");
    }
  }
  
  

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
          <h2 className="text-2xl font-bold mb-6 text-center">Create Account</h2>
          {error && <p className="text-red-500 text-center">{error}</p>}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block mb-1 font-medium">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
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
            <div>
              <label htmlFor="confirmPassword" className="block mb-1 font-medium">
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <button
              type="submit"
              className={`w-full py-2 px-4 ${season}-button-gradient rounded-md text-white font-medium hover:opacity-90 transition-opacity`}
            >
              Register
            </button>
          </form>
          <div className="text-sm text-right mt-3">
            <Link to="/login" className="text-blue-600 hover:underline">
              Already have an account? Sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
