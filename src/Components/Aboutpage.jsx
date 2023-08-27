import { useEffect, useState } from "react";
import axios from "../service/axios";
import { Carousel, Card, Button } from "react-bootstrap";
import "../App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap";
import { Link } from "react-router-dom";
import "typeface-poppins";
import logo2 from "../Image/logo2.png";
import "bootstrap-icons/font/bootstrap-icons.css";
import useBackendURLTranslator from "../hooks/useBackendURLTranslator";

const NewsCard = ({ data }) => {
  let imageConverter = useBackendURLTranslator();
  return (
    <div className="col-sm-4">
      <Card style={{ width: "18rem", height: "25rem" }}>
        <Card.Img
          variant="top"
          src={imageConverter(data.foto_article)}
          style={{ minHeight: "15rem", objectFit: "cover" }}
        ></Card.Img>
        <Card.Body className="shadow" style={{ height: "300px" }}>
          <Card.Title>{data.jdlArticle}</Card.Title>
          <Card.Text>{data.isiArticle}</Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
};

const Aboutpage = () => {
  let [newsData, setNewsData] = useState([]);

  const fetchAllNews = () => {
    axios
      .get(`/api/article/home/news-article`)
      .then((res) => {
        console.log(res);
        setNewsData(res.data.data.slice(0, 3));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchAllNews();
  }, []);

  return (
    <div className="container-fluid mt-3">
      <div className="row">
        <div className="col">
          <div className="text ps-5">
            <h3 className="mt-5 pt-lg-5">
              <span style={{ color: "#0497FF" }}>
                Selamat Datang di Website D'Bandeng
              </span>
            </h3>
            <p style={{ fontFamily: "poppins" }}>
              D’Bandeng merupakan sebuah website yang digunakan untuk penyaluran
              informasi mengenai pengelolaan ikan bandeng pada wilayah semarang.
              Website D’Bandeng juga digunakan sebagai media promosi berbagai
              produk olahan ikan bandeng untuk dipasarkan lebih luas ke berbagai
              daerah di Indonesia.
            </p>
          </div>
          <p className="text-center mt-5" style={{ fontFamily: "poppins" }}>
            Berita terbaru terkait informasi Bandeng pada wilayah Krobokan
          </p>
          <div className="container-fluid d-flex justify-content-center align-items-center mb-5">
            <div className="row">
              {newsData.map((item, i) => {
                return <NewsCard data={item} key={i} />;
              })}
            </div>
          </div>
          <footer>
            <div
              className="container-fluid pt-4"
              style={{ backgroundColor: "#0F75BD" }}
            >
              <div className="ms-5">
                <img src={logo2} />
              </div>
              <div className="container pt-2">
                <span className="text-muted">
                  Follow us on:{" "}
                  <a
                    href="https://www.facebook.com/yourcompany"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className="bi-facebook text-white"></i>{" "}
                    {/* Gunakan kelas Bootstrap Icons */}
                  </a>{" "}
                  <a
                    href="https://www.twitter.com/yourcompany"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className="bi-twitter text-white"></i>
                  </a>{" "}
                  <a
                    href="https://www.instagram.com/yourcompany"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className="bi-instagram text-white"></i>
                  </a>
                </span>
              </div>
              <div className="container text-center">
                <span className="text-white pt-5">
                  © 2023 D'Bandeng. All rights reserved.
                </span>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default Aboutpage;
