import React, { useContext, useEffect, useState } from "react";
import MitraProdukContext from "../context/MitraProductContext";
import config from "../config";
import axios from "../service/axios";
import Carousel1 from "../Image/carousel1.png";
import Carousel2 from "../Image/carousel2.png";
import Carousel3 from "../Image/carousel3.png";
import Produk from "../Image/Produk.jpg";
import { Carousel, Card, Button, CarouselItem } from "react-bootstrap";
import "../App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap";
import { Link } from "react-router-dom";
import About1 from "../Image/about-image1.png";
import About2 from "../Image/about-image2.png";
import About3 from "../Image/about-image3.png";
import LogoMitra1 from "../Image/juwana-logo.png";
import logo2 from "../Image/logo2.png";
import Cart from "../Image/Cart.png";
// import Swiper core and required modules
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

//Import Component Homepage
import Product from "./Homepage/Product";
import News from "./Homepage/News";
import Contact from "./Homepage/Contact";

const CardMitra = ({ fotoMitra, namaMitra, link }) => {
    return (
        <div className="col">
            <Card>
                <Card.Body>
                    <img
                        className="d-block w-100 mb-3 rounded-3"
                        src={fotoMitra}
                        alt="Logo Mitra "
                    />
                    <Card.Title className="mb-3">{namaMitra}</Card.Title>
                    <Link to="">
                        <Button variant="primary">Lihat Selengkapnya</Button>
                    </Link>
                </Card.Body>
            </Card>
        </div>
    );
};

const Homepage = () => {
    const elements = [
        {
            fotoMitra: Produk,
            namaMitra: "Bandeng Juwana",
            link: "",
        },
        {
            fotoMitra: Produk,
            namaMitra: "Bandeng Juwana",
            link: "",
        },
        {
            fotoMitra: Produk,
            namaMitra: "Bandeng Juwana",
            link: "",
        },
        {
            fotoMitra: Produk,
            namaMitra: "Bandeng Juwana",
            link: "",
        },
        {
            fotoMitra: Produk,
            namaMitra: "Bandeng Juwana",
            link: "",
        },
        {
            fotoMitra: Produk,
            namaMitra: "Bandeng Juwana",
            link: "",
        },
    ];

    const { listMitra, setListMitra } = useContext(MitraProdukContext);
    const [mitraDataLocal, setMitraDataLocal] = useState([]);

    const fetchMitraData = () => {
        axios
            .get(`/api/mitra/all`)
            .then((res) => {
                setMitraDataLocal(res.data.data);
                setListMitra(res.data.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    function convertImageURL(url) {
        const BACKEND_DOMAIN = config.BACKEND_URL;
        let path = BACKEND_DOMAIN + url;
        return path;
    }

    const isMitraHasFoto = (item) => {
        if (item) {
            if (item.foto_mitra) {
                return true;
            }
        }
    };

    useEffect(() => {
        if (listMitra.length === 0) {
            console.log("data diambil dari server");
            fetchMitraData();
        } else {
            console.log("data diambil dari context");
            setMitraDataLocal(listMitra);
        }
    }, []);

    return (
        <div
            className="container-fluid"
            style={{ paddingLeft: 0, paddingRight: 0 }}
        >
            {/* carousel Section */}
            <div className="row">
                <div className="col">
                    <Carousel>
                        <Carousel.Item>
                            <img
                                className="d-block w-100"
                                src={Carousel1}
                                alt="Slide 1"
                            />
                            <h1 className="text-white position-absolute start-50 translate-middle-x heading1">
                                SELAMAT DATANG DI{" "}
                                <span style={{ color: "#5CBBFF" }}>
                                    D'BANDENG
                                </span>
                            </h1>
                            <h3 className="text-white position-absolute start-50 translate-middle-x heading2">
                                DIGITALISASI UMKM BANDENG
                            </h3>
                            <p className="text-white position-absolute start-50 translate-middle-x content">
                                Solusi Tepat Untuk Informasi Olahan Ikan Bandeng
                            </p>
                            <Link to="/about">
                                <button
                                    type="button"
                                    className="btn position-absolute start-50 translate-middle-x btn-primary button1"
                                >
                                    SELENGKAPNYA
                                </button>
                            </Link>
                        </Carousel.Item>
                        <Carousel.Item>
                            <img
                                className="d-block w-100"
                                src={Carousel2}
                                alt="Slide 2"
                            />
                            <h1 className="text-white position-absolute start-50 translate-middle-x heading3">
                                MEMPERLUAS JARINGAN PASAR
                            </h1>
                            <h3 className="text-white position-absolute start-50 translate-middle-x heading4">
                                PENINGKATAN EKONOMI UMKM
                            </h3>
                            <p className="text-white position-absolute start-50 translate-middle-x content1">
                                Memberikan Kemudahan Dalam Proses Berbelanja
                            </p>
                            <Link to="/about">
                                <button
                                    type="button"
                                    className="btn position-absolute start-50 translate-middle-x btn-primary button1"
                                >
                                    SELENGKAPNYA
                                </button>
                            </Link>
                        </Carousel.Item>
                        <Carousel.Item>
                            <img
                                className="d-block w-100"
                                src={Carousel3}
                                alt="Slide 3"
                            />
                            <h1 className="text-white position-absolute start-50 translate-middle-x heading1">
                                PELAYANAN YANG CEPAT
                            </h1>
                            <h3 className="text-white position-absolute start-50 translate-middle-x heading2">
                                FLEKSIBILITAS DALAM BERBELANJA
                            </h3>
                            <p className="text-white position-absolute start-50 translate-middle-x content">
                                Pengalaman Berbelanja Yang Lebih Tepat
                            </p>
                            <Link to="/about">
                                <button
                                    type="button"
                                    className="btn position-absolute start-50 translate-middle-x btn-primary button1"
                                >
                                    SELENGKAPNYA
                                </button>
                            </Link>
                        </Carousel.Item>
                    </Carousel>
                    {/* mitra Section */}
                    <div
                        className="container-fluid pt-4"
                        style={{ backgroundColor: "#47545F" }}
                    >
                        <h1 className="text-white start-50 heading1 text-center">
                            MITRA{" "}
                            <span style={{ color: "#5CBBFF" }}>D'BANDENG</span>
                        </h1>
                        <p className="text-white h6 mb-4 text-center">
                            Toko yang tergabung dalam D’Bandeng
                        </p>
                        <div className="row justify-content-center">
                            <div className="col-md-9">
                                <Swiper
                                    // install Swiper modules
                                    modules={[
                                        Navigation,
                                        Pagination,
                                        Scrollbar,
                                        A11y,
                                    ]}
                                    spaceBetween={35}
                                    slidesPerView={3}
                                    navigation
                                    pagination={{ clickable: true }}
                                    scrollbar={{ draggable: true }}
                                    onSwiper={(swiper) => console.log(swiper)}
                                    onSlideChange={() =>
                                        console.log("slide change")
                                    }
                                >
                                    {mitraDataLocal.map((item, key) => {
                                        return (
                                            <SwiperSlide key={key}>
                                                <CardMitra
                                                    fotoMitra={
                                                        isMitraHasFoto(item)
                                                            ? convertImageURL(
                                                                  item.foto_mitra
                                                              )
                                                            : ""
                                                    }
                                                    namaMitra={item.namaMitra}
                                                    link={item.link}
                                                />
                                            </SwiperSlide>
                                        );
                                    })}
                                </Swiper>
                            </div>
                        </div>
                        {/* about Section */}
                        <div className="row justify-content-center mt-5 pb-5">
                            <div className="col-md-4">
                                <h3 className="text-white start-50 heading3">
                                    ABOUT{" "}
                                    <span style={{ color: "#5CBBFF" }}>
                                        D'BANDENG
                                    </span>
                                </h3>
                                <p
                                    className="text-white"
                                    style={{ fontSize: "1.3rem" }}
                                >
                                    Kami menyediakan berbagai macam jenis olahan
                                    ikan bandeng kepada pelanggan kami dengan
                                    menjaga kualitas dan kelezatannya
                                </p>
                                <Link to="/about">
                                    <button
                                        type="button"
                                        className="btn btn-primary button1"
                                    >
                                        SELENGKAPNYA
                                    </button>
                                </Link>
                            </div>
                            <div className="col-md-7 d-flex align-items-center">
                                <div className="p-3 rounded-3 d-flex gap-5 container-about-card">
                                    <div className="rounded-3 card p-2 container-card">
                                        <div
                                            className="container-content-card"
                                            style={{ width: "175px" }}
                                        >
                                            <img
                                                src={About1}
                                                alt="img-vision"
                                                className="about-img"
                                            />
                                            <h3 style={{ color: "#6B5CCC" }}>
                                                Vision
                                            </h3>
                                            <div className="about-card-content">
                                                <p>
                                                    Mengoptimalkan pemasaran
                                                    secara online
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="rounded-3 card p-2 container-card1">
                                        <div
                                            className="container-content-card"
                                            style={{ width: "180px" }}
                                        >
                                            <img
                                                src={About2}
                                                alt="img-vision"
                                                className="about-img"
                                            />
                                            <h3 style={{ color: "#6B5CCC" }}>
                                                Mision
                                            </h3>
                                            <div className="about-card-content1">
                                                <p>
                                                    Membantu masyarakat dalam
                                                    memasarkan dan mempromosikan
                                                    produk
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="rounded-3 card p-2 container-card2">
                                        <div
                                            className="container-content-card"
                                            style={{ width: "175px" }}
                                        >
                                            <img
                                                src={About3}
                                                alt="img-vision"
                                                className="about-img"
                                            />
                                            <h3 style={{ color: "#6B5CCC" }}>
                                                Objective
                                            </h3>
                                            <div className="about-card-content2">
                                                <p>
                                                    Memperluas jangkauan pasar
                                                    dan jaringan pasar
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* product Section */}
                    <div
                        className="container-fluid pt-4"
                        style={{ backgroundColor: "#DDE6ED" }}
                    >
                        <Product />
                        <News />

                        <div
                            className="container-fluid pt-4"
                            style={{ backgroundColor: "#DDE6ED" }}
                        >
                            <h1 className="info-title text-center">
                                Kenapa Harus D'Bandeng?
                            </h1>
                            <div className="container pt-4 ps-lg-5">
                                <div className="ms-5 ps-5 d-flex gap-5">
                                    <div className="ms-5 d-flex me-5">
                                        <div className="circle "></div>
                                        <h3 className="text">
                                            <span>Fleksibel</span>
                                        </h3>
                                    </div>
                                    <div className="ms-5 d-flex me-5 ps-5">
                                        <div className="circle "></div>
                                        <h3 className="text">
                                            <span>Fleksibel</span>
                                        </h3>
                                    </div>
                                    <div className="ms-5 d-flex ps-5">
                                        <div className="circle "></div>
                                        <h3 className="text">
                                            <span>Fleksibel</span>
                                        </h3>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <Contact />
                        <div
                            className="container-fluid pt-5 pb-5"
                            style={{ backgroundColor: "#0F75BD" }}
                        >
                            <footer>
                                <div className="ms-5">
                                    <img src={logo2} />
                                </div>
                            </footer>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Homepage;
