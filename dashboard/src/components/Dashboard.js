import React from 'react';
import Orders from './Orders';
import Apps from "./Apps";
import Funds from "./Funds";
import Holdings from "./Holdings";
import Positions from "./Positions";
import Summary from "./Summary";
import WatchList from "./WatchList";
import { Route, Routes } from "react-router-dom";
import ProtectedRoute from './ProtectedRoute';
import { useEffect } from 'react';  
import axios from 'axios';

function Dashboard() {

  useEffect(() => {
  const verifyUser = async () => {
    const { data } = await axios.post(
      "http://localhost:4000",
      {},
      { withCredentials: true }
    );

    if (!data.status) {
      window.location.href = "http://localhost:3001/login";
    }
  };

  verifyUser();
}, []);

  return (
    <div className='dashboard-container'>
      <WatchList/>
      <div className="content">
        <Routes>
        <Route path='/' element={<ProtectedRoute><Summary/></ProtectedRoute>}/>
        <Route path='/orders' element={<ProtectedRoute><Orders/></ProtectedRoute>}/>
        <Route path='/holdings' element={<ProtectedRoute><Holdings/></ProtectedRoute>}/>
        <Route path='/positions' element={<ProtectedRoute><Positions/></ProtectedRoute>}/>
        <Route path='/funds' element={<ProtectedRoute><Funds/></ProtectedRoute>}/>
        <Route path='/apps' element={<ProtectedRoute><Apps/></ProtectedRoute>}/>
      </Routes>
        {/* <div className="home_page">
              <h4>
                {" "}
                Welcome <span>{username}</span>
              </h4>
              <button onClick={Logout}>LOGOUT</button>
            </div>
            <ToastContainer /> */}
      </div>
    </div>
  )
}

export default Dashboard
