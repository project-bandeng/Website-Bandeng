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
import About1 from '../Image/about-image1.png';
import About2 from '../Image/about-image2.png';
import About3 from '../Image/about-image3.png';
// import Swiper core and required modules
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';


const Homepage = () => {
    const elements = [];
    for (let i = 0; i < 6; i++) {
      elements.push(<SwiperSlide key={i}>
        <div className="col">
          <Card>
            <Card.Body>
            <img className="d-block w-100 mb-3 rounded-3" src={Produk} alt=""/>
              <Card.Title className='mb-3'>Bandeng Juwana</Card.Title>
              <Button variant="primary">Lihat Selengkapnya</Button>
            </Card.Body>
          </Card>
        </div>
        </SwiperSlide>);
    }
    return (
      <div className="container-fluid" style={{paddingLeft: 0, paddingRight: 0}}>
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
         <h1 className='text-white position-absolute start-50 translate-middle-x heading3'>MEMPERLUAS JARINGAN PASAR</h1>
          <h3 className='text-white position-absolute start-50 translate-middle-x heading4'>PENINGKATAN EKONOMI UMKM</h3>
          <p className='text-white position-absolute start-50 translate-middle-x content1'>Memberikan Kemudahan Dalam Proses Berbelanja</p>
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
      <div className="container-fluid pt-4" style={{ backgroundColor: '#47545F' }}>
        <h1 className='text-white start-50 heading1 text-center'>MITRA <span style={{color: '#0497FF'}}>D'BANDENG</span></h1>
        <p className='text-white h6 mb-4 text-center'>Toko yang tergabung dalam D’Bandeng</p>
        <div className="row justify-content-center">
        <div className='col-md-9'>
        <Swiper
        // install Swiper modules
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        spaceBetween={35}
        slidesPerView={3}
        navigation
        pagination={{ clickable: true }}
        scrollbar={{ draggable: true }}
        onSwiper={(swiper) => console.log(swiper)}
        onSlideChange={() => console.log('slide change')}>
          {elements}
        </Swiper>
        </div>
        </div>
        <div className="row justify-content-center mt-5">
          <div className="col-md-4">
            <h3 className='text-white start-50 heading3'>ABOUT <span style={{color: '#0497FF'}}>D'BANDENG</span></h3>
            <p className='text-white' style={{fontSize: '1.3rem'}}>Kami menyediakan berbagai macam jenis olahan ikan bandeng kepada pelanggan kami dengan menjaga kualitas dan kelezatannya</p>
            <Link to="/about"><button type="button" className='btn btn-primary button1'>SELENGKAPNYA</button></Link>
          </div>
          <div className="col-md-7 d-flex align-items-center">
            <div className="p-3 bg-secondary rounded-3 d-flex gap-5">
            <div className='rounded-3 card p-2'>
              <div className="" style={{width: '180px'}}>
                <img src={About1} alt="img-vision" className='about-img'/>
                <h3 style={{color: '#6B5CCC'}}>Vision</h3>
                <div className="about-card-content">
                  <p>Mengoptimalkan pemasaran secara online</p>
                </div>
              </div>
            </div>
            <div className='rounded-3 card p-2'>
              <div className="" style={{width: '180px'}}>
                <img src={About2} alt="img-vision" className='about-img'/>
                <h3 style={{color: '#6B5CCC'}}>Mision</h3>
                <div className="about-card-content">
                  <p>Membantu masyarakat dalam memasarkan dan mempromosikan produk</p>
                </div>
              </div>
            </div>
            <div className='rounded-3 card p-2'>
              <div className="" style={{width: '180px'}}>
                <img src={About3} alt="img-vision" className='about-img'/>
                <h3 style={{color: '#6B5CCC'}}>Objective</h3>
                <div className="about-card-content">
                  <p>Memperluas jangkauan pasar dan jaringan pasar</p>
                </div>
              </div>
            </div>
            </div>
          </div>
        </div>
      </div>
      </div>
      </div>
      </div>
    );
  };
  
  export default Homepage