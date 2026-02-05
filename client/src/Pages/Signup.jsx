import React from 'react'
import "./css/Login.css";
import { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";

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
        console.log(message);
        setTimeout(() => {
          navigate("/")
        }, 3000)
      } else {
        console.log(message);
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
      <div className="form">
        <div className="form_container">
        <h2>Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <input
              type="text"
              name="username"
              placeholder="bharat001"
              required
              value={username}
              onChange={handleChange}
            />
          </div>
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
            Already have an account? <Link to={"/login"}>Sign In</Link>
          </span>
        </form>
      </div>
      </div>
    )
}

export default Signup