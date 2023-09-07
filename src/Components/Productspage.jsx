import React, { useState, useEffect, useContext } from "react";
import MitraProdukContext from "../context/MitraProductContext";
import axios from "../service/axios";
import config from "../config";
import "../App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap";
import logo2 from "../Image/logo2.png";
import Produk from "../Image/Produk.jpg";
import { Link } from "react-router-dom";
import Footer from "./Homepage/footer";
import SearchBar from "./SearchBar";
import LoadingComponent from "./LoadingComponent";

const ProductItem = ({ image, title, idMitra }) => {
  let { setMitraDetail, listMitra } = useContext(MitraProdukContext);

  function convertImageURL(url) {
    const BACKEND_DOMAIN = config.BACKEND_URL;
    let path = BACKEND_DOMAIN + url;
    return path;
  }

  return (
    <Link
      to={`/product/mitra/${idMitra}`}
      className="d-block text-decoration-none"
      onClick={() =>
        setMitraDetail({
          id: idMitra,
          namaMitra: title,
          foto_mitra: image,
        })
      }
    >
      <div
        className="card rounded-3 col-md-3 p-3"
        style={{ width: "300px", height: "300px" }}
      >
        <img
          src={image ? convertImageURL(image) : ""}
          alt="logo-mitra"
          className="rounded-3 object-fit-cover"
          style={{ height: "200px" }}
        />
        <h3 className="text-center fw-bold" style={{ color: "#0F75BD" }}>
          {title}
        </h3>
      </div>
    </Link>
  );
};

const Productpage = ({ id, name, description, price, imageUrl }) => {
  let [data, setData] = useState([]);
  let { setListMitra, listMitra } = useContext(MitraProdukContext);
  let [isLoading, setIsLoading] = useState(true);

  const setDataMitra = (data) => {
    setData(data);

    setIsLoading(false);
  };

  const fetchMitraData = () => {
    axios
      .get(`/api/mitra/all`)
      .then((res) => {
        setDataMitra(res.data.data);
        setListMitra(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    if (listMitra.length === 0) {
      console.log("data diambil dari server");
      fetchMitraData();
    } else {
      console.log("data diambil dari context");
      setDataMitra(listMitra);
    }
  }, []);

  return (
    <LoadingComponent isLoading={isLoading}>
      <div className="container-news" style={{ backgroundColor: "#DDE6ED" }}>
        <h1 className="text-center">Products</h1>

        <div className="container-card-product row mt-3 mx-5 justify-content-center">
          <div className="col-md-11 d-flex flex-wrap gap-3 pb-5 justify-content-center">
            {data.map((item, key) => {
              return (
                <ProductItem
                  image={item["foto_mitra"]}
                  title={item["namaMitra"]}
                  idMitra={item["id"]}
                  key={key}
                />
              );
            })}
          </div>
        </div>
        <Footer />
      </div>
    </LoadingComponent>
  );
};

export default Productpage;
