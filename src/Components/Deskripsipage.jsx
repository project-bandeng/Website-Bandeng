import React from 'react';
import logo2 from '../Image/logo2.png'
import Produk from '../Image/Produk.jpg'

const Deskripsipage = () => {
  return (
    <div className="container-news">
      <div className="row mt-3 ms-5 pt-5">
        <div className="card col-md-3 ms-5 pt-3 rounded-3" style={{backgroundColor: "#0F75BD"}} >
          <img
            src={Produk}
            alt="Product"
            className="img-fluid"
          />
        </div>
        <div className="card col-md-7 ms-5" style={{backgroundColor: "#DDE6ED"}}>
          <h2>Deskripsi Produk</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ac
            justo vitae purus porta facilisis. Aenean auctor, dolor eu
            fringilla aliquet, neque nisl fringilla neque, eget blandit arcu
            justo id augue.
          </p>
          <h4>Features:</h4>
          <ul>
            <li>Feature 1</li>
            <li>Feature 2</li>
            <li>Feature 3</li>
          </ul>
          <div>
          <button className="btn btn-primary">Buy Now</button>
          </div>
        </div>
      </div>
         <div className="pt-5 pb-5 mt-5" style={{backgroundColor: '#0F75BD'}}>
            <div className='ms-5'>
            <img src={logo2} />
            </div>
        </div>
    </div>
  );
};

export default Deskripsipage;
