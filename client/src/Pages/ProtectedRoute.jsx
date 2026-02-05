import React from 'react'
import { useCookies } from "react-cookie";
import { useEffect, useState } from 'react'
import axios from 'axios'
import { Navigate, useNavigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const apiUrl = import.meta.env.VITE_API_URL;


  const navigate = useNavigate();
  const [cookies] = useCookies([]);
  const [loading, setLoading] = useState(true);
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    const verifyUser = async () => {
      try {
        const { data } = await axios.post(
          `${apiUrl}/auth/verify`,
          {},
          { withCredentials: true }
        );
        // console.log(data);
        
        setIsAuth(Boolean(data.status));
      } catch (err) {
        setIsAuth(false);
      } finally {
        setLoading(false);
      }
    };

    verifyUser();
  }, []);

  // ⛔ WAIT for verification
  if (loading) return null; // or spinner

  // 🔐 After verification
  if (!isAuth) return <Navigate to="/login" replace />;

  return children;
};


export default ProtectedRoute