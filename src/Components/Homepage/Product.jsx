import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap";
import LogoMitra1 from "../../Image/juwana-logo.png";
import Produk from "../../Image/Produk.jpg";
import Cart from "../../Image/Cart.png";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "../../service/axios";
import { useState, useContext, useEffect } from "react";
import MitraProdukContext from "../../context/MitraProductContext";
import useBackendURLTranslator from "../../hooks/useBackendURLTranslator";

function ProductItem({ data }) {
    let convertImage = useBackendURLTranslator();
    return (
        <Link to={`deskripsi/${data.id}`} style={{ textDecoration: "none" }}>
            <div className="card rounded-3" style={{ height: "270px" }}>
                <img
                    src={data.foto_produk && convertImage(data.foto_produk)}
                    alt="logo-mitra"
                    className="rounded-3 object-fit-cover"
                    style={{ height: "180px" }}
                />
                <h4
                    className="text-center fw-bold"
                    style={{ color: "#0F75BD" }}
                >
                    {data.nmProduk}
                </h4>
                <div className="d-flex justify-content-between align-items-center px-4">
                    <p className="product-price mb-0">Rp. {data.hrgProduk}</p>
                    <div className="rounded-circle bg-primary p-2">
                        <img src={Cart} alt="keranjang" width="25px" />
                    </div>
                </div>
            </div>
        </Link>
    );
}

function ProductItemKosong() {
    return <div className="card rounded-3" style={{ height: "270px" }}></div>;
}
export default function Product() {
    let [listMitraLocal, setListMitraLocal] = useState([]);
    let [listProductMitra1, setListProductMitra1] = useState([]);
    let [listProductMitra2, setListProductMitra2] = useState([]);
    let { listMitra, setListMitra } = useContext(MitraProdukContext);
    let convertImage = useBackendURLTranslator();

    const fetchMitraData = () => {
        axios
            .get(`/api/mitra/all`)
            .then((res) => {
                // console.log("data diambil dari server");
                // console.log(res);
                setListMitraLocal(setOnlyTwoDataMitra(res.data.data));
                setListMitra(res.data.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const setProdukEachMitra = (data) => {
        if (listMitraLocal.length === 0) return;
        data.forEach((item) => {
            if (item.id === listMitraLocal[0].id) {
                setListProductMitra1(item.products);
            } else {
                setListProductMitra2(item.products);
            }
        });
        // console.log(data);
        // console.log(listProductMitra1);
        // console.log(listProductMitra2);
    };

    const fetchMitraProduk = () => {
        if (listMitraLocal.length === 0) return;
        let config = {
            params: {
                mitra1: listMitraLocal[0].id,
                mitra2: listMitraLocal[1].id,
            },
        };
        axios
            .get(`/api/product/homepage`, config)
            .then((res) => {
                setProdukEachMitra(res.data.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const setOnlyTwoDataMitra = (data) => {
        let temp = data.slice(0, 2);
        return temp;
    };

    useEffect(() => {
        if (listMitra.length === 0) {
            // console.log("data mitra diambil dari server");
            fetchMitraData();
        } else {
            // console.log("data mitra diambil dari context");
            setListMitraLocal(setOnlyTwoDataMitra(listMitra));
            // console.log(listMitraLocal);
        }
        // fetchMitraProduk();
    }, []);

    useEffect(() => {
        fetchMitraProduk();
    }, [listMitraLocal]);

    return (
        <>
            <h1 className="product-title text-center">Products</h1>
            <div className="container-card-product row mt-5 mx-5">
                <div className="col-md-3 d-flex flex-column gap-3">
                    <div className="card rounded-3" style={{ height: "270px" }}>
                        <img
                            src={
                                listMitraLocal.length > 0
                                    ? convertImage(listMitraLocal[0].foto_mitra)
                                    : ""
                            }
                            alt="logo-mitra"
                            className="rounded-3 object-fit-cover"
                            style={{ height: "270px" }}
                        />
                    </div>
                    <div className="card rounded-3" style={{ height: "270px" }}>
                        <img
                            src={
                                listMitraLocal.length > 0
                                    ? convertImage(listMitraLocal[1].foto_mitra)
                                    : ""
                            }
                            alt="logo-mitra"
                            className="rounded-3 object-fit-cover"
                            style={{ height: "270px" }}
                        />
                    </div>
                </div>
                <div className="col-md-3 d-flex flex-column gap-3">
                    {listProductMitra1[0] ? (
                        <ProductItem data={listProductMitra1[0]} />
                    ) : (
                        <ProductItemKosong />
                    )}

                    {listProductMitra2[0] ? (
                        <ProductItem data={listProductMitra2[0]} />
                    ) : (
                        <ProductItemKosong />
                    )}
                </div>
                <div className="col-md-3 d-flex flex-column gap-3">
                    {listProductMitra1[1] ? (
                        <ProductItem data={listProductMitra1[1]} />
                    ) : (
                        <ProductItemKosong />
                    )}

                    {listProductMitra2[1] ? (
                        <ProductItem data={listProductMitra2[1]} />
                    ) : (
                        <ProductItemKosong />
                    )}
                </div>
                <div className="col-md-3 d-flex flex-column gap-3">
                    {listProductMitra1[2] ? (
                        <ProductItem data={listProductMitra1[2]} />
                    ) : (
                        <ProductItemKosong />
                    )}

                    {listProductMitra2[2] ? (
                        <ProductItem data={listProductMitra2[2]} />
                    ) : (
                        <ProductItemKosong />
                    )}
                </div>
                <div className="col-2 mx-auto mt-5">
                    <Link to="">
                        <Button type="button">Lihat Selengkapnya</Button>
                    </Link>
                </div>
            </div>
        </>
    );
}
