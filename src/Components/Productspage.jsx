import React, { useState, useEffect } from "react";
import axios from "../service/axios";
import "../App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap";
import logo2 from "../Image/logo2.png";
import Produk from "../Image/Produk.jpg";

const ProductItem = ({ image, title }) => {
    function convertImageURL(url) {
        const BACKEND_DOMAIN = "https://b3ed-202-80-216-244.ngrok-free.app/";
        let path = BACKEND_DOMAIN + url;
        return path;
    }

    return (
        <div className="card rounded-3 col-md-3" style={{ height: "270px" }}>
            <img
                src={convertImageURL(image)}
                alt="logo-mitra"
                className="rounded-3"
            />
            <h3 className="text-center fw-bold" style={{ color: "#0F75BD" }}>
                {title}
            </h3>
        </div>
    );
};

const Productpage = ({ id, name, description, price, imageUrl }) => {
    let [data, setData] = useState([
        {
            image: Produk,
            title: "Bandeng Presto",
        },
        {
            image: Produk,
            title: "Bandeng Presto",
        },
        {
            image: Produk,
            title: "Bandeng Presto",
        },
        {
            image: Produk,
            title: "Bandeng Presto",
        },
        {
            image: Produk,
            title: "Bandeng Presto",
        },
    ]);

    function getIDFromLocalStorage() {
        return JSON.parse(localStorage.getItem("data-user"))?.id;
    }

    useEffect(() => {
        let id = getIDFromLocalStorage();
        axios
            .get(`/api/product/read/${"99d89cf5-ec8f-4ed2-811b-172ae1293feb"}`)
            .then((res) => {
                setData(res.data.products);
                // console.log(res.data.products);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    return (
        <div className="container-news" style={{ backgroundColor: "#DDE6ED" }}>
            <h1 className="text-center">Products</h1>
            <div className="container-card-product row mt-3 mx-5 justify-content-center">
                <div className="col-md-11 d-flex flex-wrap gap-3 pb-5 bg-danger">
                    {data.map((item, key) => {
                        return (
                            <ProductItem
                                image={item["foto_produk"]}
                                title={item["nmProduk"]}
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
