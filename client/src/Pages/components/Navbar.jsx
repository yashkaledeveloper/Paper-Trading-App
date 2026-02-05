import React from 'react'
import './css/Navbar.css'
import { useEffect } from 'react';
import axios from 'axios';
import { useState } from 'react';
import { data } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import Flash from './Flash';

const Navbar = () => {
   const apiUrl = import.meta.env.VITE_API_URL;
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await axios.post(
          `${apiUrl}/auth/verify`,{},
          { withCredentials: true }
        );
        setUserData(data);
      } catch {
        setUserData(null);
      }
    };

    fetchUser();
  }, []);

  const handleLogout = async () => {
    await axios.post(
      `${apiUrl}/auth/logout`,
      {},
      { withCredentials: true }
    );
    window.location.href = "/login";
  };

  if (!userData) return null;

  const username = userData?.user?.username ?? "USER";

  return (
      
    <>
    {/* <Flash/> */}
    <header className="navbar">
      {/* Left */}
      <div className="nav-left">
        <div className="logo">
          <span className="material-icons logo-icon">show_chart</span>
          <span className="logo-text">PaperTrade</span>
        </div>
      </div>

      {/* Center */}
      <div className="nav-center">
        <span className="material-icons search-icon">search</span>
        <input
          type="text"
          placeholder="Search stocks, sectors, or indices..."
        />
      </div>

      {/* Right */}
      <div className="nav-right">
        <button className="icon-btn">
          <span className="material-icons">dark_mode</span>
        </button>

        <div className="profile" onClick={handleLogout}>
          <div className="profile-info">
            <span className="name">{username}</span>
            <span className="role">Pro Trader</span>
          </div>
          <div className="avatar">{username[0]?.toUpperCase()}</div>
        </div>
      </div>
    </header>
    </>
  );
}

export default Navbar