import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import useLocalStorageUserData from '../hooks/useLocalStorageUserData';
import useBackendURLTranslator from '../hooks/useBackendURLTranslator';
import SearchBar from './SearchBar';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Produk from '../Image/Produk.jpg';
import axios from '../service/axios';
import useDataFilter from '../hooks/useDataFilter';
import Swal from 'sweetalert2';
import { Ring } from '@uiball/loaders';

const LoadingDataComponent = ({columnSpan}) =>{
  return(
    <tr>
      <td colspan={columnSpan} className="text-center py-5">
        <Ring size={40} lineWeight={5} speed={2} color="black" />
      </td>
    </tr>
  )
}

const LoadingButton = () => {
  return(
    <Ring size={20} lineWeight={5} speed={2} color="black" />
  )
}

const Produkcrud = () => {
  document.title = "Kelola Produk";
  const navigate = useNavigate();
  const dataUser = useLocalStorageUserData();
  const convertImage = useBackendURLTranslator();
  const searchData = useDataFilter();

  const [statusDataOrigin, setStatusDataOrigin] = useState(0); //0 dari server 1 dari local
  const [action, setAction] = useState('');
  const [productId, setProductId] = useState('');
  const [productName, setProductName] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [productStok, setProductStok] = useState('');
  const [productWeight, setProductWeight] = useState('');
  const [productDesc, setProductDesc] = useState('');
  const [productLink, setProductLink] = useState('');
  const [productImage, setProductImage] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [activeMenu, setActiveMenu] = useState('products');
  const [productsPrev, setProductsPrev] = useState([]);
  const [products, setProducts] = useState([]);
  const [textSearch, setTextSearch] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingActionButton, setIsLoadingActionButton] = useState(false); //untuk loading button saat tambah atau edit

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
    let filteredProduk = searchData(productsPrev, textSearch, 'nmProduk');
    setProducts(filteredProduk);
  };

  const fetchDataProduk = (id) => {
    setIsLoading(true)
    axios
      .get(`/api/product/read-mitra/${id}`)
      .then((res) => {
        res.data.data = JSON.parse(res.data.data);
        setStatusDataOrigin(0);
        setProductsPrev(res.data.data.products);
        setProducts(res.data.data.products);
        setIsLoading(false)
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false)
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
        headers: { 'Content-Type': 'multipart/formdata' },
      })
      .then((res) => {
        console.log(res);
        let productRes = JSON.parse(res.data.data);
        // console.log(productRes);
        setProducts([...products, productRes]);
        // setProducts(res.data.products);
        setIsLoadingActionButton(false)
        // setProducts([...products, productRes]);
        // setProducts(res.data.products);
        Swal.fire({
          icon: 'success',
          title: 'Berhasil Tambah Produk',
          text: "Berhasil Tambah Data Produk",
        }).then(()=>{
          resetInputState();
          setEditMode(false);
        })
      })
      .catch((err) => {
        console.log(err);
        Swal.fire({
          icon: 'error',
          title: 'Gagal Tambah Data Produk',
          text: "Gagal Tambah",
        });
        setIsLoadingActionButton(false)
      });
  };

  const deleteDataProduct = (id) => {
    axios
      .delete(`/api/product/delete/${id}`)
      .then((res) => {
        console.log(res);
        // setProducts(res.data.products);
        Swal.fire({
          icon: 'success',
          title: 'Berhasil Hapus Produk',
          text: "Berhasil Hapus Data Produk",
        })
      })
      .catch((err) => {
        console.log(err);
        Swal.fire({
          icon: 'error',
          title: 'Gagal Hapus Produk',
          text: "Gagal Hapus Data Produk",
        });
      });
  };

  const editDataProduk = (id, data) => {
    setIsLoadingActionButton(true)
    let formData = new FormData();
    let key = Object.keys(data);
    console.log(data);

    key.forEach((item) => {
      formData.append(item, data[item]);
      // console.log(data[item]);
    });

    axios
      .post(`/api/product/edit/${id}`, formData, {
        headers: { 'Content-Type': 'multipart/formdata' },
      })
      .then((res) => {
        console.log(res);
        let productRes = JSON.parse(res.data.data);
        console.log(productRes);
        updateProductsState(productRes);
        setIsLoadingActionButton(false)
        // setProducts([...products, productRes]);
        // setProducts(res.data.products);
        Swal.fire({
          icon: 'success',
          title: 'Berhasil Edit Produk',
          text: "Berhasil Edit Data Produk",
        }).then(()=>{
          resetInputState();
          setEditMode(false);
        })
      })
      .catch((err) => {
        console.log(err);
        Swal.fire({
          icon: 'error',
          title: 'Gagal Update Data Produk',
          text: "Gagal update",
        });
        setIsLoadingActionButton(false)
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
      setIsLoadingActionButton(true)
      addDataProduct(newProduct, dataUser.id);

      // newProduct.localFoto = URL.createObjectURL(newProduct.foto_produk);
      // console.log(newProduct);

      // setProducts([...products, newProduct]);
    } else {
      console.log(productName && productPrice && productImage && productWeight);
    }
  };

  const resetInputState = () => {
    setProductName('');
    setProductPrice('');
    setProductStok('');
    setProductWeight('');
    setProductDesc('');
    setProductImage(null);
    setProductLink('');
  };

  const handleEditProduct = (id) => {
    resetInputState();
    setAction('Edit Produk');
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
    const updatedProducts = products.map((product) => (product.id === data.id ? data : product));
    setProducts(updatedProducts);
  };

  const handleUpdateProduct = () => {
    if (productName && productPrice && productStok && productDesc && productWeight && productId) {
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
    } else {
      alert('Hrap isi semua form');
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
      .get('/api/v2/logout-mitra')
      .then((res) => {
        console.log(res);
        localStorage.removeItem('data-user');
        localStorage.removeItem('auth-token');
        navigate('/login');
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchDataProduk(dataUser?.id);
  }, [editMode]);

  return (
      <div className="d-flex">
        <nav className="col-md-2 d-md-block sidebar rounded-end-4 pe-0 ps-4 min-vh-100" style={{ backgroundColor: '#0F75BD'}}>
          <div className="d-flex flex-column justify-content-between h-100">
          <div className="position-sticky">
            <h5 className="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-white">Main Menu</h5>
            <ul className="nav flex-column gap-2">
              <li className={`nav-item ${activeMenu === 'profil' ? 'active' : ''}`}>
                <a className={`nav-link text-white rounded-start-3 hovering-menu  ${activeMenu === 'profil' ? 'active-link' : '/profil'}`} href="/profil" onClick={() => setActiveMenu('profil')}>
                  <i class="bi bi-person-fill me-2"></i>
                  <span className='d-md-inline d-none'>PROFILE</span>
                </a>
              </li>
              <li className={`nav-item rounded-start-3 ${activeMenu === 'products' ? 'active' : ''}`}>
                <a className={`nav-link text-primary ${activeMenu === 'products' ? 'active-link' : '/products'}`} href="/crudproduk" onClick={() => setActiveMenu('products')}>
                  <i class="bi bi-bag-fill me-2"></i>
                  <span className='d-md-inline d-none'>PRODUCTS</span>
                </a>
              </li>
            </ul>
          </div>
          <div className="logout mt-auto mb-3">
              <Link className={`nav-link text-white nav-item px-3 py-2 hovering-menu rounded-start-3`} onClick={() => handleLogout()} style={{ cursor: 'pointer' }}>
                <i class="bi bi-door-open-fill me-2"></i>
                <span className='d-md-inline d-none'>LOGOUT</span>
              </Link>
            </div>
          </div>
        </nav>
        <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
          <div className="pt-3 pb-2 mb-3">
            <h1>Kelola Produk</h1>
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
                        <input type="file" className="form-control" id="product-image" accept="image/*" onChange={handleImageUpload} required />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="product-name" className="form-label">
                          Nama Produk
                        </label>
                        <input type="text" className="form-control" id="product-name" value={productName} onChange={(e) => setProductName(e.target.value)} required />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="product-price" className="form-label">
                          Harga Produk
                        </label>
                        <input type="text" className="form-control" id="product-price" value={productPrice} onChange={(e) => setProductPrice(e.target.value)} required />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="product-stok" className="form-label">
                          Stok Produk
                        </label>
                        <input type="text" className="form-control" id="product-stok" value={productStok} onChange={(e) => setProductStok(e.target.value)} required />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="product-stok" className="form-label">
                          Berat Produk
                        </label>
                        <input type="text" className="form-control" id="product-berat" value={productWeight} onChange={(e) => setProductWeight(e.target.value)} required />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="product-link" className="form-label">
                          Link Produk (shopee)
                        </label>
                        <input type="text" className="form-control" id="product-link" value={productLink} onChange={(e) => setProductLink(e.target.value)} required />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="product-stok" className="form-label">
                          Deskrisi Produk
                        </label>
                        <textarea className="form-control" id="product-berat" value={productDesc} onChange={(e) => setProductDesc(e.target.value)} required />
                      </div>
                      <button className="btn btn-primary me-2" onClick={action === 'Tambah Produk' ? handleAddProduct : handleUpdateProduct}>
                        {isLoadingActionButton ? <LoadingButton/> : "Simpan Perubahan" }
                      </button>
                      <button className="btn btn-secondary" onClick={() => setEditMode(false)}>
                        Batal
                      </button>
                    </>
                  ) : (
                    <>
                      <div className="d-flex justify-content-between align-items-center mb-4">
                        <h5 className="card-title">Daftar Produk</h5>
                        <SearchBar setTextToSearch={setTextSearch} textToSearch={textSearch} handleSearch={handleSearch} />
                      </div>
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
                          {isLoading ? <LoadingDataComponent columnSpan={5}/> : products.map((product) => (
                            <tr key={product.id}>
                              <td>
                                <img
                                  src={product?.foto_produk ? convertImage(product.foto_produk) : ''}
                                  alt={product.name}
                                  style={{
                                    width: '100px',
                                    height: '80px',
                                    objectFit: "cover"
                                  }}
                                />
                              </td>
                              <td>{product.nmProduk}</td>
                              <td>{product.hrgProduk}</td>
                              <td>{product.stok}</td>
                              <td>
                                <button className="btn btn-primary me-2" onClick={() => handleEditProduct(product.id)}>
                                  Edit
                                </button>
                                <button className="btn btn-danger" onClick={() => handleDeleteProduct(product.id)}>
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
                            setAction('Tambah Produk');
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
  );
};

export default Produkcrud;