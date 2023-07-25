import React from "react";
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap';
import news1 from '../Image/news1.JPG'
import news2 from '../Image/news2.JPG'
import news3 from '../Image/news3.JPG'
import news4 from '../Image/news4.JPG'
import logo2 from '../Image/logo2.png'
import 'typeface-poppins';

const Newspage = () => {
    return (
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-9" style={{paddingTop:'100px', fontFamily: 'poppins'}}>
            <h2 className="card-title pb-4 text-center">Judul Berita Utama</h2>
              <div className="card-news mb-4">
                <img src={news1} className="card-img-top" alt="News" />
                <div className="card-body">
                <p className="text-center pt-5" style={{fontFamily: 'poppins'}}>
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. d.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-3 " style={{ backgroundColor: '#DDE6ED', paddingTop: '80px',fontFamily: 'poppins' }}>
              <div className="list-group">
                <a
                  href="#"
                  className="list-group-item list-group-item-action active"
                >
                  Berita Terbaru
                </a>
                <a href="#" className="list-group-item list-group-item-action">
                <img src={news1} className="card-img-top" alt="News" />
                </a>
                <a href="#" className="list-group-item list-group-item-action">
                <img src={news2} className="card-img-top" alt="News" />
                </a>
                <a href="#" className="list-group-item list-group-item-action">
                <img src={news3} className="card-img-top" alt="News" />
                </a>
                <a href="#" className="list-group-item list-group-item-action">
                <img src={news4} className="card-img-top" alt="News" />
                </a>
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
    
    }
    export default Newspage