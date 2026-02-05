import React, { useState } from 'react'
import './css/SideBar.css'
import { Link } from 'react-router-dom'

const SideBar = () => {

  const [activeTab, setActiveTab] = useState('');

  const tabs = [
    { to: 'search', icon: 'search', label: 'Search' },
    { to: '', icon: 'pie_chart', label: 'Dashboard' },
    { to: 'orders', icon: 'inbox', label: 'Orders' },
    { to: 'holdings', icon: 'person', label: 'Holdings' },
    { to: 'positions', icon: 'lock', label: 'Positions' },
    { to: 'portfolio', icon: 'person', label: 'Profile' },
    { to: 'watchlist', icon: 'view_column', label: 'Watch List' },
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
        <Link to="/login"><SidebarItem icon="workspace_premium" label="Sign In" /></Link>
        <Link to="/signup"><SidebarItem icon="description" label="Sign Up" /></Link>
        <SidebarItem icon="help_outline" label="Settings" />
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