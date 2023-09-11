// MainNavbar.js
import React from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../Pages/Navbar";

const MainNavbar = () => {
  const location = useLocation();

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
    "/login/forgot-password",
    "/login/reset-password"
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