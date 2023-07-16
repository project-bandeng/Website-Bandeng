import React, { useState } from 'react';
import { Link, BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import About from './Pages/About';
import Home from './Pages/Home';
import Product from './Pages/Product';
import News from './Pages/News';
import Contact from './Pages/Contact';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap';
import Logo from './Image/Logo.png';


const App = () => {

  const [searchText, setSearchText] = useState('');

  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    console.log('Pencarian:', searchText);
    setSearchText('');
  };

  return (
    <Router>
      <div className="container-fluid">
      <nav className="navbar navbar-expand-lg navbar-light bg-light justify-content-between px-5 fixed-top">
      <img src={Logo} alt="Logo" width="200px" className="img-fluid" />
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
            <ul className="navbar-nav gap-2">
              <li className="nav-item">
                <Link to="/" className="nav-link">Home</Link>
              </li>
              <li className="nav-item">
                <Link to="/about" className="nav-link">About</Link>
              </li>
              <li className="nav-item">
                <Link to="/product" className="nav-link">Product</Link>
              </li>
              <li className="nav-item">
                <Link to="/news" className="nav-link">News</Link>
              </li>
              <li className="nav-item">
                <Link to="/contact" className="nav-link">Contact</Link>
              </li>
            </ul>
          </div>
          <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
            <form className="d-flex ms-5 ms-md-0" onSubmit={handleSearchSubmit}>
              <div className="input-group">
                <input
                  className="form-control me-2"
                  type="search"
                  placeholder="Cari..."
                  aria-label="Search"
                  value={searchText}
                  onChange={handleSearchChange}
                />
                <div className="input-group-append">
                  <button className="btn btn-primary" type="submit">Cari</button>
                </div>
              </div>
            </form>
          </div>
      </nav>
        </div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/About" element={<About />} />
        <Route path="/product" element={<Product />} />
        <Route path="/news" element={<News />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </Router>
  )
}

export default App;
