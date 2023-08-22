import React, { useState, useEffect, useContext } from "react";
import MitraProdukContext from "../context/MitraProductContext";
import axios from "../service/axios";
import config from "../config";
import "../App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap";
import logo2 from "../Image/logo2.png";
import Produk from "../Image/Produk.jpg";
import { Link } from "react-router-dom";

const ProductItem = ({ image, title, idMitra }) => {
    let { setMitraDetail, listMitra } = useContext(MitraProdukContext);

    function convertImageURL(url) {
        const BACKEND_DOMAIN = config.BACKEND_URL;
        let path = BACKEND_DOMAIN + url;
        return path;
    }

    return (
        <Link
            to={`/product/mitra/${idMitra}`}
            className="d-block text-decoration-none"
            onClick={() =>
                setMitraDetail({
                    id: idMitra,
                    namaMitra: title,
                    foto_mitra: image,
                })
            }
        >
            <div
                className="card rounded-3 col-md-3 p-3"
                style={{ width: "300px", height: "300px" }}
            >
                <img
                    src={image ? convertImageURL(image) : ""}
                    alt="logo-mitra"
                    className="rounded-3 object-fit-cover"
                    style={{ height: "200px" }}
                />
                <h3
                    className="text-center fw-bold"
                    style={{ color: "#0F75BD" }}
                >
                    {title}
                </h3>
            </div>
        </Link>
    );
};

const Productpage = ({ id, name, description, price, imageUrl }) => {
    let [data, setData] = useState([]);
    let { setListMitra, listMitra } = useContext(MitraProdukContext);

    const setDataMitra = (data) => {
        setData(data);
    };

    const fetchMitraData = () => {
        axios
            .get(`/api/mitra/all`)
            .then((res) => {
                setDataMitra(res.data.data);
                setListMitra(res.data.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    useEffect(() => {
        if (listMitra.length === 0) {
            console.log("data diambil dari server");
            fetchMitraData();
        } else {
            console.log("data diambil dari context");
            setDataMitra(listMitra);
        }
    }, []);

    return (
        <div className="container-news" style={{ backgroundColor: "#DDE6ED" }}>
            <h1 className="text-center">Products</h1>

            <div className="container-card-product row mt-3 mx-5 justify-content-center">
                <div className="col-md-11 d-flex flex-wrap gap-3 pb-5 justify-content-center">
                    {data.map((item, key) => {
                        return (
                            <ProductItem
                                image={item["foto_mitra"]}
                                title={item["namaMitra"]}
                                idMitra={item["id"]}
                                key={key}
                            />
                        );
                    })}
                </div>
            </div>
            <footer>
        <div className="container-fluid pt-4" style={{backgroundColor: '#0F75BD'}}>
        <div className='ms-5'>
          <img src={logo2} />
          </div>
          <div className="container pt-2">
          <span className="text-muted">
            Follow us on: {' '}
            <a href="https://www.facebook.com/yourcompany" target="_blank" rel="noopener noreferrer">
              <i className="bi-facebook text-white"></i> {/* Gunakan kelas Bootstrap Icons */}
            </a>{' '}
            <a href="https://www.twitter.com/yourcompany" target="_blank" rel="noopener noreferrer">
              <i className="bi-twitter text-white"></i>
            </a>{' '}
            <a href="https://www.instagram.com/yourcompany" target="_blank" rel="noopener noreferrer">
              <i className="bi-instagram text-white"></i>
            </a>
          </span>
        </div>
        <div className='container text-center'>
        <span className="text-white pt-5">© 2023 D'Bandeng. All rights reserved.</span>
        </div>
      </div>
      </footer>
        </div>
    );
};

export default Productpage;
