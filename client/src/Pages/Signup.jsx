import React from 'react'
import "./css/Signup.css";
import { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';

const Signup = () => {
   const apiUrl = import.meta.env.VITE_API_URL;

  const navigate = useNavigate();

  const [inputValue, setInputValue] = useState({username: "",email: "", password: ""});

  const { email, password, username } = inputValue;

  const handleChange = (e) => {
    const {name, value} = e.target;
    setInputValue({
      ...inputValue,
      [name]: value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `${apiUrl}/auth/signup`,
        {...inputValue},
        {withCredentials: true}
      )

      
      const { success, message } = data;
      if(success) {
        toast.success(message)
        setTimeout(() => {
          navigate("/app")
        }, 3000)
      } else {
        toast.error(message)
      }

    } catch(err) {
      console.log(err);
    }
    
    setInputValue({
      ...inputValue,
      email: "",
      username: "",
      password: "",
    })
  }

 return (
  <div className="login-page">
    <ToastContainer/>
    <div className="login-card">
      <Link to="/" className="logo">
          <span className="material-icons logo-icon" style={{margin:'auto',marginBottom:'10px'}}>show_chart</span>
        </Link>
      <h2>Create your account</h2>
      <p className="subtitle">Start trading with virtual money</p>

      <form onSubmit={handleSubmit}>
        <div className="field">
          <input
            type="text"
            name="username"
            placeholder="Username"
            required
            value={username}
            onChange={handleChange}
          />
        </div>

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
            placeholder="Password (min 8 chars)"
            required
            minLength={8}
            value={password}
            onChange={handleChange}
          />
        </div>

        <button type="submit" className="primary-btn">
          Create Account
        </button>

        <p className="footer-text">
          Already have an account? <Link to="/signin">Sign in</Link>
        </p>
      </form>
    </div>
  </div>
);

}

export default Signup