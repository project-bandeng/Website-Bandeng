import React, { useState } from 'react';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const Kelolauser = () => {
  const [users, setUsers] = useState([
    {
      id: 1,
      name: 'User A',
      email: 'usera@example.com',
      no_tlp: '085156761382',
    },
    {
      id: 2,
      name: 'User B',
      email: 'userb@example.com',
      no_tlp: '085156761382',
    },
    // ... tambahkan lebih banyak data pengguna di sini jika diperlukan
  ]);

  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userNotlp, setUserNotlp] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [activeMenu, setActiveMenu] = useState('datauser');

  const handleAddUser = () => {
    if (userName && userEmail && userNotlp) {
      const newUser = {
        id: new Date().getTime(),
        name: userName,
        email: userEmail,
        no_tlp: userNotlp,
      };

      setUsers([...users, newUser]);
      setUserName('');
      setUserEmail('');
      setUserNotlp('');
    }
  };

  const handleEditUser = (id) => {
    const editedUser = users.find((user) => user.id === id);
    if (editedUser) {
      setUserName(editedUser.name);
      setUserEmail(editedUser.email);
      setUserNotlp(editedUser.no_tlp);
      setEditMode(true);
    }
  };

  const handleUpdateUser = () => {
    if (userName && userEmail && userNotlp) {
      const updatedUsers = users.map((user) =>
        user.id === editMode
          ? { ...user, name: userName, email: userEmail, no_tlp: userNotlp}
          : user
      );
      setUsers(updatedUsers);
      setUserName('');
      setUserEmail('');
      setUserNotlp('');
      setEditMode(false);
    }
  };

  const handleDeleteUser = (id) => {
    const updatedUsers = users.filter((user) => user.id !== id);
    setUsers(updatedUsers);
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
            <h1>Kelola User</h1>
          </div>
          <div className="row">
            <div className="col-md-12">
              <div className="card">
                <div className="card-body shadow ps-5 pt-4 rounded-2">
                {editMode ? (
                    <>
                      <h5 className="card-title">Edit Pengguna</h5>
                      <div className="mb-3">
                        <label htmlFor="user-name" className="form-label">
                          Nama Pengguna
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="user-name"
                          value={userName}
                          onChange={(e) => setUserName(e.target.value)}
                        />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="user-email" className="form-label">
                          Email Pengguna
                        </label>
                        <input
                          type="email"
                          className="form-control"
                          id="user-email"
                          value={userEmail}
                          onChange={(e) => setUserEmail(e.target.value)}
                        />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="user-role" className="form-label">
                          Peran Pengguna
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="user-role"
                          value={userNotlp}
                          onChange={(e) => setUserNotlp(e.target.value)}
                        />
                      </div>
                      <button className="btn btn-primary me-2" onClick={handleUpdateUser}>
                        Simpan Perubahan
                      </button>
                      <button className="btn btn-secondary" onClick={() => setEditMode(false)}>
                        Batal
                      </button>
                    </>
                  ) : (
                    <>
                      <h5 className="card-title">Daftar Pengguna</h5>
                      <table className="table">
                        <thead>
                          <tr>
                            <th>Nama</th>
                            <th>Email</th>
                            <th>Nomer Telephone</th>
                            <th>Aksi</th>
                          </tr>
                        </thead>
                        <tbody>
                          {users.map((user) => (
                            <tr key={user.id}>
                              <td>{user.name}</td>
                              <td>{user.email}</td>
                              <td>{user.no_tlp}</td>
                              <td>
                                <button
                                  className="btn btn-primary me-2"
                                  onClick={() => handleEditUser(user.id)}
                                >
                                  Edit
                                </button>
                                <button
                                  className="btn btn-danger"
                                  onClick={() => handleDeleteUser(user.id)}
                                >
                                  Hapus
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                      <div className="mb-3">
                        <button className="btn text-white"
                            style={{backgroundColor:'#3DEB12'}}
                            onClick={() => setEditMode(true)}>
                          Tambah Pengguna
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

export default Kelolauser;
