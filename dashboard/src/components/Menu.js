import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from "axios";
import { useCookies } from 'react-cookie';

const Menu = () => {
  const [selectedMenu, setSelectedMenu] = useState(0);
  // const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [cookies, removeCookie] = useCookies([]);
  const [userData, setUserData] = useState({});
  const username = userData.user || 'USER';

  const handleClick = (index) => {
    setSelectedMenu(index);
  }

  const fetchData = async () => {
    const { data } = await axios.post(
      "http://localhost:4000", {}, { withCredentials: true }
    );
    return data;
  }
  useEffect(() => {
    fetchData().then(data => setUserData(data));

  }, []);

  const handleProfileClick = async () => {
    if (userData.status) {
      removeCookie("token");
      console.log(cookies);
      window.location.href = "http://localhost:3000/login";
    }
  }

  const menuClass = "menu";
  const activeMenuClass = "menu selected";

  return (
    <div className="menu-container">
      <img src="logo.png" alt="" style={{ width: "50px" }} />
      <div className="menus">
        <ul>
          <li>
            <Link to="/" style={{ textDecoration: "none" }} onClick={() => handleClick(0)}>
              <p className={selectedMenu === 0 ? activeMenuClass : menuClass}>
                Dashboard
              </p>
            </Link>
          </li>

          <li>
            <Link to="/orders" style={{ textDecoration: "none" }} onClick={() => handleClick(1)}>
              <p className={selectedMenu === 1 ? activeMenuClass : menuClass}>
                Orders
              </p>
            </Link>
          </li>

          <li>
            <Link to="/holdings" style={{ textDecoration: "none" }} onClick={() => handleClick(2)}>
              <p className={selectedMenu === 2 ? activeMenuClass : menuClass}>
                Holdings
              </p>
            </Link>
          </li>

          <li>
            <Link to="/positions" style={{ textDecoration: "none" }} onClick={() => handleClick(3)}>
              <p className={selectedMenu === 3 ? activeMenuClass : menuClass}>
                Positions
              </p>
            </Link>
          </li>

          <li>
            <Link to="/funds" style={{ textDecoration: "none" }} onClick={() => handleClick(4)}>
              <p className={selectedMenu === 4 ? activeMenuClass : menuClass}>
                Funds
              </p>
            </Link>
          </li>

          <li>
            <Link to="/apps" style={{ textDecoration: "none" }} onClick={() => handleClick(5)}>
              <p className={selectedMenu === 5 ? activeMenuClass : menuClass}>
                Apps
              </p>
            </Link>
          </li>
        </ul>
        <hr />
        <abbr title="Click to Logout" style={{textDecoration: "none"}} className="profile" onClick={handleProfileClick}>
            <div className="avatar">{username[0]?.toUpperCase()}</div>
            <p className="username">{username.toUpperCase()}</p>
        </abbr>
      </div>
    </div>
  )
}

export default Menu
