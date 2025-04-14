import React from 'react';
import './Header.css';

const Header = ({ title = "Overview", profilePic }) => {
  return (
    <header className="header">
      <h1 className="page-title">Overview</h1>
      <div className="header-right">
        <img src={profilePic} alt="Profile" className="profile-pic" />
        <input className="search-input" placeholder="Search for something" />
        <span className="icon">⚙️</span>
        <span className="icon">🔔</span>
      </div>
    </header>
  );
};

export default Header;
