import React, { useState } from 'react';
import { Link, BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import About from './Pages/About';
import Home from './Pages/Home';
import 'bootstrap/dist/css/bootstrap.min.css';
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
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <img src={Logo} alt="Logo" width="200px" className="d-inline-block align-top" />
        <div className="container">
          <Link to="/" className="navbar-brand">Home</Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link to="/about" className="nav-link">About</Link>
              </li>
              <li className="nav-item">
                <Link to="/contact" className="nav-link">Product</Link>
              </li>
              <li className="nav-item">
                <Link to="/contact" className="nav-link">News</Link>
              </li>
              <li className="nav-item">
                <Link to="/contact" className="nav-link">Contact</Link>
              </li>
            </ul>
            <form className="form-inline ml-auto" onSubmit={handleSearchSubmit}>
              <div className="ms-5 input-group">
                <input
                  className="form-control me-2"
                  type="search"
                  placeholder="Cari..."
                  aria-label="Search"
                  value={searchText}
                  onChange={handleSearchChange}
                />
                <div className="input-group-append">
                  <button className="btn btn-outline-danger" type="submit">Cari</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </nav>
      <div className="container mt-5">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/About" element={<About />} />
      </Routes>
      </div>
    </Router>
  )
}

export default App;
