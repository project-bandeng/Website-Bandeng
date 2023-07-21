// MainNavbar.js
import React from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '../Pages/Navbar';

const MainNavbar = () => {
  const location = useLocation();
  const isLoginOrRegister = location.pathname === '/login' || location.pathname === '/register';

  return !isLoginOrRegister && <Navbar />;
};

export default MainNavbar;
