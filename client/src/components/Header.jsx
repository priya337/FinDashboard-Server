import React from 'react';
import './Header.css';

const Header = ({ title = "Dashboard", profilePic }) => {
  return (
    <header className="header">
      <h1 className="page-title">{title}</h1>
      <div className="header-right">
        <input className="search-input" placeholder="Search for something" />
        <span className="icon">⚙️</span>
        <span className="icon">🔔</span>
        <img src={profilePic} alt="Profile" className="profile-pic" />
      </div>
    </header>
  );
};

export default Header;
