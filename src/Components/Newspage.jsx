import React, { useEffect, useState } from "react";
import axios from "../service/axios";
import config from "../config";
import "../App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap";
import news1 from "../Image/news1.JPG";
import news2 from "../Image/news2.JPG";
import news3 from "../Image/news3.JPG";
import news4 from "../Image/news4.JPG";
import logo2 from "../Image/logo2.png";
import "typeface-poppins";

const NewsItem = () => {
    return (
        <a href="#" className="list-group-item list-group-item-action">
            <img src={news1} className="card-img-top" alt="News" />
        </a>
    );
};

const Newspage = () => {
    const [newsList, setNewsList] = useState([]);
    const [activeNews, setActiveNews] = useState({});
    const [newsId, setNewsID] = useState();

    const convertDate = (date) => {
        let month_list = [
            "Januari",
            "Februari",
            "Maret",
            "April",
            "Mei",
            "Juni",
            "Juli",
            "Agustus",
            "September",
            "Oktober",
            "November",
            "Desember",
        ];
        let obj = new Date(date);
        let year = obj.getFullYear();
        let month = obj.getMonth();
        let day = obj.getDate();
        return `${day} ${month_list[month]} ${year}`;
    };

    const handleSetActiveNews = (id) => {
        newsList.forEach((item) => {
            if (item.id === id) {
                setNewsID(item.id);
                setActiveNews(item);
                return;
            }
        });
    };

    const handleNewsClicked = (data) => {
        handleSetActiveNews(data.id);
    };

    const convertImageURL = (url) => {
        const BACKEND_DOMAIN = config.BACKEND_URL;
        let path = BACKEND_DOMAIN + url;
        return path;
    };

    const fetchDetailNews = (id) => {
        axios
            .get(`/api/article/read/${id}`)
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const fetchAllNews = () => {
        axios
            .get(`/api/article/read-all`)
            .then((res) => {
                setNewsList(res.data.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    useEffect(() => {
        console.log(activeNews);
        fetchAllNews();
    }, []);

    useEffect(() => {
        setActiveNews(newsList[0]);
    }, [newsList]);

    useEffect(() => {
        if (activeNews) {
            setNewsID(activeNews.id);
        }
    }, [activeNews]);

    return (
        <div className="container-fluid">
            <div className="row">
                <div
                    className="col-md-9"
                    style={{ paddingTop: "100px", fontFamily: "poppins" }}
                >
                    <h2 className="card-title pb-4 text-center">
                        {activeNews ? activeNews.jdlArticle : "Judul Berita"}
                    </h2>
                    <div className="card-news mb-4">
                        <img
                            src={
                                activeNews
                                    ? convertImageURL(activeNews.foto_article)
                                    : null
                            }
                            className="card-img-top"
                            alt="News"
                        />
                        <p>
                            Dibuat Pada :{" "}
                            {activeNews
                                ? convertDate(activeNews.created_at)
                                : ""}
                        </p>
                        <div className="card-body">
                            <p
                                className="text-center pt-5"
                                style={{ fontFamily: "poppins" }}
                            >
                                {activeNews
                                    ? activeNews.isiArticle
                                    : "Judul Berita Lorem Ipsum is simply dummy text of the printingand typesetting industry."}
                            </p>
                        </div>
                    </div>
                </div>
                <div
                    className="col-md-3 "
                    style={{
                        backgroundColor: "#DDE6ED",
                        paddingTop: "80px",
                        fontFamily: "poppins",
                    }}
                >
                    <div className="list-group">
                        <div
                            href="#"
                            className="list-group-item list-group-item-action"
                        >
                            Berita Terbaru
                        </div>
                        {newsList.map((item, key) => {
                            return (
                                <div
                                    className={`list-group-item list-group-item-action ${
                                        item.id === newsId ? "active" : ""
                                    }`}
                                    onClick={() => handleNewsClicked(item)}
                                    key={key}
                                >
                                    <img
                                        src={convertImageURL(item.foto_article)}
                                        className="card-img-top"
                                        alt="News"
                                    />
                                </div>
                            );
                        })}
                    </div>
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
export default Newspage;
