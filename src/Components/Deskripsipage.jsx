import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import useBackendURLTranslator from '../hooks/useBackendURLTranslator';
import axios from '../service/axios';
import logo2 from '../Image/logo2.png';
import Produk from '../Image/Produk.jpg';
import LoadingComponent from './LoadingComponent';
import Footer from './Homepage/footer';
import Cart from '../Image/Cart.png';

const Deskripsipage = () => {
  let { idProduct } = useParams();
  let [data, setData] = useState({});
  let convertImage = useBackendURLTranslator();
  let [isLoading, setIsLoading] = useState(true);
  document.title = data.nmProduk;
  const fetchDataProduk = () => {
    axios
      .get(`/api/produk/desc-produk/${idProduct}`)
      .then((res) => {
        console.log(res);
        setData(res.data.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchDataProduk();
  }, []);

  return (
    <LoadingComponent isLoading={isLoading}>
      <div className="container-news">
        <div className="d-flex mt-3 flex-column container">
          <span className='text-center mb-4'>
            <h1 className='text-capitalize text-primary'><i class="bi bi-bag-fill me-3"></i>{data.nmProduk}</h1>
          </span>
          <div className="d-flex align-items-start">
            <div className="card col-md-3 ms-5 p-3 rounded-3" style={{ backgroundColor: '#0F75BD', height: 'auto' }}>
              <img src={data ? convertImage(data.foto_produk) : ''} alt="Product" className="img-fluid rounded" style={{height: '170px'}} />
              <h3 className="text-white text-center">Rp. {data ? data.hrgProduk : ''}</h3>
            </div>
            <div className="d-flex flex-column col-md-8">
              <div className="card ms-5 p-3" style={{ backgroundColor: '#DDE6ED' }}>
                <h2>Deskripsi Produk</h2>
                <p>{data ? data.dskProduk : ''}</p>
                <h4>Detail Produk :</h4>
                <ul>
                  <li>Stok : {data ? data.stok : ''}</li>
                  <li>Berat : {data ? data.beratProduk : ''}</li>
                </ul>
              </div>
              <div className="d-flex justify-content-center align-items-center my-3">
                <div className="position-relative">
                  <a href={data.link} className="position-absolute" style={{ left: '-5px', top: '-2px' }}>
                    <button className="btn btn-primary rounded-circle p-2">
                      <img src={Cart} alt="Keranjang" />
                    </button>
                  </a>
                  <a href={data.link}>
                    <button className="btn btn-primary rounded-4 px-5 py-2 fw-bold">Beli Sekarang</button>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </LoadingComponent>
  );
};

export default Deskripsipage;
