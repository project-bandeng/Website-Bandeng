import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../service/axios";
import useBackendURLTranslator from "../hooks/useBackendURLTranslator";
import "../App.css";
import "bootstrap/dist/css/bootstrap.min.css";

const Kelolaartikel = () => {
    const [articles, setArticles] = useState([]);
    const [editMode, setEditMode] = useState(false);
    const [selectedArticle, setSelectedArticle] = useState(null);
    const [newArticleImage, setNewArticleImage] = useState("");
    const [newJudulArticle, setNewJudulArticle] = useState("");
    const [newArticleDescription, setNewArticleDescription] = useState("");
    const [activeMenu, setActiveMenu] = useState("artikel");
    const convertImage = useBackendURLTranslator();
    const navigate = useNavigate();

    const handleAddArticle = () => {
        if (newArticleDescription && newJudulArticle) {
            const newArticle = {
                foto_article: newArticleImage,
                jdlArticle: newJudulArticle,
                isiArticle: newArticleDescription,
            };

            addNewNewsAPI(newArticle);

            // setArticles([...articles, newArticle]);
            resetState();
            setEditMode(false);
        }
    };

    const handleSaveButton = () => {
        let data = {
            ...selectedArticle,
            foto_article: newArticleImage,
            jdlArticle: newJudulArticle,
            isiArticle: newArticleDescription,
        };

        editNewsAPI(data);

        resetState();
        setEditMode(false);
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
        axios
            .get("/api/article/read-all/admin")
            .then((res) => {
                console.log(res);
                setArticles(res.data.data);
            })
            .catch((err) => {
                console.log(err);
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
            })
            .catch((err) => {
                console.log(err);
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
            })
            .catch((err) => {
                console.log(err);
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
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const updateDataInsideState = (data) => {
        const updatedArticle = articles.map((item) =>
            item.id === data.id ? data : item
        );
        setArticles(updatedArticle);
    };

    const handleLogout = () => {
        axios
            .get("/api/v2/logout-mitra")
            .then((res) => {
                console.log(res);
                localStorage.removeItem("data-user");
                localStorage.removeItem("auth-token");
                navigate("/login");
            })
            .catch((err) => {
                console.log(err);
            });
    };

    useEffect(() => {
        fetchAllNews();
    }, []);

    return (
        <div className="container-news">
            <div className="row" style={{ height: "630px" }}>
                <nav
                    className="col-md-2 d-none d-md-block sidebar rounded-4 "
                    style={{ backgroundColor: "#0F75BD" }}
                >
                    <div className="position-sticky">
                        <h5 className="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-dark">
                            Main Menu
                        </h5>
                        <ul className="nav flex-column">
                            <li
                                className={`nav-item ${
                                    activeMenu === "datauser" ? "active" : ""
                                }`}
                            >
                                <a
                                    className={`nav-link text-dark ${
                                        activeMenu === "datauser"
                                            ? "active-link"
                                            : "/user"
                                    }`}
                                    href="/user"
                                    onClick={() => setActiveMenu("datauser")}
                                >
                                    DATA USER
                                </a>
                            </li>
                            <li
                                className={`nav-item ${
                                    activeMenu === "artikel" ? "active" : ""
                                }`}
                            >
                                <a
                                    className={`nav-link text-dark ${
                                        activeMenu === "artikel"
                                            ? "active-link"
                                            : "/artikel"
                                    }`}
                                    href="/artikel"
                                    onClick={() => setActiveMenu("artikel")}
                                >
                                    ARTICLE
                                </a>
                            </li>
                            <li
                                className={`nav-item ${
                                    activeMenu === "products" ? "active" : ""
                                }`}
                            >
                                <div
                                    className={`nav-link text-dark`}
                                    onClick={() => handleLogout()}
                                >
                                    Logout
                                </div>
                            </li>
                        </ul>
                    </div>
                </nav>
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
                                                    <label
                                                        htmlFor="article-image"
                                                        className="form-label"
                                                    >
                                                        Upload Gambar Artikel
                                                    </label>
                                                    <input
                                                        type="file"
                                                        className="form-control"
                                                        id="article-image"
                                                        accept="image/*"
                                                        onChange={(e) =>
                                                            setNewArticleImage(
                                                                e.target
                                                                    .files[0]
                                                            )
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
                                                        onChange={(e) =>
                                                            setNewJudulArticle(
                                                                e.target.value
                                                            )
                                                        }
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
                                                        value={
                                                            newArticleDescription
                                                        }
                                                        onChange={(e) =>
                                                            setNewArticleDescription(
                                                                e.target.value
                                                            )
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
                                                    {selectedArticle
                                                        ? "Simpan Perubahan"
                                                        : "Simpan Artikel Baru"}
                                                </button>
                                                <button
                                                    className="btn btn-secondary"
                                                    onClick={() =>
                                                        setEditMode(false)
                                                    }
                                                >
                                                    Batal
                                                </button>
                                            </>
                                        ) : (
                                            <>
                                                <h5 className="card-title">
                                                    Daftar Artikel
                                                </h5>
                                                <div className="row">
                                                    {articles.map(
                                                        (article, key) => (
                                                            <div
                                                                className="col-md-4 mb-4"
                                                                key={key}
                                                            >
                                                                <div className="card">
                                                                    <img
                                                                        src={
                                                                            article.foto_article
                                                                                ? convertImage(
                                                                                      article.foto_article
                                                                                  )
                                                                                : ""
                                                                        }
                                                                        className="card-img-top"
                                                                        alt={`Artikel ${article.id}`}
                                                                    />
                                                                    <div className="card-body">
                                                                        <p className="card-text">
                                                                            {
                                                                                article.jdlArticle
                                                                            }
                                                                        </p>
                                                                        <p>
                                                                            {convertDate(
                                                                                article.created_at
                                                                            )}
                                                                        </p>
                                                                        <button
                                                                            className="btn btn-primary me-2"
                                                                            onClick={() =>
                                                                                handleEditArticle(
                                                                                    article
                                                                                )
                                                                            }
                                                                        >
                                                                            Edit
                                                                        </button>
                                                                        <button
                                                                            className="btn btn-danger"
                                                                            onClick={() =>
                                                                                handleDeleteArticle(
                                                                                    article.id
                                                                                )
                                                                            }
                                                                        >
                                                                            Hapus
                                                                        </button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        )
                                                    )}
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
        </div>
    );
};

export default Kelolaartikel;
