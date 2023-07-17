import React from 'react'
import Carousel1 from '../Image/carousel1.png';
import Carousel2 from '../Image/carousel2.png';
import Carousel3 from '../Image/carousel3.png';
import Produk from '../Image/Produk.jpg'
import { Carousel, Card, Button } from 'react-bootstrap';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap';
import { Link } from 'react-router-dom';

const Homepage = () => {
    return (
      <div className="container-fluid">
      <div className="row">
      <div className="col">
      <Carousel>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={Carousel1}
          alt="Slide 1"
        />
        <h1 className='text-white position-absolute start-50 translate-middle-x heading1'>SELAMAT DATANG DI <span style={{color: '#0497FF'}}>D'BANDENG</span></h1>
        <h3 className='text-white position-absolute start-50 translate-middle-x heading2'>DIGITALISASI UMKM BANDENG</h3>
        <p className='text-white position-absolute start-50 translate-middle-x content'>Solusi Tepat Untuk Informasi Olahan Ikan Bandeng</p>
        <Link to="/about"><button type="button" className='btn position-absolute start-50 translate-middle-x btn-primary button1'>SELENGKAPNYA</button></Link>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={Carousel2}
          alt="Slide 2"
        />
         <h1 className='text-white position-absolute start-50 translate-middle-x heading1'>MEMPERLUAS JARINGAN PASAR</h1>
          <h3 className='text-white position-absolute start-50 translate-middle-x heading2'>PENINGKATAN EKONOMI UMKM</h3>
          <p className='text-white position-absolute start-50 translate-middle-x content'>Memberikan Kemudahan Dalam Proses Berbelanja</p>
          <Link to="/about"><button type="button" className='btn position-absolute start-50 translate-middle-x btn-primary button1'>SELENGKAPNYA</button></Link>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={Carousel3}
          alt="Slide 3"
        />
        <h1 className='text-white position-absolute start-50 translate-middle-x heading1'>PELAYANAN YANG CEPAT</h1>
        <h3 className='text-white position-absolute start-50 translate-middle-x heading2'>FLEKSIBILITAS DALAM BERBELANJA</h3>
        <p className='text-white position-absolute start-50 translate-middle-x content'>Pengalaman Berbelanja Yang Lebih Tepat</p>
        <Link to="/about"><button type="button" className='btn position-absolute start-50 translate-middle-x btn-primary button1'>SELENGKAPNYA</button></Link>
      </Carousel.Item>
      </Carousel>
      <div className="container-fluid text-center pt-4" style={{ backgroundColor: '#47545F' }}>
        <h1 className='text-white start-50 heading1'>MITRA <span style={{color: '#0497FF'}}>D'BANDENG</span></h1>
        <div className="row justify-content-center">
          <div className="col-md-3">
            <Card>
              <Card.Body>
              <img className="d-block w-100 mb-3" src={Produk} alt=""/>
                <Card.Title className='mb-3'>Bandeng Juwana</Card.Title>
                <Button variant="primary">Lihat Selengkapnya</Button>
              </Card.Body>
            </Card>
          </div>
          <div className="col-md-3">
            <Card>
              <Card.Body>
              <img className="d-block w-100 mb-3" src={Produk} alt=""/>
                <Card.Title className='mb-3'>Bandeng Juwana</Card.Title>
                <Button variant="primary">Lihat Selengkapnya</Button>
              </Card.Body>
            </Card>
          </div>
          <div className="col-md-3">
            <Card>
              <Card.Body>
              <img className="d-block w-100 mb-3" src={Produk} alt=""/>
                <Card.Title className='mb-3'>Bandeng Juwana</Card.Title>
                <Button variant="primary">Lihat Selengkapnya</Button>
              </Card.Body>
            </Card>
          </div>
          <h3 className='text-white start-50 heading3'>ABOUT D'BANDENG</h3>
          <p className='text-white content'>Solusi Tepat Untuk Informasi Olahan Ikan Bandeng</p>
        </div>
      </div>
      </div>
      </div>
      </div>
    );
  };
  
  export default Homepage