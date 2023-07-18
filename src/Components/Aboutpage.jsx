import React from 'react'
import { Carousel, Card, Button } from 'react-bootstrap';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap';
import { Link } from 'react-router-dom';
import 'typeface-poppins';

const Aboutpage = () => {
    return (
        <div className="container mt-5">
        <div className="row">
        <div className="col">
        <h3 className='mt-5 pt-lg-5'><span style={{color: '#0497FF'}}>Selamat Datang di Website D'Bandeng</span></h3>
        <p style={{fontFamily: 'poppins'}}>D’Bandeng merupakan sebuah website yang digunakan untuk penyaluran informasi mengenai pengelolaan ikan bandeng pada wilayah semarang. Website D’Bandeng juga digunakan sebagai media promosi berbagai produk olahan ikan bandeng untuk dipasarkan lebih luas ke berbagai daerah di Indonesia.</p>
        <p className='text-center mt-5' style={{fontFamily: 'poppins'}}>Berita terbaru terkait informasi Bandeng pada wilayah Krobokan</p>
        <div className='container'>
        <Card style={{ width: '300px', height: '350px' }}>
        <Card.Body className='shadow'>
            <Card.Title>Judul Card</Card.Title>
                <Card.Text>
                Deskripsi card yang ingin ditampilkan.
                </Card.Text>
        </Card.Body>
        <Card.Body className='shadow'>
            <Card.Title>Judul Card</Card.Title>
                <Card.Text>
                Deskripsi card yang ingin ditampilkan.
                </Card.Text>
        </Card.Body>
        <Card.Body className='shadow'>
            <Card.Title>Judul Card</Card.Title>
                <Card.Text>
                Deskripsi card yang ingin ditampilkan.
                </Card.Text>
        </Card.Body>
        <Card.Body className='shadow'>
            <Card.Title>Judul Card</Card.Title>
                <Card.Text>
                Deskripsi card yang ingin ditampilkan.
                </Card.Text>
        </Card.Body>
        </Card>
        </div>
      </div>
      </div>
      </div>
    );
  };

    export default Aboutpage