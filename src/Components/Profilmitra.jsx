import React, { useState, useEffect } from "react";
import { Navbar, Nav, NavDropdown} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "../service/axios";
import config from "../config";
import "../App.css";
import "bootstrap/dist/css/bootstrap.min.css";

// TO DO :
// TAMBAHIN LOADING
// TAMBAHIN NOTIFIKASI BERHASIL UPDATE

const Profilmitra = () => {
    const [name, setName] = useState("");
    const [alamat, setAlamat] = useState("");
    const [tgl_lahir, setTgl] = useState("");
    const [jenis_kel, setKelamin] = useState("");
    const [email, setEmail] = useState("");
    const [no_hp, setNomer] = useState("");
    const [fotoMitra, setFotoMitra] = useState(
        "https://via.placeholder.com/150"
    );
    const [file, setFile] = useState(null);
    const [editMode, setEditMode] = useState(false);
    const [activeMenu, setActiveMenu] = useState("profil");
    const navigate = useNavigate();

    const handleEdit = () => {
        setEditMode(true);
    };

    const handleOnChangeFoto = (e) => {
        console.log(e.target.files[0]);
        if (e.target.files[0].size > 5024000) {
            //TODO : GANTI PAKE SWEETALERT
            alert("File tidak boleh lebih besar dari 5MB!");
            return;
        }
        setFile(e.target.files[0]);
        setFotoMitra(URL.createObjectURL(e.target.files[0]));
    };

    const handleSavePhoto = () => {
        if (!file) return console.log("Tidak ada foto");
        const formData = new FormData();
        let id = getIDFromLocalStorage();
        formData.append("foto_mitra", file);
        axios
            .post(`/api/v1/mitra/edit-foto/${id}`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            })
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const handleSave = () => {
        setEditMode(false);

        let data = {
            namaLengkap: name,
            alamatMitra: alamat,
            tglLahir: tgl_lahir,
            jeniskel: jenis_kel,
            no_tlp: no_hp,
            foto_mitra: null,
        };

        console.log(data);
        let id = getIDFromLocalStorage();

        axios
            .post(`/api/v1/mitra/edit/${id}`, data)
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {
                console.log(err);
            });

        handleSavePhoto();
    };

    const handleCancel = () => {
        setEditMode(false);
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

    function getIDFromLocalStorage() {
        return JSON.parse(localStorage.getItem("data-user"))?.id;
    }

    function setPhotoFromResponse(url) {
        if (!url) {
            setFotoMitra("https://via.placeholder.com/150");
            return;
        }

        //DIGANTI SESUAL ALAMAT BACKEND
        const BACKEND_DOMAIN = config.BACKEND_URL;
        let path = BACKEND_DOMAIN + url;
        setFotoMitra(path);
        console.log(path);
    }

    useEffect(() => {
        if (!localStorage.getItem("auth-token")) {
            return navigate("/login");
        }
        let idUser = getIDFromLocalStorage();
        axios
            .get(`/api/v1/mitra/read/${idUser}`)
            .then((res) => {
                //set State berdasarkan response dari server
                let data = res.data.data;
                console.log(data);
                setName(data.namaLengkap || "");
                setAlamat(data.alamatMitra || "");
                setTgl(data.tglLahir || "");
                setKelamin(data.jeniskel || "");
                setEmail(data.email || "");
                setNomer(data.no_tlp || "");
                setPhotoFromResponse(data["foto_mitra"]);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    return (
        <div className="container-fluid">
        <div className="row">
        <nav className="col-md-2 col-12 d-md-block sidebar bg-primary rounded-4">
        <div className="position-sticky">
        <h5 className="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-white">
                  Main Menu
                </h5>
        <ul className="nav flex-column">
        <li className="nav-item">
          <NavDropdown
            title="Menu"
            className="nav-link text-light d-md-none"
          >
            <NavDropdown.Item
              className={`nav-link ${
                activeMenu === "profil" ? "active-link" : ""
              }`}
              onClick={() => setActiveMenu("profil")}
            >
              <a className="text-decoration-none text-dark" href="/profil">
                PROFILE
              </a>
            </NavDropdown.Item>
            <NavDropdown.Item
              className={`nav-link ${
                activeMenu === "products" ? "active-link" : ""
              }`}
              onClick={() => setActiveMenu("products")}
            >
              <a className="text-decoration-none text-dark" href="/products">
                PRODUCTS
              </a>
            </NavDropdown.Item>
            <NavDropdown.Item
              className="nav-link"
              onClick={handleLogout}
            >
              Logout
            </NavDropdown.Item>
          </NavDropdown>
        </li>
        <li className={`nav-item text-white ${activeMenu === "profil" ? "active" : ""}`}>
          <Nav.Link
            className={`nav-link text-white d-none d-md-block ${
              activeMenu === "profil" ? "active-link" : ""
            }`}
            href="/profil"
            onClick={() => setActiveMenu("profil")}
          >
              <a className={`text-decoration-none ${
                activeMenu === "profil" ? "text-dark" : "text-dark-hover"
              }`} href="/profil">
                PROFILE
              </a>
          </Nav.Link>
        </li>
        <li className={`nav-item text-white ${activeMenu === "products" ? "active" : ""}`}>
            <Nav.Link
            className={`nav-link text-white d-none d-md-block ${
            activeMenu === "products" ? "active-link" : ""
            }`}
            href="/crudproduk"
            onClick={() => setActiveMenu("products")}
        >
            <a className={`text-decoration-none text-white ${
                activeMenu === "products" ? "text-dark" : "text-dark-hover"
            }`} href="/crudproduk">
                PRODUCTS
            </a>
        </Nav.Link>
        </li>
        <li className="nav-item">
          <Nav.Link
            className="nav-link text-light d-none d-md-block"
            onClick={handleLogout}
          >
            Logout
          </Nav.Link>
        </li>
        </ul>
        </div>
        </nav>
                    <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
                        <div className="pt-3 pb-2 mb-3">
                            <h1>Profil Akun Anda</h1>
                        </div>
                        <div className="row">
                            <div className="col-md-3">
                                <div className="card rounded-3">
                                    <img
                                        src={fotoMitra}
                                        alt="Profil Pengguna"
                                        className="card-img-top"
                                    />
                                    <div className="card-body d-flex flex-column align-items-center">
                                        <label
                                            className="btn btn-primary me-2 mt-1"
                                            htmlFor="fotoprofil"
                                        >
                                            UBAH FOTO PROFIL
                                        </label>
                                        <input
                                            type="file"
                                            name="fotoprofil"
                                            id="fotoprofil"
                                            className="visually-hidden"
                                            accept="image/*"
                                            onChange={handleOnChangeFoto}
                                        />
                                        <button className="btn btn-primary me-2 mt-2">
                                            UBAH KATA SANDI
                                        </button>
                                        <button className="btn btn-primary me-2 mt-5">
                                            GANTI AKUN
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-8">
                                <div className="card">
                                    <div className="card-body shadow ps-5 pt-4 rounded-2">
                                        {editMode ? (
                                            <>
                                                <h5 className="card-title">
                                                    Ubah Profil
                                                </h5>
                                                <div className="mb-3">
                                                    <label
                                                        htmlFor="name"
                                                        className="form-label"
                                                    >
                                                        Nama Pengguna
                                                    </label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        id="name"
                                                        value={name}
                                                        onChange={(e) =>
                                                            setName(
                                                                e.target.value
                                                            )
                                                        }
                                                    />
                                                </div>
                                                <div className="mb-3">
                                                    <label
                                                        htmlFor="alamat"
                                                        className="form-label"
                                                    >
                                                        Alamat
                                                    </label>
                                                    <textarea
                                                        className="form-control"
                                                        id="alamat"
                                                        rows="3"
                                                        value={alamat}
                                                        onChange={(e) =>
                                                            setAlamat(
                                                                e.target.value
                                                            )
                                                        }
                                                    ></textarea>
                                                </div>
                                                <div className="mb-3">
                                                    <label
                                                        htmlFor="tgl_lahir"
                                                        className="form-label"
                                                    >
                                                        Tanggal Lahir
                                                    </label>
                                                    <input
                                                        type="date"
                                                        className="form-control"
                                                        id="tgl_lahir"
                                                        value={tgl_lahir}
                                                        onChange={(e) =>
                                                            setTgl(
                                                                e.target.value
                                                            )
                                                        }
                                                    />
                                                </div>
                                                <div className="mb-3">
                                                    <label
                                                        htmlFor="jenis_kel"
                                                        className="form-label"
                                                    >
                                                        Jenis Kelamin
                                                    </label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        id="jenis_kel"
                                                        value={jenis_kel}
                                                        onChange={(e) =>
                                                            setKelamin(
                                                                e.target.value
                                                            )
                                                        }
                                                    />
                                                </div>
                                                <div className="mb-3">
                                                    <label
                                                        htmlFor="email"
                                                        className="form-label"
                                                    >
                                                        Email Pengguna
                                                    </label>
                                                    <input
                                                        disabled
                                                        type="text"
                                                        className="form-control"
                                                        id="email"
                                                        value={email}
                                                        onChange={(e) =>
                                                            setEmail(
                                                                e.target.value
                                                            )
                                                        }
                                                    />
                                                </div>
                                                <div className="mb-3">
                                                    <label
                                                        htmlFor="no_hp"
                                                        className="form-label"
                                                    >
                                                        No. Handphone
                                                    </label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        id="no_hp"
                                                        value={no_hp}
                                                        onChange={(e) =>
                                                            setNomer(
                                                                e.target.value
                                                            )
                                                        }
                                                    />
                                                </div>
                                                <button
                                                    className="btn btn-primary me-2"
                                                    onClick={handleSave}
                                                >
                                                    Simpan
                                                </button>
                                                <button
                                                    className="btn btn-secondary"
                                                    onClick={handleCancel}
                                                >
                                                    Batal
                                                </button>
                                            </>
                                        ) : (
                                            <>
                                                <h5 className="card-title mt-2">
                                                    Nama : {name}
                                                </h5>
                                                <h5 className="card-title pt-2">
                                                    Alamat : {alamat}
                                                </h5>
                                                <h5 className="card-title pt-2">
                                                    Tanggal Lahir : {tgl_lahir}
                                                </h5>
                                                <h5 className="card-title pt-2">
                                                    Jenis Kelamin : {jenis_kel}
                                                </h5>
                                                <h5 className="card-title pt-2">
                                                    Email Terkait : {email}
                                                </h5>
                                                <h5 className="card-title pt-2 ">
                                                    No. Handphone : {no_hp}
                                                </h5>
                                                <button
                                                    style={{ width: "730px" }}
                                                    className="btn btn-primary mt-5"
                                                    onClick={handleEdit}
                                                >
                                                    Edit Profil
                                                </button>
                                            </>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </main>
                </div>
            </div>
    );
};
export default Profilmitra;
