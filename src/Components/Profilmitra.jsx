import React, { useState } from 'react';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const Profilmitra = () => {

    const [name, setName] = useState('Nama Pengguna');
    const [description, setDescription] = useState('Deskripsi singkat tentang pengguna');
    const [editMode, setEditMode] = useState(false);
    const [activeMenu, setActiveMenu] = useState('beranda');
  
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
          <nav className="col-md-2 d-none d-md-block sidebar" style={{ backgroundColor: '#0F75BD' }}>
          <div className="position-sticky">
                <h5 className="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-dark">
                Main Menu
                </h5>
                <ul className="nav flex-column">
                <li className={`nav-item ${activeMenu === 'beranda' ? 'active' : ''}`}>
                    <a className={`nav-link text-dark ${activeMenu === 'beranda' ? 'active-link' : ''}`} href="#" onClick={() => setActiveMenu('beranda')}>
                    Beranda
                    </a>
                </li>
                <li className={`nav-item ${activeMenu === 'profil' ? 'active' : ''}`}>
                    <a className={`nav-link text-dark ${activeMenu === 'profil' ? 'active-link' : ''}`} href="#" onClick={() => setActiveMenu('profil')}>
                    Profil Anda
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
                <div className="col-md-4">
                  <div className="card">
                    <img
                      src="https://via.placeholder.com/150"
                      alt="Profil Pengguna"
                      className="card-img-top"
                    />
                    <div className="card-body">
                      <h5 className="card-title">{name}</h5>
                      <p className="card-text">{description}</p>
                    </div>
                  </div>
                </div>
                <div className="col-md-8">
                  <div className="card">
                    <div className="card-body">
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
                            <label htmlFor="description" className="form-label">
                              Deskripsi
                            </label>
                            <textarea
                              className="form-control"
                              id="description"
                              rows="3"
                              value={description}
                              onChange={(e) => setDescription(e.target.value)}
                            ></textarea>
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
                          <h5 className="card-title">Profil Pengguna</h5>
                          <p className="card-text">{description}</p>
                          <button className="btn btn-primary" onClick={handleEdit}>
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