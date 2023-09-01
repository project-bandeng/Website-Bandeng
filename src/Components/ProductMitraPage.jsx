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
import Footer from "./Homepage/footer";
import Phone from "../Image/phone.png"
import SearchBar from "./SearchBar";

const ProductItem = ({ image, title, price, link }) => {
    function convertImageURL(url) {
        const BACKEND_DOMAIN = config.BACKEND_URL;
        let path = BACKEND_DOMAIN + url;
        return path;
    }

    return (
        <Link to={`/deskripsi/${link}`} className="d-block text-decoration-none">
            <div
                className="card rounded-3 col-md-3 p-3"
                style={{ width: "250px", height: "auto" }}
            >
                <img
                    src={image ? convertImageURL(image) : ""}
                    alt="logo-mitra"
                    className="rounded-3"
                    style={{ height: "180px" }}
                />
                <h4
                    className="fw-bold"
                    style={{ color: "#0F75BD" }}
                >
                    {title}
                </h4>
                <h5 className="text-end">
                    Rp. {price}
                </h5>
            </div>
        </Link>
    );
};

const Productpage = ({ id, name, description, price, imageUrl }) => {
    let [data, setData] = useState([]);
    let { mitraDetail } = useContext(MitraProdukContext);

    let [profilMitra, setProfilMitra] = useState({});
    let { idMitra } = useParams([]);

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
                console.log(res.data);
                setData(JSON.parse(res.data.data).products);
                console.log(JSON.parse(res.data.data).products);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    return (
        <div className="container-news">
            <div className="d-flex info-mitra p-4 gap-4 align-items-center">
                <img
                    src={
                        isMitraHasFoto() &&
                        convertImageURL(profilMitra.foto_mitra)
                    }
                    alt="foto mitra"
                    style={{ width: "100px", height: "100px" }}
                    className="rounded-circle"
                />
                <div className="d-flex flex-column">
                    <div className="d-flex align-items-center">
                        <h3 className="text-white" style={{fontSize: "35px"}}>{profilMitra && profilMitra.namaMitra}</h3>
                        <div className="rounded-circle bg-white mx-3" style={{width: "14px", height: "14px"}}></div>
                        <h6 className="text-white m-0" style={{fontSize: "20px"}}>
                            <img src={Phone} alt="icon-telp" style={{width: "25px"}}/>
                            {profilMitra && profilMitra.no_tlp}
                        </h6>                     
                    </div>
                    <h5 className="text-white" style={{fontSize: "25px"}}>{profilMitra && profilMitra.alamatMitra}</h5>
                </div>
                <div className="d-flex justify-content-end align-items-end flex-fill">
                    <div className="d-flex flex-column">
                        <p className="text-white mb-1 text-start" style={{fontSize: "18px"}}>Cari Produk Disini</p>
                        <SearchBar />
                    </div>
                </div>
            </div>
            <div className="container-card-product row mt-3 mx-5 justify-content-center">
                <div className="col-md-12 d-flex flex-wrap gap-3 pb-5 justify-content-center">
                    {data.map((item, key) => {
                        return (
                            <ProductItem 
                                link={item["id"]}
                                image={item["foto_produk"]}
                                title={item["nmProduk"]}
                                price={item["hrgProduk"]}
                                key={key}
                            />
                        );
                    })}
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Productpage;
