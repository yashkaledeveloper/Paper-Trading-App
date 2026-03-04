import React from 'react'
import './css/Navbar.css'
import { useEffect } from 'react';
import axios from 'axios';
import { useState } from 'react';
import { data } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import Flash from './Flash';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await axios.post(
          `${apiUrl}/auth/verify`, {},
          { withCredentials: true }
        );
        setUserData(data);
      } catch {
        setUserData(null);
      }
    };

    fetchUser();
  }, []);


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

          <abbr title="LOGOUT" style={{textDecoration:"none",cursor:"pointer"}}>
            <Link to="/app/portfolio" className="profile" >
              <div className="profile-info">
                <span className="name">{username}</span>
                <span className="role">Pro Trader</span>
              </div>
              <div className="avatar">{username[0]?.toUpperCase()}</div>
            </Link>
          </abbr>
        </div>
      </header>
    </>
  );
}

export default Navbar