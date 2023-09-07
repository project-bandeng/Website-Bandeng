// MainNavbar.js
import React from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '../Pages/Navbar';

const MainNavbar = () => {
  const location = useLocation();
  const isLoginOrRegisterOrProdukcrudOrProfilmitraKelolauserKelolaartikel = location.pathname === '/login' || location.pathname === '/register'|| location.pathname === '/crudproduk'|| location.pathname === '/profil'|| location.pathname === '/cruduser'|| location.pathname === '/artikel';

  return !isLoginOrRegisterOrProdukcrudOrProfilmitraKelolauserKelolaartikel && <Navbar />;
};

export default MainNavbar;
