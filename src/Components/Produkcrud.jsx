import React, { useState, useEffect} from "react";
import { Navbar, Nav, NavDropdown} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import useLocalStorageUserData from "../hooks/useLocalStorageUserData";
import useBackendURLTranslator from "../hooks/useBackendURLTranslator";
import SearchBar from "./SearchBar";
import "../App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Produk from "../Image/Produk.jpg";
import axios from "../service/axios";
import useDataFilter from "../hooks/useDataFilter";

const Produkcrud = () => {
  const navigate = useNavigate();
  const dataUser = useLocalStorageUserData();
  const convertImage = useBackendURLTranslator();
  const searchData = useDataFilter();

  const [statusDataOrigin, setStatusDataOrigin] = useState(0); //0 dari server 1 dari local
  const [action, setAction] = useState("");
  const [productId, setProductId] = useState("");
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productStok, setProductStok] = useState("");
  const [productWeight, setProductWeight] = useState("");
  const [productDesc, setProductDesc] = useState("");
  const [productLink, setProductLink] = useState("");
  const [productImage, setProductImage] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [activeMenu, setActiveMenu] = useState("products");
  const [productsPrev, setProductsPrev] = useState([]);
  const [products, setProducts] = useState([]);
  const [textSearch, setTextSearch] = useState("");

  useEffect(() => {
    if (textSearch.length === 0 && productsPrev.length !== 0) {
      setProducts([...productsPrev]);
    }
    // let timeOut = setTimeout(() => {
    //   console.log(textSearch);
    // }, 600);

    // return () => {
    //   clearTimeout(timeOut);
    // };
  }, [textSearch]);

  const handleSearch = (e) => {
    e.preventDefault();
    let filteredProduk = searchData(productsPrev, textSearch, "nmProduk");
    setProducts(filteredProduk);
  };

  const fetchDataProduk = (id) => {
    axios
      .get(`/api/product/read-mitra/${id}`)
      .then((res) => {
        setStatusDataOrigin(0);
        console.log(res);
        setProductsPrev(res.data.products);
        setProducts(res.data.products);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const addDataProduct = (data, id) => {
    let formData = new FormData();
    let key = Object.keys(data);

    key.forEach((item) => {
      formData.append(item, data[item]);
      //   console.log(data);
    });

    axios
      .post(`/api/product/${id}`, formData, {
        headers: { "Content-Type": "multipart/formdata" },
      })
      .then((res) => {
        console.log(res);
        let productRes = JSON.parse(res.data.data);
        // console.log(productRes);
        setProducts([...products, productRes]);
        // setProducts(res.data.products);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deleteDataProduct = (id) => {
    axios
      .delete(`/api/product/delete/${id}`)
      .then((res) => {
        console.log(res);
        // setProducts(res.data.products);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const editDataProduk = (id, data) => {
    let formData = new FormData();
    let key = Object.keys(data);
    console.log(data);

    key.forEach((item) => {
      formData.append(item, data[item]);
      // console.log(data[item]);
    });

    axios
      .post(`/api/product/edit/${id}`, formData, {
        headers: { "Content-Type": "multipart/formdata" },
      })
      .then((res) => {
        console.log(res);
        let productRes = JSON.parse(res.data.data);
        console.log(productRes);
        updateProductsState(productRes);

        setEditMode(false);
        // setProducts([...products, productRes]);
        // setProducts(res.data.products);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleAddProduct = () => {
    if (productName && productPrice && productImage && productWeight) {
      let newProduct = {
        id: new Date().getTime(),
        nmProduk: productName,
        hrgProduk: productPrice,
        stok: productStok,
        foto_produk: productImage,
        beratProduk: productWeight,
        dskProduk: productDesc,
        link: productLink,
      };
      addDataProduct(newProduct, dataUser.id);

      // newProduct.localFoto = URL.createObjectURL(newProduct.foto_produk);
      // console.log(newProduct);

      // setProducts([...products, newProduct]);
      resetInputState();
      setEditMode(false);
    } else {
      console.log(productName && productPrice && productImage && productWeight);
    }
  };

  const resetInputState = () => {
    setProductName("");
    setProductPrice("");
    setProductStok("");
    setProductWeight("");
    setProductDesc("");
    setProductImage(null);
    setProductLink("");
  };

  const handleEditProduct = (id) => {
    resetInputState();
    setAction("Edit Produk");
    const editedProduct = products.find((product) => product.id === id);
    console.log(editedProduct);
    if (editedProduct) {
      // setProductImage(editedProduct.foto_produk);
      setProductId(id);
      setProductName(editedProduct.nmProduk);
      setProductPrice(editedProduct.hrgProduk);
      setProductStok(editedProduct.stok);
      setProductWeight(editedProduct.beratProduk);
      setProductDesc(editedProduct.dskProduk);
      setProductLink(editedProduct.link);
      setEditMode(true);
    }
  };

  const updateProductsState = (data) => {
    const updatedProducts = products.map((product) =>
      product.id === data.id ? data : product
    );
    setProducts(updatedProducts);
  };

  const handleUpdateProduct = () => {
    if (
      productName &&
      productPrice &&
      productStok &&
      productDesc &&
      productWeight &&
      productId
    ) {
      // const updatedProducts = products.map((product) =>
      //     product.id === editMode
      //         ? {
      //               ...product,
      //               nmProduk: productName,
      //               hrgProduk: productPrice,
      //               stok: productStok,
      //           }
      //         : product
      // );
      // setProducts(updatedProducts);

      let editProduk = {
        id: productId,
        nmProduk: productName,
        hrgProduk: productPrice,
        stok: productStok,
        beratProduk: productWeight,
        dskProduk: productDesc,
        link: productLink,
      };

      if (productImage) {
        editProduk.foto_produk = productImage;
      }

      editDataProduk(productId, editProduk);

      resetInputState();
    } else {
      alert("Hrap isi semua form");
    }
  };

  const handleDeleteProduct = (id) => {
    deleteDataProduct(id);
    const updatedProducts = products.filter((product) => product.id !== id);
    setProducts(updatedProducts);
  };

  const handleImageUpload = (event) => {
    const imageFile = event.target.files[0];
    setProductImage(imageFile);
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
    fetchDataProduk(dataUser?.id);
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
          <a className={`text-decoration-none text-white ${
            activeMenu === "profil" ? "text-dark" : "text-dark-hover"
          }`} href="/profil">
            PROFILE
          </a>
      </Nav.Link>
    </li>
    <li className={`nav-item ${activeMenu === "products" ? "active" : ""}`}>
      <Nav.Link
        className={`nav-link text-light d-none d-md-block ${
          activeMenu === "products" ? "active-link" : ""
        }`}
        href="/crudproduk"
        onClick={() => setActiveMenu("products")}
      >
          <a className={`text-decoration-none ${
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
            <h1>Produk</h1>
          </div>
          <div className="row">
            <div className="col-md-12">
              <div className="card">
                <div className="card-body shadow ps-5 pt-4 rounded-2">
                  {editMode ? (
                    <>
                      <h5 className="card-title">{action}</h5>
                      <div className="mb-3">
                        <label htmlFor="product-image" className="form-label">
                          Gambar Produk
                        </label>
                        <input
                          type="file"
                          className="form-control"
                          id="product-image"
                          accept="image/*"
                          onChange={handleImageUpload}
                          required
                        />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="product-name" className="form-label">
                          Nama Produk
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="product-name"
                          value={productName}
                          onChange={(e) => setProductName(e.target.value)}
                          required
                        />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="product-price" className="form-label">
                          Harga Produk
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="product-price"
                          value={productPrice}
                          onChange={(e) => setProductPrice(e.target.value)}
                          required
                        />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="product-stok" className="form-label">
                          Stok Produk
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="product-stok"
                          value={productStok}
                          onChange={(e) => setProductStok(e.target.value)}
                          required
                        />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="product-stok" className="form-label">
                          Berat Produk
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="product-berat"
                          value={productWeight}
                          onChange={(e) => setProductWeight(e.target.value)}
                          required
                        />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="product-link" className="form-label">
                          Link Produk (shopee)
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="product-link"
                          value={productLink}
                          onChange={(e) => setProductLink(e.target.value)}
                          required
                        />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="product-stok" className="form-label">
                          Deskrisi Produk
                        </label>
                        <textarea
                          className="form-control"
                          id="product-berat"
                          value={productDesc}
                          onChange={(e) => setProductDesc(e.target.value)}
                          required
                        />
                      </div>
                      <button
                        className="btn btn-primary me-2"
                        onClick={
                          action === "Tambah Produk"
                            ? handleAddProduct
                            : handleUpdateProduct
                        }
                      >
                        Simpan Perubahan
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
                      <h5 className="card-title d-inline">Daftar Produk</h5>
                      <SearchBar
                        setTextToSearch={setTextSearch}
                        textToSearch={textSearch}
                        handleSearch={handleSearch}
                      />
                      <table className="table">
                        <thead>
                          <tr>
                            <th>Gambar</th>
                            <th>Nama Produk</th>
                            <th>Harga</th>
                            <th>Stok</th>
                            <th>Aksi</th>
                          </tr>
                        </thead>
                        <tbody>
                          {products.map((product) => (
                            <tr key={product.id}>
                              <td>
                                <img
                                  src={
                                    product?.foto_produk
                                      ? convertImage(product.foto_produk)
                                      : ""
                                  }
                                  alt={product.name}
                                  style={{
                                    maxWidth: "100px",
                                    maxHeight: "100px",
                                  }}
                                />
                              </td>
                              <td>{product.nmProduk}</td>
                              <td>{product.hrgProduk}</td>
                              <td>{product.stok}</td>
                              <td>
                                <button
                                  className="btn btn-primary me-2"
                                  onClick={() => handleEditProduct(product.id)}
                                >
                                  Edit
                                </button>
                                <button
                                  className="btn btn-danger"
                                  onClick={() =>
                                    handleDeleteProduct(product.id)
                                  }
                                >
                                  Hapus
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                      <div className="mb-3">
                        <button
                          className="btn btn-primary"
                          onClick={() => {
                            setEditMode(true);
                            setAction("Tambah Produk");
                            resetInputState();
                          }}
                        >
                          Tambah Produk
                        </button>
                      </div>
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

export default Produkcrud;
