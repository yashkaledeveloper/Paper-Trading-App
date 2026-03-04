import React, { useState } from 'react'
import './css/SideBar.css'
import { Link } from 'react-router-dom'

const SideBar = () => {

  const [activeTab, setActiveTab] = useState('app');

  const tabs = [
    { to: 'app/search', icon: 'search', label: 'Search' },
    { to: 'app', icon: 'bookmark', label: 'Dashboard' },
    { to: 'app/orders', icon: 'history', label: 'Orders' },
    { to: 'app/holdings', icon: 'outbox', label: 'Holdings' },
    { to: 'app/portfolio', icon: 'person', label: 'Profile' },
    { to: 'app/positions', icon: 'lock', label: 'Positions' },
  ];

  return (
    <aside className="sidebar" >
      <div className="menu">
        {tabs.map((tab) => (
          <Link to={'/'+tab.to} key={tab.to} onClick={() => setActiveTab(tab.to)}>
            <SidebarItem icon={tab.icon} label={tab.label} active={activeTab === tab.to ? 'active' : ''}/>
          </Link>
          // <p
          //   key={tab.to}
            // className={`tab ${activeTab === tab ? "active" : ""}`}
          //   onClick={() => setActiveTab(tab)}
          // >
          //   {tab.label}
          // </p>
        ))}
        {/* <Link to="/search"><SidebarItem icon="search" label="Search" /></Link>
        <Link to="/" ><SidebarItem icon="pie_chart" label="Dashboard" /></Link>
        <Link to="/watchlist"><SidebarItem icon="view_column" label="Watch List" /></Link>
        <Link to="/orders"><SidebarItem icon="inbox" label="Orders" /></Link>
        <Link to="/holdings"><SidebarItem icon="person" label="Holdings" /></Link>
        <Link to="/positions"><SidebarItem icon="lock" label="Positions" /></Link>
        <Link to="/portfolio"><SidebarItem icon="person" label="Profile" /></Link> */}
      </div>

      <div className="divider" />

      <div className="menu">
        <Link to="/signin"><SidebarItem icon="login" label="Logout" /></Link>
        <Link to="/signup"><SidebarItem icon="settings" label="Settings" /></Link>
      </div>
    </aside>
  );
}

function SidebarItem({ icon, label, active }) {
  return (
    <div className={`item ${active ? "active" : ""}`}>
      <span className="material-icons">{icon}</span>
      <span className="text">{label}</span>
    </div>
  );
}

export default SideBar