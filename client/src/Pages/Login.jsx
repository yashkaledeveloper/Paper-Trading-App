import React from 'react'
import "./css/Login.css";
import { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer,toast } from 'react-toastify';

const Login = () => {
  const apiUrl = import.meta.env.VITE_API_URL;

  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState({ email: "", password: "" });

  const { email, password } = inputValue;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputValue({
      ...inputValue,
      [name]: value
    })
  }

  const handleSubmit = async (e) => {

    e.preventDefault();
    // console.log(apiUrl);
    try {
      const { data } = await axios.post(
        `${apiUrl}/auth/login`,
        { ...inputValue },
        { withCredentials: true }
      )

      const { success, message } = data;
      if (success) {
        toast.success(message)
        setTimeout(() => {
          navigate("/app")
        }, 1000)
      } else {
        toast.error(message)
        console.log(message);
      }


    } catch (err) {
      console.log(err);
    }
    setInputValue({
      ...inputValue,
      email: "",
      password: ""
    })
  }

  return (
    <div className="login-page">
    <ToastContainer/>
      <div className="login-card">
        <Link to="/" className="logo">
          <span className="material-icons logo-icon" style={{margin:'auto',marginBottom:'10px'}}>show_chart</span>
        </Link>
        <h2>Welcome back</h2>
        <p className="subtitle">Sign in to your account</p>

        <form onSubmit={handleSubmit}>
          <div className="field">
            <input
              type="email"
              name="email"
              placeholder="Email address"
              required
              value={email}
              onChange={handleChange}
            />
          </div>

          <div className="field">
            <input
              type="password"
              name="password"
              placeholder="Password"
              required
              minLength={8}
              value={password}
              onChange={handleChange}
            />
          </div>

          <button type="submit" className="primary-btn">
            Sign In
          </button>

          <p className="footer-text">
            Don’t have an account? <Link to="/signup">Create one</Link>
          </p>
        </form>
      </div>
    </div>
  );

}

export default Login