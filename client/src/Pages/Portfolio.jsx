import React, { useEffect, useState } from 'react'
import "./css/Portfolio.css"
import OverviewCard from './components/OverviewCard';
import WalletStatus from './WalletStatus';
import axios from 'axios';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Portfolio = () => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();


  useEffect(() => {
    const fetchUser = async () => {
      const { data } = await axios.post(`${apiUrl}/auth/verify`, {}, {withCredentials: true});
      setUserData(data.user);
    }

    fetchUser()
  }, [])

  const handleDeleteAcc = async () => {
    const { data } = await axios.post(`${apiUrl}/auth/delete`,{_id: userData._id}, {withCredentials: true});
    toast.success(data.msg)
  }

  const handleLogout = async () => {
    const { data } = await axios.post(
      `${apiUrl}/auth/logout`,
      {},
      { withCredentials: true }
    );
    toast.success(data.message);
    // window.location.href = "/";
  };


  return (
    <div className="portfolio">

      <div className="port">
        <div className="img">{userData?.username[0].toUpperCase()}</div>
        <div className="detail">
          <div className="username">{userData?.username.toUpperCase()}</div>
          <div className="email">{userData?.email}</div>
          <div className="btns">
            <button onClick={handleLogout}><Link to="/">Logout</Link></button>
            <button onClick={handleDeleteAcc}><Link to="/">Delete Account</Link></button>
          </div>
        </div>
      </div>


      <div className="portfolio-header">
        <div>
          <h2>Wallet Overview</h2>
          <p>Real-time summary of your investment performance</p>
        </div>
      </div>

      <WalletStatus />
    </div>
  );
}



export default Portfolio