// App.js
import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import "./App.css";
import About from "./Pages/About";
import Home from "./Pages/Home";
import Product from "./Pages/Product";
import ProductMitra from "./Pages/ProductMitra";
import News from "./Pages/News";
import Contact from "./Pages/Contact";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap";
import Login from "./Pages/Login";
import LoginAdmin from "./Pages/LoginAdmin";
import Register from "./Pages/Register";
import MainNavbar from "./Components/MainNavbar";
import Deskripsi from "./Pages/Deskripsi";
import Fpass from "./Pages/Fpass";
import Profil from "./Pages/Profil";
import Crudproduct from "./Pages/Crudproduct";
import ResetPassPage from "./Components/ResetPassPage";
import Kelolaartikel from "./Components/Kelolaartikel";
import Kelolauser from "./Components/Kelolauser";
import ProductPageV2 from "./Pages/ProductPageV2";
import ProdukIOT from "./Pages/ProdukIOT";

import MitraProdukContext from "./context/MitraProductContext";
import User from "./Pages/User";
import Artikel from "./Pages/Artikel";

const App = () => {
  let [mitraDetail, setMitraDetail] = useState({});
  let [listMitra, setListMitra] = useState([]);

  const value = { mitraDetail, setMitraDetail, listMitra, setListMitra };

  return (
    <MitraProdukContext.Provider value={value}>
      <Router>
        <MainNavbar />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/login/admin" element={<LoginAdmin />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Home />} />
          <Route path="/About" element={<About />} />
          <Route path="/product" element={<Product />} />
          <Route path="/productv2" element={<ProductPageV2 />} />
          <Route path="/product/mitra/:idMitra" element={<ProductMitra />} />
          <Route path="/news" element={<News />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/Deskripsi/:idProduct" element={<Deskripsi />} />
          <Route path="/login/forgot-password" element={<Fpass />} />
          <Route path="/login/reset-password" element={<ResetPassPage />} />
          <Route path="/Profil" element={<Profil />} />
          <Route path="/crudproduk" element={<Crudproduct />} />
          <Route path="/user" element={<User />} />
          <Route path="/artikel" element={<Artikel />} />
          <Route path="/produkiot" element={<ProdukIOT />} />
        </Routes>
      </Router>
    </MitraProdukContext.Provider>
  );
};

export default App;
