import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../service/axios";
import useBackendURLTranslator from "../hooks/useBackendURLTranslator";
import SearchBar from "./SearchBar";
import "../App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import useDataFilter from "../hooks/useDataFilter";
import Sidebar from "./Sidebar";
import { Ring } from "@uiball/loaders";
import Swal from "sweetalert2";

const dataLink = [
  { path: "/user", name: "Data User", icon: "bi-person-fill" },
  { path: "/artikel", name: "Artikel", icon: "bi-newspaper" },
];

const LoadingDataComponent = ({columnSpan}) =>{
  return(
    <div className="w-100 mb-4 text-center">
        <Ring size={40} lineWeight={5} speed={2} color="black" />

    </div>
  )
}

const LoadingButton = () => {
  return(
    <Ring size={20} lineWeight={5} speed={2} color="black" />
  )
}

const Kelolaartikel = () => {
  document.title = "Kelola Artikel";
  const [articles, setArticles] = useState([]);
  const [articlesBackup, setArticlesBackup] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [newArticleImage, setNewArticleImage] = useState("");
  const [newJudulArticle, setNewJudulArticle] = useState("");
  const [newArticleDescription, setNewArticleDescription] = useState("");
  const [textSearch, setTextSearch] = useState("");
  const [activeMenu, setActiveMenu] = useState("artikel");
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingActionButton, setIsLoadingActionButton] = useState(false); //untuk loading button saat tambah atau edit
  const convertImage = useBackendURLTranslator();
  const navigate = useNavigate();
  const searchData = useDataFilter();

  const handleAddArticle = () => {
    if (newArticleDescription && newJudulArticle) {
      const newArticle = {
        foto_article: newArticleImage,
        jdlArticle: newJudulArticle,
        isiArticle: newArticleDescription,
      };
      setIsLoadingActionButton(true)

      addNewNewsAPI(newArticle);
    }
  };

  const handleSaveButton = () => {
    let data = {
      ...selectedArticle,
      foto_article: newArticleImage,
      jdlArticle: newJudulArticle,
      isiArticle: newArticleDescription,
    };
    setIsLoadingActionButton(true)
    editNewsAPI(data);
  };

  const handleEditArticle = (article) => {
    setSelectedArticle(article);
    setEditMode(true);
    setNewArticleImage(article.foto_article);
    setNewJudulArticle(article.jdlArticle);
    setNewArticleDescription(article.isiArticle);
  };

  const handleDeleteArticle = (id) => {
    deleteNewsAPI(id);
    const updatedArticles = articles.filter((article) => article.id !== id);
    setArticles(updatedArticles);
  };

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

  const fetchAllNews = () => {
    setIsLoading(true)
    axios
      .get("/api/article/read-all/admin")
      .then((res) => {
        console.log(res);
        setArticles(res.data.data);
        setArticlesBackup(res.data.data);
        setIsLoading(false)
      })
      .catch((err) => {
        console.log(err);
        Swal.fire({
          icon: 'error',
          title: 'Gagal fetch',
          text: "Gagal fetch data artikel",
        });
        setIsLoading(false)
      });
  };

  const resetState = () => {
    setNewArticleImage(null);
    setNewArticleDescription("");
    setNewJudulArticle("");
  };

  const deleteNewsAPI = (id) => {
    axios
      .delete(`/api/article/delete/${id}`)
      .then((res) => {
        console.log(res);
        Swal.fire({
          icon: 'success',
          title: 'Berhasil Hapus Data',
          text: "Berhasil Hapus data artikel",
        });
      })
      .catch((err) => {
        console.log(err);
        Swal.fire({
          icon: 'error',
          title: 'Gagal Delete',
          text: "Gagal delete data artikel",
        });
      });
  };

  const addNewNewsAPI = (data) => {
    let formData = new FormData();
    let key = Object.keys(data);

    key.forEach((item) => {
      formData.append(item, data[item]);
    });

    axios
      .post("/api/article", formData, {
        headers: {
          "Content-Type": "multipart/formdata",
        },
      })
      .then((res) => {
        console.log(res);
        setArticles([...articles, res.data.response]);
        setArticlesBackup([...articlesBackup, res.data.response]);
        setIsLoadingActionButton(false)
        Swal.fire({
          icon: 'success',
          title: 'Berhasil Tambah Artikel',
          text: "Berhasil Tambah Data Artikel",
        }).then(()=>{
          resetState();
          setEditMode(false);
        })
      })
      .catch((err) => {
        console.log(err);
        Swal.fire({
          icon: 'error',
          title: 'Gagal Tambah',
          text: "Gagal Tambah Data Artikel",
        });
        setIsLoadingActionButton(false)
      });
  };

  const editNewsAPI = (data) => {
    let formData = new FormData();
    let key = Object.keys(data);

    key.forEach((item) => {
      formData.append(item, data[item]);
    });

    axios
      .post(`/api/article/edit/${data.id}`, formData, {
        headers: {
          "Content-Type": "multipart/formdata",
        },
      })
      .then((res) => {
        console.log(res);
        // setArticles([...articles, res.data.response]);
        updateDataInsideState(res.data.response);
        setIsLoadingActionButton(false)
        Swal.fire({
          icon: 'success',
          title: 'Berhasil Edit Artikel',
          text: "Berhasil Edit Data Artikel",
        }).then(()=>{
          resetState();
          setEditMode(false);
        })
      })
      .catch((err) => {
        console.log(err);
        Swal.fire({
          icon: 'error',
          title: 'Gagal Edit',
          text: "Gagal Edit Data Artikel",
        });
        setIsLoadingActionButton(false)
      });
  };

  const updateDataInsideState = (data) => {
    const updatedArticle = articles.map((item) =>
      item.id === data.id ? data : item
    );
    setArticles(updatedArticle);
    setArticlesBackup(updatedArticle);
  };

  const handleLogout = () => {
    axios
      .get("/api/v2/logout-mitra")
      .then((res) => {
        console.log(res);
        localStorage.removeItem("data-user");
        localStorage.removeItem("auth-token");
        navigate("/login/admin");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  let handleSearch = (e) => {
    e.preventDefault();
    let filteredArticle = searchData(articlesBackup, textSearch, "jdlArticle");
    setArticles(filteredArticle);
  };

  useEffect(() => {
    fetchAllNews();
  }, [editMode]);

  useEffect(() => {
    if (textSearch.length === 0 && articlesBackup.length !== 0) {
      setArticles([...articlesBackup]);
    }
    // let timeOut = setTimeout(() => {
    //   console.log(textSearch);
    // }, 600);

    // return () => {
    //   clearTimeout(timeOut);
    // };
  }, [textSearch]);

  return (
      <div className="d-flex">
        <Sidebar dataLink={dataLink} handleLogout={handleLogout} />
        <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
          <div className="pt-3 pb-2 mb-3">
            <h1>Kelola Artikel</h1>
          </div>
          <div className="row">
            <div className="col-md-12">
              <div className="card">
                <div className="card-body shadow ps-5 pt-4 rounded-2">
                  <>
                    {editMode ? (
                      <>
                        <h5 className="card-title">
                          {selectedArticle
                            ? "Edit Artikel"
                            : "Tambah Artikel Baru"}
                        </h5>
                        <div className="mb-3">
                          <label htmlFor="article-image" className="form-label">
                            Upload Gambar Artikel
                          </label>
                          <input
                            type="file"
                            className="form-control"
                            id="article-image"
                            accept="image/*"
                            onChange={(e) =>
                              setNewArticleImage(e.target.files[0])
                            }
                          />
                        </div>
                        <div className="mb-3">
                          <label
                            htmlFor="article-description"
                            className="form-label"
                          >
                            Judul Artikel
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="article-description"
                            value={newJudulArticle}
                            onChange={(e) => setNewJudulArticle(e.target.value)}
                          />
                        </div>
                        <div className="mb-3">
                          <label
                            htmlFor="article-description"
                            className="form-label"
                          >
                            Deskripsi Artikel
                          </label>
                          <textarea
                            className="form-control"
                            id="article-description"
                            value={newArticleDescription}
                            onChange={(e) =>
                              setNewArticleDescription(e.target.value)
                            }
                          />
                        </div>
                        <button
                          className="btn btn-primary me-2"
                          onClick={
                            selectedArticle
                              ? handleSaveButton
                              : handleAddArticle
                          }
                        >
                          {isLoadingActionButton ? <LoadingButton/> : "Simpan Arikel"}
                        </button>
                        <button
                          className="btn btn-secondary"
                          onClick={() => setEditMode(false)}
                        >
                          Batal
                        </button>
                      </>
                    ) : (
                      <>
                      <div className="d-flex align-items-center justify-content-between mb-4">
                      <h5 className="card-title d-inline">Daftar Artikel</h5>
                        <SearchBar
                          setTextToSearch={setTextSearch}
                          textToSearch={textSearch}
                          handleSearch={handleSearch}
                        />
                      </div>
                        <div className="row">
                          {isLoading ? <LoadingDataComponent/> : articles.map((article, key) => (
                            <div className="col-md-4 mb-4" key={key}>
                              <div className="card">
                                <img
                                  src={
                                    article.foto_article
                                      ? convertImage(article.foto_article)
                                      : ""
                                  }
                                  className="card-img-top"
                                  alt={`Artikel ${article.id}`}
                                  height={"150px"}
                                />
                                <div className="card-body">
                                  <p className="card-text">
                                    {article.jdlArticle}
                                  </p>
                                  <p>{convertDate(article.created_at)}</p>
                                  <button
                                    className="btn btn-primary me-2"
                                    onClick={() => handleEditArticle(article)}
                                  >
                                    Edit
                                  </button>
                                  <button
                                    className="btn btn-danger"
                                    onClick={() =>
                                      handleDeleteArticle(article.id)
                                    }
                                  >
                                    Hapus
                                  </button>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </>
                    )}
                    <button
                      className="btn text-white btn-floating"
                      style={{
                        position: "fixed",
                        bottom: "20px",
                        right: "20px",
                        backgroundColor: "#3DEB12",
                      }}
                      onClick={() => {
                        setSelectedArticle(null);
                        setNewArticleImage("");
                        setNewArticleDescription("");
                        setEditMode(true);
                      }}
                    >
                      + Tambah
                    </button>
                  </>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
  );
};

export default Kelolaartikel;