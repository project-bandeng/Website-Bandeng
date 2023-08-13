import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import config from '../../config';
import React, { useContext, useEffect, useState } from 'react';
import axios from '../../service/axios';
import MitraProdukContext from '../../context/MitraProductContext';
import '../../App.css';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

export default function MitraSection() {
  const [mitraDataLocal, setMitraDataLocal] = useState([]);
  const { listMitra, setListMitra } = useContext(MitraProdukContext);

  const CardMitra = ({ fotoMitra, namaMitra, link }) => {
    return (
      <div className="col">
        <Card>
          <Card.Body>
            <img className="d-block w-100 mb-3 rounded-3" src={fotoMitra} alt="Logo Mitra " />
            <Card.Title className="mb-3 Card-mitra-title">{namaMitra}</Card.Title>
            <Link to="">
              <Button variant="primary Card-mitra-button">Lihat Selengkapnya</Button>
            </Link>
          </Card.Body>
        </Card>
      </div>
    );
  };

  const isMitraHasFoto = (item) => {
    if (item) {
      if (item.foto_mitra) {
        return true;
      }
    }
  };

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
    // Mitra Section Start
    <section className="section-mitra" style={{ backgroundColor: '#47545F' }}>
      <div className="container py-5">
        <h1 className="text-white start-50 heading1 text-center">
          MITRA <span style={{ color: '#5CBBFF' }}>D'BANDENG</span>
        </h1>
        <p className="text-white h6 mb-4 text-center section-mitra-content">Toko yang tergabung dalam D’Bandeng</p>
        <Swiper
          // install Swiper modules
          modules={[Navigation, Pagination, Scrollbar, A11y]}
          slidesPerView={1}
          spaceBetween={10}
          className='mySwiper'
          navigation
          pagination={{ clickable: true }}
          scrollbar={{ draggable: true }}
          onSwiper={(swiper) => console.log(swiper)}
          onSlideChange={() => console.log('slide change')}
          breakpoints={{
            768: {
                spaceBetween: 35,
                slidesPerView: 3,
            },
            560: {
                spaceBetween: 25,
                slidesPerView: 2,
            }
          }}
        >
          {mitraDataLocal.map((item, key) => {
            return (
              <SwiperSlide key={key}>
                <CardMitra fotoMitra={isMitraHasFoto(item) ? convertImageURL(item.foto_mitra) : ''} namaMitra={item.namaMitra} link={item.link} />
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </section>
  );
}
