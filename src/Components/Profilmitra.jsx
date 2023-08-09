import React, { useState } from 'react';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const Profilmitra = () => {

    const [name, setName] = useState('');
    const [alamat, setAlamat] = useState('');
    const [tgl_lahir, setTgl] = useState('');
    const [jenis_kel, setKelamin] = useState('');
    const [email, setEmail] = useState('');
    const [no_hp, setNomer] = useState('');
    const [editMode, setEditMode] = useState(false);
    const [activeMenu, setActiveMenu] = useState('profil');
  
    const handleEdit = () => {
      setEditMode(true);
    };
  
    const handleSave = () => {
      setEditMode(false);
    };
  
    const handleCancel = () => {
      setEditMode(false);
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
                    <a className={`nav-link text-dark ${activeMenu === 'products' ? 'active-link' : '/crudproduk'}`} href="/crudproduk" onClick={() => setActiveMenu('products')}>
                    PRODUCTS
                    </a>
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
                    src="https://via.placeholder.com/150"
                    alt="Profil Pengguna"
                    className="card-img-top"
                  />
                  <div className="card-body d-flex flex-column align-items-center">
                      <button className="btn btn-primary me-2 mt-1">
                        UBAH FOTO PROFIL
                      </button>
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
                          <h5 className="card-title">Ubah Profil</h5>
                          <div className="mb-3">
                            <label htmlFor="name" className="form-label">
                              Nama Pengguna
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              id="name"
                              value={name}
                              onChange={(e) => setName(e.target.value)}
                            />
                          </div>
                          <div className="mb-3">
                            <label htmlFor="alamat" className="form-label">
                              Alamat
                            </label>
                            <textarea
                              className="form-control"
                              id="alamat"
                              rows="3"
                              value={alamat}
                              onChange={(e) => setAlamat(e.target.value)}
                            ></textarea>
                          </div>
                          <div className="mb-3">
                            <label htmlFor="tgl_lahir" className="form-label">
                              Tanggal Lahir
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              id="tgl_lahir"
                              value={tgl_lahir}
                              onChange={(e) => setTgl(e.target.value)}
                            />
                          </div>
                          <div className="mb-3">
                            <label htmlFor="jenis_kel" className="form-label">
                              Jenis Kelamin
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              id="jenis_kel"
                              value={jenis_kel}
                              onChange={(e) => setKelamin(e.target.value)}
                            />
                          </div>
                          <div className="mb-3">
                            <label htmlFor="email" className="form-label">
                              Email Pengguna
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              id="email"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                            />
                          </div>
                          <div className="mb-3">
                            <label htmlFor="no_hp" className="form-label">
                              No. Handphone
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              id="no_hp"
                              value={no_hp}
                              onChange={(e) => setNomer(e.target.value)}
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
                          <h5 className="card-title mt-2">Nama : {name}</h5>
                          <h5 className="card-title pt-2">Alamat : {alamat}</h5>
                          <h5 className="card-title pt-2">Tanggal Lahir : {tgl_lahir}</h5>
                          <h5 className="card-title pt-2">Jenis Kelamin : {jenis_kel}</h5>
                          <h5 className="card-title pt-2">Email Terkait : {email}</h5>
                          <h5 className="card-title pt-2 ">No. Handphone : {no_hp}</h5>
                          <button style={{width: "730px"}} className="btn btn-primary mt-5" onClick={handleEdit}>
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
    
    }
    export default Profilmitra