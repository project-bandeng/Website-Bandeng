import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import useBackendURLTranslator from "../hooks/useBackendURLTranslator";
import axios from "../service/axios";
import logo2 from "../Image/logo2.png";
import Produk from "../Image/Produk.jpg";
import LoadingComponent from "./LoadingComponent";

const Deskripsipage = () => {
    let { idProduct } = useParams();
    let [data, setData] = useState({});
    let convertImage = useBackendURLTranslator();
    let [isLoading, setIsLoading] = useState(true);

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
                <div className="row mt-3 ms-5 pt-5">
                    <div
                        className="card col-md-3 ms-5 pt-3 rounded-3"
                        style={{ backgroundColor: "#0F75BD" }}
                    >
                        <img
                            src={data ? convertImage(data.foto_produk) : ""}
                            alt="Product"
                            className="img-fluid"
                        />
                        <h3 className="text-white">
                            Rp. {data ? data.hrgProduk : ""}
                        </h3>
                    </div>
                    <div
                        className="card col-md-7 ms-5"
                        style={{ backgroundColor: "#DDE6ED" }}
                    >
                        <h2>Deskripsi Produk</h2>
                        <p>{data ? data.dskProduk : ""}</p>
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
                <div
                    className="pt-5 pb-5 mt-5"
                    style={{ backgroundColor: "#0F75BD" }}
                >
                    <div className="ms-5">
                        <img src={logo2} />
                    </div>
                </div>
            </div>
        </LoadingComponent>
    );
};

export default Deskripsipage;
