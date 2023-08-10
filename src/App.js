// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import About from './Pages/About';
import Home from './Pages/Home';
import Product from './Pages/Product';
import News from './Pages/News';
import Contact from './Pages/Contact';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap';
import Login from './Pages/Login';
import Register from './Pages/Register';
import MainNavbar from './Components/MainNavbar';
import Deskripsi from './Pages/Deskripsi';
import Fpass from './Pages/Fpass';
import Profil from './Pages/Profil';
import Crudproduct from './Pages/Crudproduct';

const App = () => {
  return (
    <Router>
      <MainNavbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Home />} />
        <Route path="/About" element={<About />} />
        <Route path="/product" element={<Product />} />
        <Route path="/news" element={<News />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/Deskripsi" element={<Deskripsi />} />
        <Route path="/login/forgot-password" element={<Fpass />} />
        <Route path="/Profil" element={<Profil />} />
        <Route path="/Crudproduk" element={<Crudproduct />} />
      </Routes>
    </Router>
  );
};

export default App;
