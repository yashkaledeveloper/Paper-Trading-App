import React from 'react'
import "./css/Login.css";
import { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

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
        setTimeout(() => {
          navigate("/")
        }, 1000)
      } else {
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
    <div className="form">
      <div className="form_container">
        <h2>Sign In</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <input
              type="email"
              name="email"
              placeholder="bharat@gmail.com"
              required
              value={email}
              onChange={handleChange}
            />
          </div>
          <div>
            <input
              type="password"
              name="password"
              placeholder="xxxxxxxx"
              required
              minLength={8}
              value={password}
              onChange={handleChange}
            />
          </div>
          <button type="submit">Submit</button><br /><br />

          <span>
            Already have an account? <Link to={"/signup"}>Signup</Link>
          </span>
        </form>
      </div>
    </div>
  )
}

export default Login