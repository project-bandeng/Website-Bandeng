// MainNavbar.js
import React from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../Pages/Navbar";

const MainNavbar = () => {
  const location = useLocation();
<<<<<<< HEAD
  const isLoginOrRegisterOrProdukcrudOrProfilmitraKelolauserKelolaartikel = location.pathname === '/login' || location.pathname === '/register'|| location.pathname === '/crudproduk'|| location.pathname === '/profil'|| location.pathname === '/cruduser'|| location.pathname === '/artikel';

  return !isLoginOrRegisterOrProdukcrudOrProfilmitraKelolauserKelolaartikel && <Navbar />;
=======

  const excludeNavbar = [
    "/login",
    "/register",
    "/profil",
    "/crudproduk",
    "/crudartikel",
    "/cruduser",
    "/user",
    "/artikel",
    "/login/admin",
  ];

  const checkIsPathExcluded = () => {
    if (excludeNavbar.includes(location.pathname.toLowerCase())) {
      return false;
    } else {
      return true;
    }
  };

  const isLoginOrRegister =
    location.pathname === "/login" || location.pathname === "/register";

  return checkIsPathExcluded() && <Navbar />;
>>>>>>> 4086d2898e277d2eddd07a2d80e050ed415673f5
};

export default MainNavbar;
