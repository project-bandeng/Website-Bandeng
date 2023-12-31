import React, { useState } from "react";
import axios from "../service/axios";
import Swal from "sweetalert2";

import { Ring } from '@uiball/loaders';

const LoadingButton = () => {
  return(
    <Ring size={20} lineWeight={5} speed={2} color="white" />
  )
}

const Contactpage = () => {
    document.title = 'Contact Us';
    const [category, setCategory] = useState("Umum"); // State untuk kategori
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [pesan, setPesan] = useState("");
    const [isLoading, setIsLoading] = useState(false)

    function handleContact(e) {
        e.preventDefault()
        setIsLoading(true)
        let dataContact = {
            nameCn: username,
            emailCn: email,
            pesanCn: pesan,
            kategoriCn: category,
        };

        axios
            .post("/api/contact/kirim", dataContact)
            .then(function (response) {
                setIsLoading(false)
                if (response.status === 200) {
                    Swal.fire({
                        icon: "success",
                        title: "Good job!",
                        text: response.data.response,
                    });
                }
            })
            .catch((error) => {
                console.log(error);
                setIsLoading(false)
                if (error.response?.status === 500) {
                    //TODO : Tmbahin handle error karena error tergantung sama field nya contoh errors:{email: ['kesalahan'], telp: ['ada'], dst...}
                    Swal.fire({
                        icon: "error",
                        title: "Oops...",
                        text: error.data.error,
                    });
                }
            });
    }
    return (
        <div className="container" style={{ paddingTop: "100px" }}>
            <h2>Hubungi Kami</h2>
            <p>Silakan isi formulir di bawah ini untuk menghubungi kami:</p>
            <form>
                <div className="form-group">
                    <label htmlFor="category">
                        <h3>Kategori</h3>
                    </label>
                    <select
                        className="form-control"
                        id="category"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                    >
                        <option value="umum">Umum</option>
                        <option value="Pertanyaan">Pertanyaan</option>
                        <option value="mitra">Mitra</option>
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="name">
                        <h3>Nama</h3>
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="name"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="email">
                        <h3>Email</h3>
                    </label>
                    <input
                        type="email"
                        className="form-control"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="message">
                        <h3>Pesan</h3>
                    </label>
                    <textarea
                        className="form-control"
                        id="message"
                        rows="4"
                        value={pesan}
                        onChange={(e) => setPesan(e.target.value)}
                    ></textarea>
                </div>
                <button
                    onClick={handleContact}
                    type="submit"
                    className="btn btn-primary mt-3"
                >
                    {isLoading ? <LoadingButton /> : "Kirim Pesan"}
                </button>
            </form>
        </div>
    );
};

export default Contactpage;
