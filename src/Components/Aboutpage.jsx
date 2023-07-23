import React from 'react'
import { Carousel, Card, Button } from 'react-bootstrap';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap';
import { Link } from 'react-router-dom';
import 'typeface-poppins';
import logo2 from '../Image/logo2.png'

const Aboutpage = () => {
    return (
        <div className="container mt-5">
        <div className="row">
        <div className="col">
        <h3 className='mt-5 pt-lg-5'><span style={{color: '#0497FF'}}>Selamat Datang di Website D'Bandeng</span></h3>
        <p style={{fontFamily: 'poppins'}}>D’Bandeng merupakan sebuah website yang digunakan untuk penyaluran informasi mengenai pengelolaan ikan bandeng pada wilayah semarang. Website D’Bandeng juga digunakan sebagai media promosi berbagai produk olahan ikan bandeng untuk dipasarkan lebih luas ke berbagai daerah di Indonesia.</p>
        <p className='text-center mt-5' style={{fontFamily: 'poppins'}}>Berita terbaru terkait informasi Bandeng pada wilayah Krobokan</p>
        <div className='container-fluid d-flex justify-content-center align-items-center mb-5'>
        <div className="row">
        <div className="col-sm-4">
          <Card>
            <Card.Body className='shadow' style={{height: '300px'}}>
              <Card.Title>Card 1</Card.Title>
              <Card.Text>
                This is the content of Card 1.
              </Card.Text>
            </Card.Body>
          </Card>
        </div>
        <div className="col-sm-4">
          <Card>
            <Card.Body className='shadow' style={{height: '300px'}}>
              <Card.Title>Card 2</Card.Title>
              <Card.Text>
                This is the content of Card 2.
              </Card.Text>
            </Card.Body>
          </Card>
        </div>
        <div className="col-sm-4">
          <Card>
            <Card.Body className='shadow' style={{height: '300px'}}>
              <Card.Title>Card 3</Card.Title>
              <Card.Text>
                This is the content of Card 3.
              </Card.Text>
            </Card.Body>
          </Card>
        </div>
        </div>
        </div>
      </div>
      <div className="container-fluid pt-5 pb-5" style={{backgroundColor: '#0F75BD'}}>
        <div className='ms-5'>
          <img src={logo2} />
          </div>
      </div>
      </div>
      </div>
    );
  };

    export default Aboutpage