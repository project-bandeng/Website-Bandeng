import React from 'react'
import Carousel1 from '../Image/carousel1.png';
import Carousel2 from '../Image/carousel2.png';
import Carousel3 from '../Image/carousel3.png';
import Produk from '../Image/Produk.jpg'
import news1 from '../Image/news1.JPG'
import news2 from '../Image/news2.JPG'
import news3 from '../Image/news3.JPG'
import news4 from '../Image/news4.JPG'
import { Carousel, Card, Button } from 'react-bootstrap';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap';
import { Link } from 'react-router-dom';
import About1 from '../Image/about-image1.png';
import About2 from '../Image/about-image2.png';
import About3 from '../Image/about-image3.png';
import LogoMitra1 from '../Image/juwana-logo.png';
import Cart from '../Image/Cart.png';
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
              <Link to=''><Button variant="primary">Lihat Selengkapnya</Button></Link>
            </Card.Body>
          </Card>
        </div>
        </SwiperSlide>);
    }
    return (
      <div className="container-fluid" style={{paddingLeft: 0, paddingRight: 0}}>
      {/* carousel Section */}
      <div className="row">
      <div className="col">
      <Carousel>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={Carousel1}
          alt="Slide 1"
        />
        <h1 className='text-white position-absolute start-50 translate-middle-x heading1'>SELAMAT DATANG DI <span style={{color: '#5CBBFF'}}>D'BANDENG</span></h1>
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
      {/* mitra Section */}
      <div className="container-fluid pt-4" style={{ backgroundColor: '#47545F' }}>
        <h1 className='text-white start-50 heading1 text-center'>MITRA <span style={{color: '#5CBBFF'}}>D'BANDENG</span></h1>
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
        {/* about Section */}
        <div className="row justify-content-center mt-5 pb-5">
          <div className="col-md-4">
            <h3 className='text-white start-50 heading3'>ABOUT <span style={{color: '#5CBBFF'}}>D'BANDENG</span></h3>
            <p className='text-white' style={{fontSize: '1.3rem'}}>Kami menyediakan berbagai macam jenis olahan ikan bandeng kepada pelanggan kami dengan menjaga kualitas dan kelezatannya</p>
            <Link to="/about"><button type="button" className='btn btn-primary button1'>SELENGKAPNYA</button></Link>
          </div>
          <div className="col-md-7 d-flex align-items-center">
            <div className="p-3 rounded-3 d-flex gap-5 container-about-card">
            <div className='rounded-3 card p-2 container-card'>
              <div className="container-content-card" style={{width: '175px'}}>
                <img src={About1} alt="img-vision" className='about-img'/>
                <h3 style={{color: '#6B5CCC'}}>Vision</h3>
                <div className="about-card-content">
                  <p>Mengoptimalkan pemasaran secara online</p>
                </div>
              </div>
            </div>
            <div className='rounded-3 card p-2 container-card1'>
              <div className="container-content-card" style={{width: '180px'}}>
                <img src={About2} alt="img-vision" className='about-img'/>
                <h3 style={{color: '#6B5CCC'}}>Mision</h3>
                <div className="about-card-content1">
                  <p>Membantu masyarakat dalam memasarkan dan mempromosikan produk</p>
                </div>
              </div>
            </div>
            <div className='rounded-3 card p-2 container-card2'>
              <div className="container-content-card" style={{width: '175px'}}>
                <img src={About3} alt="img-vision" className='about-img'/>
                <h3 style={{color: '#6B5CCC'}}>Objective</h3>
                <div className="about-card-content2">
                  <p>Memperluas jangkauan pasar dan jaringan pasar</p>
                </div>
              </div>
            </div>
            </div>
          </div>
        </div>
      </div>
      {/* product Section */}
      <div className="container-fluid pt-4" style={{backgroundColor: '#DDE6ED'}}>
        <h1 className='product-title text-center'>Products</h1>
        <div className="container-card-product row mt-5 mx-5">
          <div className="col-md-3 d-flex flex-column gap-3">
            <div className="card rounded-3" style={{height: '270px'}}>
              <img src={LogoMitra1} alt="logo-mitra" className='rounded-3'/>
            </div>
            <div className="card rounded-3" style={{height: '270px'}}>
              <img src={LogoMitra1} alt="logo-mitra" className='rounded-3' />
            </div>
          </div>
          <div className="col-md-3 d-flex flex-column gap-3">
          <div className="card rounded-3" style={{height: '270px'}}>
              <img src={Produk} alt="logo-mitra" className='rounded-3' />
              <h3 className='text-center fw-bold' style={{color: '#0F75BD'}}>Bandeng Presto</h3>
              <div className='d-flex justify-content-between align-items-center px-4'>
                <p className='product-price mb-0'>Rp. 15.000</p>
                <div className='rounded-circle bg-primary p-2'>
                  <img src={Cart} alt="keranjang" width='25px'/>
                </div>
              </div>
            </div>
            <div className="card rounded-3" style={{height: '270px'}}>
              <img src={Produk} alt="logo-mitra" className='rounded-3' />
              <h3 className='text-center fw-bold' style={{color: '#0F75BD'}}>Bandeng Presto</h3>
              <div className='d-flex justify-content-between align-items-center px-4'>
                <p className='product-price mb-0'>Rp. 15.000</p>
                <div className='rounded-circle bg-primary p-2'>
                  <img src={Cart} alt="keranjang" width='25px'/>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-3 d-flex flex-column gap-3">
            <div className="card rounded-3" style={{height: '270px'}}>
              <img src={Produk} alt="logo-mitra" className='rounded-3'/>
              <h3 className='text-center fw-bold' style={{color: '#0F75BD'}}>Bandeng Presto</h3>
              <div className='d-flex justify-content-between align-items-center px-4'>
                <p className='product-price mb-0'>Rp. 15.000</p>
                <div className='rounded-circle bg-primary p-2'>
                  <img src={Cart} alt="keranjang" width='25px'/>
                </div>
              </div>
            </div>
            <div className="card rounded-3" style={{height: '270px'}}>
              <img src={Produk} alt="logo-mitra" className='rounded-3' />
              <h3 className='text-center fw-bold' style={{color: '#0F75BD'}}>Bandeng Presto</h3>
              <div className='d-flex justify-content-between align-items-center px-4'>
                <p className='product-price mb-0'>Rp. 15.000</p>
                <div className='rounded-circle bg-primary p-2'>
                  <img src={Cart} alt="keranjang" width='25px'/>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-3 d-flex flex-column gap-3">
            <div className="card rounded-3" style={{height: '270px'}}>
              <img src={Produk} alt="logo-mitra" className='rounded-3'/>
              <h3 className='text-center fw-bold' style={{color: '#0F75BD'}}>Bandeng Presto</h3>
              <div className='d-flex justify-content-between align-items-center px-4'>
                <p className='product-price mb-0'>Rp. 15.000</p>
                <div className='rounded-circle bg-primary p-2'>
                  <img src={Cart} alt="keranjang" width='25px'/>
                </div>
              </div>
            </div>
            <div className="card rounded-3" style={{height: '270px'}}>
              <img src={Produk} alt="logo-mitra" className='rounded-3' />
              <h3 className='text-center fw-bold' style={{color: '#0F75BD'}}>Bandeng Presto</h3>
              <div className='d-flex justify-content-between align-items-center px-4'>
                <p className='product-price mb-0'>Rp. 15.000</p>
                <div className='rounded-circle bg-primary p-2'>
                  <img src={Cart} alt="keranjang" width='25px'/>
                </div>
              </div>
            </div>
          </div>
          <div className="col-2 mx-auto mt-5">
            <Link to=''><Button type="button">Lihat Selengkapnya</Button></Link>
          </div>
        </div>
        <h1 className='news-title text-center mt-4'>NEWS</h1>
        <p className='text-center'>Berita terbaru terkait informasi Bandeng pada wilayah Krobokan Kota Semarang</p>
        <div className="news-container row">
        </div>
      {/* News Section */}
      <div className="container-fluid pt-4" style={{backgroundColor: '#DDE6ED'}}>
        <div className="container-card-product row mt-1 mx-5 justify-content-center">
          <div className="col-md-3 d-flex flex-column gap-3">
            <div className="card rounded-3">
              <img src={news4} alt="logo-mitra" className='rounded-3' />
            </div>
            <div className="card rounded-3">
              <img src={news3} alt="logo-mitra" className='rounded-3' />
            </div>
          </div>
          <div className="col-md-3 d-flex flex-column gap-3">
          <div className="card rounded-3">
              <img src={news1} alt="logo-mitra" className='rounded-3' />
            </div>
            <div className="card rounded-3">
              <img src={news2} alt="logo-mitra" className='rounded-3' />
            </div>
          </div>
          <div className="col-md-3 d-flex flex-column gap-3">
          <div className="card rounded-3">
              <img src={news3} alt="logo-mitra" className='rounded-3' />
            </div>
            <div className="card rounded-3">
              <img src={news4} alt="logo-mitra" className='rounded-3' />
            </div>
          </div>
        </div>
      </div>
      <div className="container pt-4" style={{backgroundColor: '#DDE6ED'}}>
        <h1 className='ms-5 info-title text-center'>Kenapa Harus D'Bandeng?</h1>
          <div className="container pt-4">
            <div className=" justify-content-center d-flex gap-5">
              <div className='d-flex me-5'>
              <div className="circle ">
              </div>
              <h3 className='text'><span>Fleksibel</span></h3>
              </div>  
              <div className='d-flex me-5'>
              <div className="circle ">
              </div>
              <h3 className='text'><span>Fleksibel</span></h3>
              </div>
              <div className='d-flex'>
              <div className="circle ">
              </div>
              <h3 className='text'><span>Fleksibel</span></h3>
              </div>
            </div>
        </div>
        </div>
        <div className="container pt-5" style={{backgroundColor: '#DDE6ED'}}>
        <h1 className='news-title text-center'>Contact</h1>
          <div className="ms-5 container-fluid pt-4 justify-content-center">
            <div class="mb-3 row">
            <label for="inputPassword" class="col-auto"><h3 className=''><span>E-Mail:</span></h3></label>
              <div class="col-sm-10">
                <input type="password" class="form-control shadow" id="inputPassword"></input>
              </div>
            </div>
            <div class="mb-3 row">
            <label for="inputPassword" class="col-auto"><h3 className=''><span>Nama :</span></h3></label>
              <div class="col-sm-10">
                <input type="password" class="form-control shadow" id="inputPassword"></input>
              </div>
            </div>
            <div class="mb-3">
            <label for="inputPassword" class="col-auto"><h3 className=''><span>Pesan :</span></h3></label>
              <div class="col-sm-10">
                <input type="password" class="form-control shadow" id="inputPassword" style={{width:'110%', height:'150px'}}></input>
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