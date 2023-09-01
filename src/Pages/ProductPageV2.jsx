import { useEffect, useState } from "react";
import axios from "../service/axios";
import SearchBar from "../Components/SearchBar";
import config from "../config";
import { Link } from "react-router-dom";
import useDataFilter from "../hooks/useDataFilter";
import { Ping } from "@uiball/loaders";

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
        <h4 className="fw-bold" style={{ color: "#0F75BD" }}>
          {title}
        </h4>
        <h5 className="text-end">Rp. {price}</h5>
      </div>
    </Link>
  );
};

export default function ProductPageV2() {
  let [activeMitraId, setActiveMitraId] = useState();
  let [dataMitra, setDataMitra] = useState([]);
  let [dataProduk, setDataProduk] = useState([]);
  let [dataProdukBackup, setDataProdukBackup] = useState([]);
  let [textSearch, setTextSearch] = useState("");
  let searchData = useDataFilter();

  const handleChangeMitra = (id) => {
    setActiveMitraId(id);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    let filteredProduk = searchData(dataProdukBackup, textSearch, "nmProduk");
    setDataProduk(filteredProduk);
  };

  const getAllMitra = () => {
    axios
      .get(`/api/mitra/all`)
      .then((res) => {
        let dataRes = res.data.data;
        console.log(dataRes);
        setDataMitra(dataRes);
        setActiveMitraId(dataRes[0].id);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getMitraProducts = (idMitra) => {
    axios
      .get(`/api/product/read/${idMitra}`)
      .then((res) => {
        let dataRes = JSON.parse(res.data.data);
        console.log(dataRes.products);
        if (dataRes.products.length == 0) {
          alert("data kosong");
        }
        setDataProduk(dataRes.products);
        setDataProdukBackup(dataRes.products);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    if (activeMitraId) {
      setDataProduk([]);
      getMitraProducts(activeMitraId);
      setTextSearch("");
    }
  }, [activeMitraId]);

  useEffect(() => {
    getAllMitra();
  }, []);

  useEffect(() => {
    if (textSearch.length === 0 && dataProdukBackup.length !== 0) {
      setDataProduk([...dataProdukBackup]);
    }
    // let timeOut = setTimeout(() => {
    //   console.log(textSearch);
    // }, 600);

    // return () => {
    //   clearTimeout(timeOut);
    // };
  }, [textSearch]);

  return (
    <div className="container mt-md-5 pt-md-4">
      <div className="">
        <h2>Pilihan Mitra Kami</h2>
        <div className="d-flex overflow-x-auto">
          {dataMitra.map((item, i) => {
            return (
              <div
                key={i}
                style={{ width: "auto", cursor: "pointer" }}
                onClick={() => handleChangeMitra(item.id)}
                className={`h4 text-nowrap ${
                  item.id == activeMitraId ? "bg-danger" : "bg-primary"
                } py-2 px-4 rounded text-white mx-1`}
              >
                {item["namaMitra"]}
              </div>
            );
          })}
        </div>
      </div>
      <div className="d-flex flex-column gap-2">
        <div className="align-self-end">
          <SearchBar
            setTextToSearch={setTextSearch}
            textToSearch={textSearch}
            handleSearch={handleSearch}
            placeholder="Cari"
          />
        </div>
        <div className="d-flex gap-2">
          {dataProduk.length == 0 ? (
            <div className="w-100 d-flex justify-content-center">
              <Ping size={200} speed={2} color="#0F75BD" />
            </div>
          ) : (
            dataProduk.map((item, key) => {
              return (
                <ProductItem
                  link={item["id"]}
                  image={item["foto_produk"]}
                  title={item["nmProduk"]}
                  price={item["hrgProduk"]}
                  key={key}
                />
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
