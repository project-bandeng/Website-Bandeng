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
import Footer from "./Homepage/footer";
import "typeface-poppins";
import LoadingComponent from "./LoadingComponent";

const NewsItem = () => {
  return (
    <a href="#" className="list-group-item list-group-item-action">
      <img src={news1} className="card-img-top" alt="News" />
    </a>
  );
};

const Newspage = () => {
  document.title = 'News';
  const [newsList, setNewsList] = useState([]);
  const [activeNews, setActiveNews] = useState({});
  const [newsId, setNewsID] = useState();
  let [isLoading, setIsLoading] = useState(true);

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
        setIsLoading(false);
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
    <LoadingComponent isLoading={isLoading}>
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
                  activeNews ? convertImageURL(activeNews.foto_article) : null
                }
                className="card-img-top"
                alt="News"
              />
              <p>
                Dibuat Pada :{" "}
                {activeNews ? convertDate(activeNews.created_at) : ""}
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
              <div href="#" className="list-group-item list-group-item-action">
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
        <Footer />
      </div>
    </LoadingComponent>
  );
};
export default Newspage;
