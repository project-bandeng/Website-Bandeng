import React, { useState } from 'react';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const Produkcrud = () => {
  const [products, setProducts] = useState([]);
  const [productName, setProductName] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [productImage, setProductImage] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [activeMenu, setActiveMenu] = useState('products');

  const handleAddProduct = () => {
    if (productName && productPrice && productImage) {
      const newProduct = {
        id: new Date().getTime(),
        name: productName,
        price: productPrice,
        image: productImage,
      };

      setProducts([...products, newProduct]);
      setProductName('');
      setProductPrice('');
      setProductImage(null);
    }
  };

  const handleEditProduct = (id) => {
    const editedProduct = products.find((product) => product.id === id);
    if (editedProduct) {
      setProductName(editedProduct.name);
      setProductPrice(editedProduct.price);
      setEditMode(true);
    }
  };

  const handleUpdateProduct = () => {
    if (productName && productPrice) {
      const updatedProducts = products.map((product) =>
        product.id === editMode ? { ...product, name: productName, price: productPrice } : product
      );
      setProducts(updatedProducts);
      setProductName('');
      setProductPrice('');
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

  return (
    <div className="container-news">
        <div className="row" >
          <nav className="col-md-2 d-none d-md-block sidebar rounded-4 " style={{ backgroundColor: '#0F75BD' }}>
          <div className="position-sticky">
                <h5 className="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-dark">
                Main Menu
                </h5>
                <ul className="nav flex-column">
                <li className={`nav-item ${activeMenu === 'profil' ? 'active' : ''}`}>
                    <a className={`nav-link text-dark ${activeMenu === 'profil' ? 'active-link' : '/profil'}`} href="/profil" onClick={() => setActiveMenu('profil')}>
                    PROFILE
                    </a>
                </li>
                <li className={`nav-item ${activeMenu === 'products' ? 'active' : ''}`}>
                    <a className={`nav-link text-dark ${activeMenu === 'products' ? 'active-link' : '/products'}`} href="/products" onClick={() => setActiveMenu('products')}>
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
                    <h5 className="card-title">Edit Produk</h5>
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
                      />
                    </div>
                    <button className="btn btn-primary me-2" onClick={handleUpdateProduct}>
                      Simpan Perubahan
                    </button>
                    <button className="btn btn-secondary" onClick={() => setEditMode(false)}>
                      Batal
                    </button>
                  </>
                ) : (
                  <>
                    <h5 className="card-title">Daftar Produk</h5>
                    <table className="table">
                      <thead>
                        <tr>
                          <th>Gambar</th>
                          <th>Nama Produk</th>
                          <th>Harga</th>
                          <th>Aksi</th>
                        </tr>
                      </thead>
                      <tbody>
                        {products.map((product) => (
                          <tr key={product.id}>
                            <td>{product.image}</td>
                            <td>{product.name}</td>
                            <td>{product.price}</td>
                            <td>
                              <button
                                className="btn btn-primary me-2"
                                onClick={() => handleEditProduct(product.id)}
                              >
                                Edit
                              </button>
                              <button
                                className="btn btn-danger"
                                onClick={() => handleDeleteProduct(product.id)}
                              >
                                Hapus
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    <div className="mb-3">
                      <button className="btn btn-primary" onClick={() => setEditMode(true)}>
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

export default Produkcrud
