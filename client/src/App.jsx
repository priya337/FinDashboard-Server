import React, { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Header from './components/Header';

// ✅ Lazy-loaded components
const Dashboard = lazy(() => import('./components/Dashboard'));
const Settings = lazy(() => import('./components/Settings'));

const App = () => {
  const avatar = "https://i.pravatar.cc/100";

  return (
    <div className="dashboard-layout">
      <Sidebar />
      <div className="dashboard-main">
        {/* ✅ Wrap lazy routes with Suspense */}
        <Suspense fallback={<div className="loading">Loading...</div>}>
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
        </Suspense>
      </div>
    </div>
  );
};

export default App;
