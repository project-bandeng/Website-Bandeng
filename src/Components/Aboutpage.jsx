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
import Footer from "./Homepage/footer";
import LoadingComponent from "./LoadingComponent";

const NewsCard = ({ data }) => {
  document.title = "About Us";
  let imageConverter = useBackendURLTranslator();
  return (
    <div className="col-sm-4">
      <Link to={"/news"} style={{ textDecoration: "none" }}>
        <Card style={{ width: "18rem", height: "21rem" }}>
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
      </Link>
    </div>
  );
};

const Aboutpage = () => {
  let [newsData, setNewsData] = useState([]);
  let [isLoading, setIsLoading] = useState(true);

  const fetchAllNews = () => {
    axios
      .get(`/api/article/home/news-article`)
      .then((res) => {
        console.log(res);
        setNewsData(res.data.data.slice(0, 3));
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchAllNews();
  }, []);

  return (
    <LoadingComponent isLoading={isLoading}>
      <div className="container-fluid mt-3">
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
        <Footer />
      </div>
    </LoadingComponent>
  );
};

export default Aboutpage;
