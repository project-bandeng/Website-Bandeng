import React, { useState, useEffect, useContext } from "react";
import MitraProdukContext from "../context/MitraProductContext";
import { useParams } from "react-router-dom";
import axios from "../service/axios";
import config from "../config";
import "../App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap";
import logo2 from "../Image/logo2.png";
import Produk from "../Image/Produk.jpg";
import { Link } from "react-router-dom";

const ProductItem = ({ image, title }) => {
    function convertImageURL(url) {
        const BACKEND_DOMAIN = config.BACKEND_URL;
        let path = BACKEND_DOMAIN + url;
        return path;
    }

    return (
        <Link to="" className="d-block text-decoration-none">
            <div
                className="card rounded-3 col-md-3 p-3"
                style={{ width: "300px", height: "300px" }}
            >
                <img
                    src={image ? convertImageURL(image) : ""}
                    alt="logo-mitra"
                    className="rounded-3"
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
    let { mitraDetail } = useContext(MitraProdukContext);

    let [profilMitra, setProfilMitra] = useState({});
    let { idMitra } = useParams([]);

    function getIDFromLocalStorage() {
        return JSON.parse(localStorage.getItem("data-user"))?.id;
    }

    const isMitraHasFoto = () => {
        if (profilMitra) {
            if (profilMitra.foto_mitra) {
                return true;
            }
        }
    };

    function convertImageURL(url) {
        const BACKEND_DOMAIN = config.BACKEND_URL;
        let path = BACKEND_DOMAIN + url;
        return path;
    }

    const setDataMitra = (data) => {
        setProfilMitra(data);
    };

    const getMitraData = () => {
        axios
            .get(`/api/mitra/all/product/${idMitra}`)
            .then((res) => {
                console.log(res.data.data);
                setDataMitra(res.data.data[0]);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    useEffect(() => {
        if (Object.keys(mitraDetail).length === 0) {
            console.log("data diambil dari server");
            getMitraData();
        } else {
            console.log("data diambil dari context");
            setDataMitra(mitraDetail);
        }

        axios
            .get(`/api/product/read/${idMitra}`)
            .then((res) => {
                setData(res.data.products);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    return (
        <div className="container-news" style={{ backgroundColor: "#DDE6ED" }}>
            <h1 className="text-center">Products</h1>
            <div>
                <img
                    src={
                        isMitraHasFoto() &&
                        convertImageURL(profilMitra.foto_mitra)
                    }
                    alt="foto mitra"
                    style={{ height: "200px" }}
                />
                <h3>{profilMitra && profilMitra.namaMitra}</h3>
            </div>
            <div className="container-card-product row mt-3 mx-5 justify-content-center">
                <div className="col-md-11 d-flex flex-wrap gap-3 pb-5 justify-content-center">
                    {data.map((item, key) => {
                        return (
                            <ProductItem
                                image={item["foto_produk"]}
                                title={item["nmProduk"]}
                                key={key}
                            />
                        );
                    })}
                </div>
            </div>
            <div className="pt-5 pb-5" style={{ backgroundColor: "#0F75BD" }}>
                <div className="ms-5">
                    <img src={logo2} />
                </div>
            </div>
        </div>
    );
};

export default Productpage;
