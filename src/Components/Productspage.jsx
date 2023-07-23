
import React from "react";
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap';
import logo2 from '../Image/logo2.png'
import Produk from '../Image/Produk.jpg'
   
    const Productpage = ({ id, name, description, price, imageUrl }) => {
        return (
<div className="container-news" style={{backgroundColor: '#DDE6ED'}}>
        <h1 className='text-center'>Products</h1>
        <div className="container-card-product row mt-3 mx-5 justify-content-center">
          <div className="col-md-3 d-flex flex-column gap-3 pb-5">
          <div className="card rounded-3" style={{height: '270px'}}>
              <img src={Produk} alt="logo-mitra" className='rounded-3' />
              <h3 className='text-center fw-bold' style={{color: '#0F75BD'}}>Bandeng Presto</h3>
            </div>
            <div className="card rounded-3" style={{height: '270px'}}>
              <img src={Produk} alt="logo-mitra" className='rounded-3' />
              <h3 className='text-center fw-bold' style={{color: '#0F75BD'}}>Bandeng Presto</h3>
            </div>
          </div>
          <div className="col-md-3 d-flex flex-column gap-3">
            <div className="card rounded-3" style={{height: '270px'}}>
              <img src={Produk} alt="logo-mitra" className='rounded-3'/>
              <h3 className='text-center fw-bold' style={{color: '#0F75BD'}}>Bandeng Presto</h3>
            </div>
            <div className="card rounded-3" style={{height: '270px'}}>
              <img src={Produk} alt="logo-mitra" className='rounded-3' />
              <h3 className='text-center fw-bold' style={{color: '#0F75BD'}}>Bandeng Presto</h3>
            </div>
          </div>
          <div className="col-md-3 d-flex flex-column gap-3">
            <div className="card rounded-3" style={{height: '270px'}}>
              <img src={Produk} alt="logo-mitra" className='rounded-3'/>
              <h3 className='text-center fw-bold' style={{color: '#0F75BD'}}>Bandeng Presto</h3>
            </div>
            <div className="card rounded-3" style={{height: '270px'}}>
              <img src={Produk} alt="logo-mitra" className='rounded-3' />
              <h3 className='text-center fw-bold' style={{color: '#0F75BD'}}>Bandeng Presto</h3>
            </div>
          </div>
          </div>
          <div className="pt-5 pb-5" style={{backgroundColor: '#0F75BD'}}>
            <div className='ms-5'>
            <img src={logo2} />
            </div>
            </div>
          </div>
        );
      };
      
      export default Productpage;