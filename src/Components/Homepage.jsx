import React, { useContext, useEffect, useState } from 'react';
import MitraProdukContext from '../context/MitraProductContext';
import config from '../config';
import axios from '../service/axios';
import Produk from '../Image/Produk.jpg';
import { Card, Button } from 'react-bootstrap';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap';
import { Link } from 'react-router-dom';
import About1 from '../Image/about-image1.png';
import About2 from '../Image/about-image2.png';
import About3 from '../Image/about-image3.png';
import LogoMitra1 from '../Image/juwana-logo.png';
import logo2 from '../Image/logo2.png';
import Cart from '../Image/Cart.png';
// import Swiper core and required modules
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

//Import Component Homepage
import Product from './Homepage/Product';
import News from './Homepage/News';
import Contact from './Homepage/Contact';
import CarouselHead from './Homepage/CarouselHead';
import MitraSection from './Homepage/MitraSection';

const Homepage = () => {
  const elements = [
    {
      fotoMitra: Produk,
      namaMitra: 'Bandeng Juwana',
      link: '',
    },
    {
      fotoMitra: Produk,
      namaMitra: 'Bandeng Juwana',
      link: '',
    },
    {
      fotoMitra: Produk,
      namaMitra: 'Bandeng Juwana',
      link: '',
    },
    {
      fotoMitra: Produk,
      namaMitra: 'Bandeng Juwana',
      link: '',
    },
    {
      fotoMitra: Produk,
      namaMitra: 'Bandeng Juwana',
      link: '',
    },
    {
      fotoMitra: Produk,
      namaMitra: 'Bandeng Juwana',
      link: '',
    },
  ];

  const { listMitra, setListMitra } = useContext(MitraProdukContext);
  const [mitraDataLocal, setMitraDataLocal] = useState([]);

  const fetchMitraData = () => {
    axios
      .get(`/api/mitra/all`)
      .then((res) => {
        setMitraDataLocal(res.data.data);
        setListMitra(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  function convertImageURL(url) {
    const BACKEND_DOMAIN = config.BACKEND_URL;
    let path = BACKEND_DOMAIN + url;
    return path;
  }

  const isMitraHasFoto = (item) => {
    if (item) {
      if (item.foto_mitra) {
        return true;
      }
    }
  };

  useEffect(() => {
    if (listMitra.length === 0) {
      console.log('data diambil dari server');
      fetchMitraData();
    } else {
      console.log('data diambil dari context');
      setMitraDataLocal(listMitra);
    }
  }, []);

  return (
    <>
      <CarouselHead />
      <MitraSection />
      {/* about Section */}
      <section className="section-about" style={{ backgroundColor: '#47545F' }}>
        <div className="d-flex py-5 container flex-sm-column">
          <div className="">
            <h3 className="text-white start-50 heading3">
              ABOUT <span style={{ color: '#5CBBFF' }}>D'BANDENG</span>
            </h3>
            <p className="text-white" style={{ fontSize: '1.3rem' }}>
              Kami menyediakan berbagai macam jenis olahan ikan bandeng kepada pelanggan kami dengan menjaga kualitas dan kelezatannya
            </p>
            <Link to="/about">
              <button type="button" className="btn btn-primary button1">
                SELENGKAPNYA
              </button>
            </Link>
          </div>
          <div className="d-flex align-items-center">
            <div className="p-3 rounded-3 d-flex gap-5 container-about-card">
              <div className="rounded-3 card p-2 container-card">
                <div className="container-content-card" style={{ width: '175px' }}>
                  <img src={About1} alt="img-vision" className="about-img" />
                  <h3 style={{ color: '#6B5CCC' }}>Vision</h3>
                  <div className="about-card-content">
                    <p>Mengoptimalkan pemasaran secara online</p>
                  </div>
                </div>
              </div>
              <div className="rounded-3 card p-2 container-card1">
                <div className="container-content-card" style={{ width: '180px' }}>
                  <img src={About2} alt="img-vision" className="about-img" />
                  <h3 style={{ color: '#6B5CCC' }}>Mision</h3>
                  <div className="about-card-content1">
                    <p>Membantu masyarakat dalam memasarkan dan mempromosikan produk</p>
                  </div>
                </div>
              </div>
              <div className="rounded-3 card p-2 container-card2">
                <div className="container-content-card" style={{ width: '175px' }}>
                  <img src={About3} alt="img-vision" className="about-img" />
                  <h3 style={{ color: '#6B5CCC' }}>Objective</h3>
                  <div className="about-card-content2">
                    <p>Memperluas jangkauan pasar dan jaringan pasar</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
    //             {/* product Section */}
    //             <div
    //                 className="container-fluid pt-4"
    //                 style={{ backgroundColor: "#DDE6ED" }}
    //             >
    //                 <Product />
    //                 <News />

    //                 <div
    //                     className="container-fluid pt-4"
    //                     style={{ backgroundColor: "#DDE6ED" }}
    //                 >
    //                     <h1 className="info-title text-center">
    //                         Kenapa Harus D'Bandeng?
    //                     </h1>

    //                 </div>
    //                 <Contact />
    //                 <div
    //                     className="container-fluid pt-5 pb-5"
    //                     style={{ backgroundColor: "#0F75BD" }}
    //                 >
    //                     <footer>
    //                         <div className="ms-5">
    //                             <img src={logo2} />
    //                         </div>
    //                     </footer>
    //                 </div>
    //             </div>
    //         </div>
    //     </div>
    // </div>
  );
};

export default Homepage;
