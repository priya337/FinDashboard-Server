import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import Settings from './components/Settings';

const App = () => {
  const avatar = "https://i.pravatar.cc/100"; // same pic everywhere

  return (
    <div className="dashboard-layout">
      <Sidebar />
      <div className="dashboard-main">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Header title="Dashboard" profilePic={avatar} />
                <Dashboard />
              </>
            }
          />
          <Route
            path="/settings"
            element={
              <>
                <Header title="Settings" profilePic={avatar} />
                <Settings avatar={avatar} />
              </>
            }
          />
        </Routes>
      </div>
    </div>
  );
};

export default App;
