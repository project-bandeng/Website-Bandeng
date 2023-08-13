import React, { useState, useEffect } from "react";
import useLocalStorageUserData from "../hooks/useLocalStorageUserData";
import useBackendURLTranslator from "../hooks/useBackendURLTranslator";
import "../App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Produk from "../Image/Produk.jpg";
import axios from "../service/axios";

const Produkcrud = () => {
    const dataUser = useLocalStorageUserData();
    const convertImage = useBackendURLTranslator();
    const [statusDataOrigin, setStatusDataOrigin] = useState(0); //0 dari seever 1 dari local
    const [action, setAction] = useState("");
    const [productName, setProductName] = useState("");
    const [productPrice, setProductPrice] = useState("");
    const [productStok, setProductStok] = useState("");
    const [productWeight, setProductWeight] = useState("");
    const [productDesc, setProductDesc] = useState("");
    const [productImage, setProductImage] = useState(null);
    const [editMode, setEditMode] = useState(false);
    const [activeMenu, setActiveMenu] = useState("products");
    const [products, setProducts] = useState([
        {
            id: 1,
            nmProduk: "Produk A",
            hrgProduk: 100,
            stok: 50,
        },
        {
            id: 2,
            name: "Produk B",
            price: 150,
            stok: 30,
        },
        // ... tambahkan lebih banyak data produk di sini jika diperlukan
    ]);

    const fetchDataProduk = (id) => {
        axios
            .get(`/api/product/read/${id}`)
            .then((res) => {
                setStatusDataOrigin(0);
                console.log(res);
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
            // console.log(data[item]);
        });

        axios
            .post(`/api/product/${id}`, formData, {
                headers: { "Content-Type": "multipart/formdata" },
            })
            .then((res) => {
                console.log(res);
                // setProducts(res.data.products);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const generateFakeBackendURL = (file) => {
        let url = URL.createObjectURL(file);
        url = url.split("/");
        // console.log(url);
        return "storage/mitra-images/" + url[url.length - 1];
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
                local: true,
            };
            addDataProduct(newProduct, dataUser.id);

            newProduct.foto_produk = URL.createObjectURL(
                newProduct.foto_produk
            );
            console.log(newProduct);

            setProducts([...products, newProduct]);
            setProductName("");
            setProductPrice("");
            setProductStok("");
            setProductWeight("");
            setProductDesc("");
            setProductImage(null);
            setEditMode(false);
        }
    };

    const handleEditProduct = (id) => {
        setAction("Edit Produk");
        const editedProduct = products.find((product) => product.id === id);
        console.log(editedProduct);
        if (editedProduct) {
            setProductName(editedProduct.nmProduk);
            setProductPrice(editedProduct.hrgProduk);
            setProductStok(editedProduct.stok);
            setProductWeight(editedProduct.beratProduk);
            setProductDesc(editedProduct.dskProduk);
            setEditMode(true);
        }
    };

    // const sourceForImage = (item) => {
    //     if (item) {
    //         if (item.local) {
    //             return item.foto_mitra;
    //         }
    //         return convertImage(item.foto_mitra);
    //     }

    //     return "";
    // };

    const handleUpdateProduct = () => {
        if (productName && productPrice) {
            const updatedProducts = products.map((product) =>
                product.id === editMode
                    ? {
                          ...product,
                          nmProduk: productName,
                          hrgProduk: productPrice,
                          stok: productStok,
                      }
                    : product
            );
            setProducts(updatedProducts);
            setProductName("");
            setProductPrice("");
            setProductStok("");
            setEditMode(false);
        }
    };

    const handleDeleteProduct = (id) => {
        const updatedProducts = products.filter((product) => product.id !== id);
        setProducts(updatedProducts);
    };

    const handleImageUpload = (event) => {
        const imageFile = event.target.files[0];
        setProductImage(imageFile);
    };

    useEffect(() => {
        fetchDataProduk(dataUser.id);
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
                                    activeMenu === "profil" ? "active" : ""
                                }`}
                            >
                                <a
                                    className={`nav-link text-dark ${
                                        activeMenu === "profil"
                                            ? "active-link"
                                            : "/profil"
                                    }`}
                                    href="/profil"
                                    onClick={() => setActiveMenu("profil")}
                                >
                                    PROFILE
                                </a>
                            </li>
                            <li
                                className={`nav-item ${
                                    activeMenu === "products" ? "active" : ""
                                }`}
                            >
                                <a
                                    className={`nav-link text-dark ${
                                        activeMenu === "products"
                                            ? "active-link"
                                            : "/products"
                                    }`}
                                    href="/products"
                                    onClick={() => setActiveMenu("products")}
                                >
                                    PRODUCTS
                                </a>
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
                                            <h5 className="card-title">
                                                {action}
                                            </h5>
                                            <div className="mb-3">
                                                <label
                                                    htmlFor="product-image"
                                                    className="form-label"
                                                >
                                                    Gambar Produk
                                                </label>
                                                <input
                                                    type="file"
                                                    className="form-control"
                                                    id="product-image"
                                                    accept="image/*"
                                                    onChange={handleImageUpload}
                                                />
                                            </div>
                                            <div className="mb-3">
                                                <label
                                                    htmlFor="product-name"
                                                    className="form-label"
                                                >
                                                    Nama Produk
                                                </label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    id="product-name"
                                                    value={productName}
                                                    onChange={(e) =>
                                                        setProductName(
                                                            e.target.value
                                                        )
                                                    }
                                                />
                                            </div>
                                            <div className="mb-3">
                                                <label
                                                    htmlFor="product-price"
                                                    className="form-label"
                                                >
                                                    Harga Produk
                                                </label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    id="product-price"
                                                    value={productPrice}
                                                    onChange={(e) =>
                                                        setProductPrice(
                                                            e.target.value
                                                        )
                                                    }
                                                />
                                            </div>
                                            <div className="mb-3">
                                                <label
                                                    htmlFor="product-stok"
                                                    className="form-label"
                                                >
                                                    Stok Produk
                                                </label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    id="product-stok"
                                                    value={productStok}
                                                    onChange={(e) =>
                                                        setProductStok(
                                                            e.target.value
                                                        )
                                                    }
                                                />
                                            </div>
                                            <div className="mb-3">
                                                <label
                                                    htmlFor="product-stok"
                                                    className="form-label"
                                                >
                                                    Berat Produk
                                                </label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    id="product-berat"
                                                    value={productWeight}
                                                    onChange={(e) =>
                                                        setProductWeight(
                                                            e.target.value
                                                        )
                                                    }
                                                />
                                            </div>
                                            <div className="mb-3">
                                                <label
                                                    htmlFor="product-stok"
                                                    className="form-label"
                                                >
                                                    Deskrisi Produk
                                                </label>
                                                <textarea
                                                    className="form-control"
                                                    id="product-berat"
                                                    value={productDesc}
                                                    onChange={(e) =>
                                                        setProductDesc(
                                                            e.target.value
                                                        )
                                                    }
                                                />
                                            </div>
                                            <button
                                                className="btn btn-primary me-2"
                                                onClick={
                                                    action === "Tambah Produk"
                                                        ? handleAddProduct
                                                        : handleEditProduct
                                                }
                                            >
                                                Simpan Perubahan
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
                                                Daftar Produk
                                            </h5>
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
                                                                        product
                                                                            ? convertImage(
                                                                                  product.foto_produk
                                                                              )
                                                                            : " "
                                                                    }
                                                                    alt={
                                                                        product.name
                                                                    }
                                                                    style={{
                                                                        maxWidth:
                                                                            "100px",
                                                                        maxHeight:
                                                                            "100px",
                                                                    }}
                                                                />
                                                            </td>
                                                            <td>
                                                                {
                                                                    product.nmProduk
                                                                }
                                                            </td>
                                                            <td>
                                                                {
                                                                    product.hrgProduk
                                                                }
                                                            </td>
                                                            <td>
                                                                {product.stok}
                                                            </td>
                                                            <td>
                                                                <button
                                                                    className="btn btn-primary me-2"
                                                                    onClick={() =>
                                                                        handleEditProduct(
                                                                            product.id
                                                                        )
                                                                    }
                                                                >
                                                                    Edit
                                                                </button>
                                                                <button
                                                                    className="btn btn-danger"
                                                                    onClick={() =>
                                                                        handleDeleteProduct(
                                                                            product.id
                                                                        )
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
                                                        setAction(
                                                            "Tambah Produk"
                                                        );
                                                        setProductName("");
                                                        setProductPrice("");
                                                        setProductStok("");
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
