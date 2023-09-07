import Titok from '../../Image/tiktok.png';
import Lokasi from '../../Image/lokasi.png';
import Instagram from '../../Image/instagram.png';
import Gmail from '../../Image/gmail.png';
import logo2 from '../../Image/logo2.png';
import { Link } from 'react-router-dom';

export default function Footer() { 
    return (
        <div className="container-fluid pt-5 pb-5" style={{ backgroundColor: '#0F75BD' }}>
        <footer className="d-flex flex-md-row flex-column">
          <div className="d-flex justify-content-center w-md-25 w-50 mx-auto mx-md-0">
            <img src={logo2} />
          </div>
          <div className="d-flex justify-content-center flex-column w-md-25 w-sm-50 w-75 mx-auto mx-md-0">
            <h3 style={{ color: '#C5DFF8' }} className='text-md-start text-center'>D'Bandeng</h3>
            <p className="text-white text-md-start text-center">Kami menyediakan berbagai macam jenis olahan ikan bandeng kepada pelanggan kami dengan menjaga kualitas dan kelezatannya</p>
          </div>
          <div className="d-flex align-items-center flex-column w-md-25 w-50 mx-auto mx-md-0">
            <h3 style={{ color: '#C5DFF8' }}>Menu</h3>
            <ul className="p-0" style={{listStyle: "none"}}>
              <li className="nav-foot">
                <Link to="/" className="nav-link text-white">
                  Home
                </Link>
              </li>
              <li className="nav-foot">
                <Link to="/about" className="nav-link text-white">
                  About
                </Link>
              </li>
              <li className="nav-foot">
                <Link to="/product" className="nav-link text-white">
                  Product
                </Link>
              </li>
              <li className="nav-foot">
                <Link to="/news" className="nav-link text-white">
                  News
                </Link>
              </li>
              <li className="nav-foot">
                <Link to="/contact" className="nav-link text-white">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <div className="d-flex align-items-center flex-column w-md-25 w-50 mx-auto mx-md-0">
            <h3 style={{ color: '#C5DFF8' }}>Contact</h3>
            <ul className="p-0" style={{listStyle: "none"}}>
              <li className="nav-foot">
                <Link to="https://goo.gl/maps/jarpDpspEA7QQJsf8" className="nav-link text-white">
                  <img src={Lokasi} alt="lokasi" className='mx-2' style={{width: "20px"}}/>
                  <span>Lokasi</span>
                </Link>
              </li>
              <li className="nav-foot">
                <Link to="https://instagram.com/ppko_hmsisfoudinus?igshid=MzRlODBiNWFlZA==" className="nav-link text-white">
                  <img src={Instagram} alt="instagram" className='mx-2' style={{width: "20px"}}/>
                  <span>Instagram</span>
                </Link>
              </li>
              <li className="nav-foot">
                <Link to="https://www.tiktok.com/@ppko_dbandeng" className="nav-link text-white">
                  <img src={Titok} alt="tiktok" className='mx-2' style={{width: "20px"}}/>
                  <span>Tiktok</span>
                </Link>
              </li>
              <li className="nav-foot">
                <Link to="mailto:dbandengkrobokan@gmail.com" className="nav-link text-white">
                  <img src={Gmail} alt="Email" className='mx-2' style={{width: "20px"}}/>
                  <span>Email</span>
                </Link>
              </li>
            </ul>
          </div>
        </footer>
      </div>
    );
}