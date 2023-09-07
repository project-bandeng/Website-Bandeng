// MainNavbar.js
import React from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../Pages/Navbar";

const MainNavbar = () => {
  const location = useLocation();
  const isLoginOrRegisterOrProdukcrudOrProfilmitraKelolauserKelolaartikelForgotpassResetPassPageLoginAdminPage = location.pathname === '/login' || location.pathname === '/register'|| location.pathname === '/crudproduk'|| location.pathname === '/profil'|| location.pathname === '/cruduser'|| location.pathname === '/artikel'|| location.pathname === '/login/forgot-password'|| location.pathname === '/login/reset-password'|| location.pathname === '/login/admin';

  return !isLoginOrRegisterOrProdukcrudOrProfilmitraKelolauserKelolaartikelForgotpassResetPassPageLoginAdminPage && <Navbar />;

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
};

export default MainNavbar;
