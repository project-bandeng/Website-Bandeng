import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../service/axios";
import "../App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import SearchBar from "./SearchBar";
import useDataFilter from "../hooks/useDataFilter";
import Sidebar from "./Sidebar";
import Swal from "sweetalert2";
import { Ring } from "@uiball/loaders";

const dataLink = [
  { path: "/user", name: "Data User", icon: "bi-person-fill" },
  { path: "/artikel", name: "Artikel", icon: "bi-newspaper" },
];

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

const Kelolauser = () => {
  document.title = "Kelola User";
  const [users, setUsers] = useState([]);
  const [usersBackup, setUsersBackup] = useState([]);
  const [status, setStatus] = useState(0); //0 tambah data, 1 edit
  const [userSelected, setUserSelected] = useState(null);
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userNotlp, setUserNotlp] = useState("");
  const [userAlamat, setUserAlamat] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [activeMenu, setActiveMenu] = useState("datauser");
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingActionButton, setIsLoadingActionButton] = useState(false); //untuk loading button saat tambah atau edit
  const [textSearch, setTextSearch] = useState("");
  const navigate = useNavigate();
  const searchData = useDataFilter();

  const handleAddUser = () => {
    if (userName && userEmail && userNotlp && userAlamat) {
      const newUser = {
        namaMitra: userName,
        email: userEmail,
        no_tlp: userNotlp,
        alamatMitra: userAlamat,
      };
      
      setIsLoadingActionButton(true)

      addNewUserAPI(newUser);
      // setUsers([...users, newUser]);
      
    } else {
      alert("harus lengkap");
    }
  };

  const resetState = () => {
    setUserName("");
    setUserEmail("");
    setUserNotlp("");
    setUserAlamat("");
  };

  const handleEditUser = (data) => {
    setStatus(1);
    setUserSelected(data);
    const editedUser = users.find((user) => user.id === data.id);
    if (editedUser) {
      setUserName(editedUser.namaMitra);
      setUserAlamat(editedUser.alamatMitra);
      setUserEmail(editedUser.email);
      setUserNotlp(editedUser.no_tlp);
      setEditMode(true);
    }
  };

  const handleUpdateUser = () => {
    if (userName && userEmail && userNotlp && userAlamat) {
      const data = {
        ...userSelected,
        namaMitra: userName,
        email: userEmail,
        no_tlp: userNotlp,
        alamatMitra: userAlamat,
      };
      
      setIsLoadingActionButton(true)

      editUserAPI(data);
    } else {
      alert("harus lengkap");
    }
  };

  const updateDataInsideState = (data) => {
    const updatedUsers = users.map((item) =>
      item.id === data.id ? data : item
    );
    setUsers(updatedUsers);
    setUsersBackup(updatedUsers);
  };

  const handleDeleteUser = (id) => {
    deleteUserAPI(id);
    const updatedUsers = users.filter((user) => user.id !== id);
    setUsers(updatedUsers);
  };

  const addNewUserAPI = (data) => {
    axios
      .post("/api/create/mitra", data)
      .then((res) => {
        console.log(res.data);
        setUsers([...users, res.data]);
        setUsersBackup([...usersBackup, res.data]);
        
        setIsLoadingActionButton(false)
        Swal.fire({
          icon: 'success',
          title: 'Berhasil Tambah User',
          text: "Berhasil Tambah Data User",
        }).then(()=>{
          resetState();
        setEditMode(false);
        })
        
        
      })
      .catch((err) => {
        console.log(err);
        Swal.fire({
          icon: 'error',
          title: 'Gagal Tambah Data User',
          text: "Gagal Tambah",
        });
        setIsLoadingActionButton(false)
        //setEditMode(false);
      });
  };

  const editUserAPI = (data) => {
    axios
      .post(`/api/edit/mitra/${data.id}`, data)
      .then((res) => {
        // console.log(res.data.response);
        updateDataInsideState(res.data.response);
        setIsLoadingActionButton(false)
        Swal.fire({
          icon: 'success',
          title: 'Berhasil Edit User',
          text: "Berhasil Edit Data User",
        }).then(()=>{
          resetState();
          setEditMode(false);
        })
      })
      .catch((err) => {
        console.log(err);
        Swal.fire({
          icon: 'error',
          title: 'Gagal Update Data User',
          text: "Gagal update",
        });
        setIsLoadingActionButton(false)
      });
  };

  const deleteUserAPI = (id) => {
    axios
      .delete(`/api/delete/mitra/${id}`)
      .then((res) => {
        console.log(res);
        // updateDataInsideState(res.data.response);
        Swal.fire({
          icon: 'success',
          title: 'Berhasil Hapus User',
          text: "Berhasil Hapus Data User",
        })
      })
      .catch((err) => {
        Swal.fire({
          icon: 'error',
          title: 'Gagal Hapus User',
          text: "Gagal Hapus Data User",
        });
      });
  };

  const fetchDataUserAPI = () => {
    setIsLoading(true)
    axios
      .get("/api/mitra/all/admin")
      .then((res) => {
        console.log(res.data.data);
        setUsers(res.data.data);
        setUsersBackup(res.data.data);
        setIsLoading(false)
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false)
      });
  };

  const handleLogout = () => {
    axios
      .get("/api/admin/logout-admin")
      .then((res) => {
        // console.log(res);
        localStorage.removeItem("data-user");
        localStorage.removeItem("auth-token");
        navigate("/login/admin");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleSearch = (e) => {
    setIsLoading(true)
    e.preventDefault();
    let filteredUser = searchData(usersBackup, textSearch, "namaMitra");
    setIsLoading(false)
    
    if(filteredUser.length === 0){
      Swal.fire({
        icon: 'error',
        title: 'Tidak Ditemukan!',
        text: "Data tidak ditemukan",
      });
    }
    setUsers(filteredUser);
  };

  useEffect(() => {
    fetchDataUserAPI();
  }, [editMode]);

  useEffect(() => {
    if (textSearch.length === 0 && usersBackup.length !== 0) {
      setUsers([...usersBackup]);
    }
    // let timeOut = setTimeout(() => {
    //   console.log(textSearch);
    // }, 600);

    // return () => {
    //   clearTimeout(timeOut);
    // };
  }, [textSearch]);

  return (
      <div className="d-flex">
        <Sidebar dataLink={dataLink} handleLogout={handleLogout} />
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
                          Alamat Mitra
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="user-role"
                          value={userAlamat}
                          onChange={(e) => setUserAlamat(e.target.value)}
                        />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="user-role" className="form-label">
                          No Telpon Mitra
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="user-role"
                          value={userNotlp}
                          onChange={(e) => setUserNotlp(e.target.value)}
                        />
                      </div>
                      <button
                        className="btn btn-primary me-2"
                        onClick={
                          status === 0 ? handleAddUser : handleUpdateUser
                        }
                      >
                        {isLoadingActionButton ? <LoadingButton/> : "Simpan Perubahan"}
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
                    <div className="d-flex justify-content-between align-items-center mb-4">
                    <h5 className="card-title d-inline">Daftar Pengguna</h5>
                      <SearchBar
                        setTextToSearch={setTextSearch}
                        textToSearch={textSearch}
                        handleSearch={handleSearch}
                        placeholder="Cari Nama Mitra"
                      />
                    </div>
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
                          {isLoading ? <LoadingDataComponent columnSpan={4} /> : (users.map((user) => (
                            <tr key={user.id}>
                              <td>{user.namaMitra}</td>
                              <td>{user.email}</td>
                              <td>{user.no_tlp}</td>
                              <td>
                                <button
                                  className="btn btn-primary me-2"
                                  onClick={() => {
                                    setStatus(1);
                                    handleEditUser(user);
                                  }}
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
                          ))) }
                        </tbody>
                      </table>
                      <div className="mb-3">
                        <button
                          className="btn text-white"
                          style={{
                            backgroundColor: "#3DEB12",
                          }}
                          onClick={() => {
                            setStatus(0);
                            setEditMode(true);
                          }}
                        >
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
  );
};

export default Kelolauser;