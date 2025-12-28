import { Navigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useEffect, useState } from "react";
import axios from "axios";

const ProtectedRoute = ({ children }) => {
  const [cookies, removeCookie] = useCookies([]);
  const [loading, setLoading] = useState(true);
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    const verifyUser = async () => {
      if (!cookies.token) {
        setLoading(false);
        return;
      }

      try {
        const { data } = await axios.post(
          "http://localhost:4000",
          {},
          { withCredentials: true }
        );

        if (data.status) {
          setIsAuth(true);
        } else {
          removeCookie("token");
        }
      } catch {
        removeCookie("token");
      } finally {
        setLoading(false);
      }
    };

    verifyUser();
  }, [cookies, removeCookie]);

  if (loading) return null; // ya loader
  if (!isAuth) return <Navigate to="/login" />;

  return children;
};

export default ProtectedRoute;
