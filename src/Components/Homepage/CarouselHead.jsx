import Carousel1 from '../../Image/carousel1.png';
import Carousel2 from '../../Image/carousel2.png';
import Carousel3 from '../../Image/carousel3.png';
import { Link } from 'react-router-dom';
import { Carousel } from 'react-bootstrap';

export default function CarouselHead() {
  return (
    // carousel section start
    <section className=''>
      <div className="container-fluid" style={{ paddingLeft: 0, paddingRight: 0 }}>
      <Carousel>
        <Carousel.Item>
          <img className="d-block w-100" src={Carousel1} alt="Slide 1" />
          <h1 className="text-white position-absolute start-50 translate-middle-x heading1">
            SELAMAT DATANG DI <span style={{ color: '#5CBBFF' }}>D'BANDENG</span>
          </h1>
          <h3 className="text-white position-absolute start-50 translate-middle-x heading2">DIGITALISASI UMKM BANDENG</h3>
          <p className="text-white position-absolute start-50 translate-middle-x content">Solusi Tepat Untuk Informasi Olahan Ikan Bandeng</p>
          <Link to="/about">
            <button type="button" className="btn position-absolute start-50 translate-middle-x btn-primary button1">
              SELENGKAPNYA
            </button>
          </Link>
        </Carousel.Item>
        <Carousel.Item>
          <img className="d-block w-100" src={Carousel2} alt="Slide 2" />
          <h1 className="text-white position-absolute start-50 translate-middle-x heading3">MEMPERLUAS JARINGAN PASAR</h1>
          <h3 className="text-white position-absolute start-50 translate-middle-x heading4">PENINGKATAN EKONOMI UMKM</h3>
          <p className="text-white position-absolute start-50 translate-middle-x content1">Memberikan Kemudahan Dalam Proses Berbelanja</p>
          <Link to="/about">
            <button type="button" className="btn position-absolute start-50 translate-middle-x btn-primary button1">
              SELENGKAPNYA
            </button>
          </Link>
        </Carousel.Item>
        <Carousel.Item>
          <img className="d-block w-100" src={Carousel3} alt="Slide 3" />
          <h1 className="text-white position-absolute start-50 translate-middle-x heading1">PELAYANAN YANG CEPAT</h1>
          <h3 className="text-white position-absolute start-50 translate-middle-x heading2">FLEKSIBILITAS DALAM BERBELANJA</h3>
          <p className="text-white position-absolute start-50 translate-middle-x content">Pengalaman Berbelanja Yang Lebih Tepat</p>
          <Link to="/about">
            <button type="button" className="btn position-absolute start-50 translate-middle-x btn-primary button1">
              SELENGKAPNYA
            </button>
          </Link>
        </Carousel.Item>
      </Carousel>
    </div>
    </section>
    // carousel section End
  );
}
