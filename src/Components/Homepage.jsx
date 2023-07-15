import React from 'react'
import Carousel1 from '../Image/carousel1.png';
import Carousel2 from '../Image/carousel2.png';
import Carousel3 from '../Image/carousel3.png';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap';
import { Link } from 'react-router-dom';

const Homepage = () => {
    return (
      <div className="container-fluid">
      <div id="carouselExampleSlidesOnly" className="carousel slide carousel-fade" data-bs-ride="carousel">
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img src={Carousel1} className="d-block w-100" alt="img1"/>
            <h1 className='text-white position-absolute start-50 translate-middle-x heading1'>SELAMAT DATANG DI <span style={{color: '#0497FF'}}>D'BANDENG</span></h1>
            <h3 className='text-white position-absolute start-50 translate-middle-x heading2'>DIGITALISASI UMKM BANDENG</h3>
            <p className='text-white position-absolute start-50 translate-middle-x content'>Solusi Tepat Untuk Informasi Olahan Ikan Bandeng</p>
            <Link to="/about"><button type="button" className='btn position-absolute start-50 translate-middle-x btn-primary button1'>MULAI</button></Link>
          </div>
          <div className="carousel-item">
            <img src={Carousel2} className="d-block w-100" alt="img2"/>
            <h1 className='text-white position-absolute start-50 translate-middle-x heading3'>MEMPERLUAS JARINGAN PASAR</h1>
            <h3 className='text-white position-absolute start-50 translate-middle-x heading4'>PENINGKATAN EKONOMI UMKM</h3>
            <p className='text-white position-absolute start-50 translate-middle-x content1'>Memberikan Kemudahan Dalam Proses Berbelanja</p>
            <Link to="/about"><button type="button" className='btn position-absolute start-50 translate-middle-x btn-primary button1'>MULAI</button></Link>
          </div>
          <div className="carousel-item">
            <img src={Carousel3} className="d-block w-100" alt="img3"/>
            <h1 className='text-white position-absolute start-50 translate-middle-x heading1'>SELAMAT DATANG DI </h1>
            <h3 className='text-white position-absolute start-50 translate-middle-x heading2'>DIGITALISASI UMKM BANDENG</h3>
            <p className='text-white position-absolute start-50 translate-middle-x content'>Solusi Tepat Untuk Informasi Olahan Ikan Bandeng</p>
            <Link to="/about"><button type="button" className='btn position-absolute start-50 translate-middle-x btn-primary button1'>MULAI</button></Link>
          </div>
        </div>
      </div>
      </div>
    );
  };
  
  export default Homepage