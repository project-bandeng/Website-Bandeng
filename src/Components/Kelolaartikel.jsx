import React, { useState } from 'react';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const Kelolaartikel = () => {
  const [articles, setArticles] = useState([
    {
      id: 1,
      image: 'https://example.com/image1.jpg',
      description: 'Deskripsi Artikel 1',
    },
    {
      id: 2,
      image: 'https://example.com/image2.jpg',
      description: 'Deskripsi Artikel 2',
    },
  ]);

  const [editMode, setEditMode] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [newArticleImage, setNewArticleImage] = useState('');
  const [newArticleDescription, setNewArticleDescription] = useState('');
  const [activeMenu, setActiveMenu] = useState('artikel');

  const handleAddArticle = () => {
    if (newArticleImage && newArticleDescription) {
      const newArticle = {
        id: new Date().getTime(),
        image: newArticleImage,
        description: newArticleDescription,
      };

      setArticles([...articles, newArticle]);
      setNewArticleImage('');
      setNewArticleDescription('');
      setEditMode(false);
    }
  };

  const handleEditArticle = (article) => {
    setSelectedArticle(article);
    setEditMode(true);
    setNewArticleImage(article.image);
    setNewArticleDescription(article.description);
  };

  const handleDeleteArticle = (id) => {
    const updatedArticles = articles.filter((article) => article.id !== id);
    setArticles(updatedArticles);
  };

  return (
    <div className="container-news">
        <div className="row"  style={{height: '630px'}}>
          <nav className="col-md-2 d-none d-md-block sidebar rounded-4 " style={{ backgroundColor: '#0F75BD' }}>
          <div className="position-sticky">
                <h5 className="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-dark">
                Main Menu
                </h5>
                <ul className="nav flex-column">
                <li className={`nav-item ${activeMenu === 'datauser' ? 'active' : ''}`}>
                    <a className={`nav-link text-dark ${activeMenu === 'datauser' ? 'active-link' : '/user'}`} href="/user" onClick={() => setActiveMenu('datauser')}>
                    DATA USER
                    </a>
                </li>
                <li className={`nav-item ${activeMenu === 'artikel' ? 'active' : ''}`}>
                    <a className={`nav-link text-dark ${activeMenu === 'artikel' ? 'active-link' : '/artikel'}`} href="/artikel" onClick={() => setActiveMenu('artikel')}>
                    ARTICLE
                    </a>
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
                      <h5 className="card-title">{selectedArticle ? 'Edit Artikel' : 'Tambah Artikel Baru'}</h5>
                      <div className="mb-3">
                        <label htmlFor="article-image" className="form-label">
                          Upload Gambar Artikel
                        </label>
                        <input
                          type="file"
                          className="form-control"
                          id="article-image"
                          onChange={(e) => setNewArticleImage(URL.createObjectURL(e.target.files[0]))}
                        />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="article-description" className="form-label">
                          Deskripsi Artikel
                        </label>
                        <textarea
                          className="form-control"
                          id="article-description"
                          value={newArticleDescription}
                          onChange={(e) => setNewArticleDescription(e.target.value)}
                        />
                      </div>
                      <button className="btn btn-primary me-2" onClick={handleAddArticle}>
                        {selectedArticle ? 'Simpan Perubahan' : 'Simpan Artikel Baru'}
                      </button>
                      <button className="btn btn-secondary" onClick={() => setEditMode(false)}>
                        Batal
                      </button>
                    </>
                  ) : (
                    <>
                      <h5 className="card-title">Daftar Artikel</h5>
                      <div className="row">
                        {articles.map((article) => (
                          <div className="col-md-4 mb-4" key={article.id}>
                            <div className="card">
                              <img src={article.image} className="card-img-top" alt={`Artikel ${article.id}`} />
                              <div className="card-body">
                                <p className="card-text">{article.description}</p>
                                <button
                                  className="btn btn-primary me-2"
                                  onClick={() => handleEditArticle(article)}
                                >
                                  Edit
                                </button>
                                <button
                                  className="btn btn-danger"
                                  onClick={() => handleDeleteArticle(article.id)}
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
                    style={{ position: 'fixed', bottom: '20px', right: '20px', backgroundColor: '#3DEB12' }}
                    onClick={() => {
                      setSelectedArticle(null);
                      setNewArticleImage('');
                      setNewArticleDescription('');
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
