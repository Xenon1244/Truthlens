import React from 'react';
import { useLocation } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';
import './Layout.css';

const Layout = ({ children }) => {
  const location = useLocation();
  const isAuthPage = location.pathname === '/login' || location.pathname === '/signup';

  return (
    <div className="layout">
      {!isAuthPage && <Header />}
      <div className="layout-content">
        {!isAuthPage && <Sidebar />}
        <main className={`main-content ${isAuthPage ? 'auth-layout' : ''}`}>
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;