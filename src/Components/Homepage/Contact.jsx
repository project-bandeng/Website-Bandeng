import axios from "../../service/axios";
import { useState } from "react";
import Swal from "sweetalert2";

export default function Contact() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [pesan, setPesan] = useState("");
    const [category, setCategory] = useState("Umum");

    function handleContact() {
        let dataContact = {
            nameCn: username,
            emailCn: email,
            pesanCn: pesan,
            kategoriCn: category,
        };

        axios
            .post("/api/contact/kirim", dataContact)
            .then(function (response) {
                if (response.status === 200) {
                    Swal.fire({
                        icon: "success",
                        title: "Good job!",
                        text: "Terimakasih Telah Menghubungi Kami",
                    });
                }
            })
            .catch((error) => {
                console.log(error);
                if (error.response?.status === 400) {
                    //TODO : Tmbahin handle error karena error tergantung sama field nya contoh errors:{email: ['kesalahan'], telp: ['ada'], dst...}
                    Swal.fire({
                        icon: "error",
                        title: "Oops...",
                        text: "Terjadi Kesalahan Lain.",
                    });
                }
            });
    }

    return (
        <div
            className="container pt-5 pb-5"
            style={{ backgroundColor: "#DDE6ED" }}
        >
            <h1 className="news-title text-center">Contact</h1>
            <div className="ms-5 container-fluid pt-4 d-flex flex-column justify-content-center">
                <div className="mb-3 row">
                    <label htmlFor="category" className="col-auto">
                        <h3>Kategori</h3>
                    </label>
                    <div className="col-sm-10">
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
                </div>
                <div className="mb-3 row">
                    <label for="inputPassword" className="col-auto">
                        <h3 className="">
                            <span>E-Mail:</span>
                        </h3>
                    </label>
                    <div className="col-sm-10">
                        <input
                            type="text"
                            className="form-control shadow"
                            id="inputPassword"
                            onChange={(e) => setEmail(e.target.value)}
                        ></input>
                    </div>
                </div>
                <div className="mb-3 row">
                    <label for="inputPassword" className="col-auto">
                        <h3 className="">
                            <span>Nama :</span>
                        </h3>
                    </label>
                    <div className="col-sm-10">
                        <input
                            type="text"
                            className="form-control shadow"
                            id="inputPassword"
                            onChange={(e) => setUsername(e.target.value)}
                        ></input>
                    </div>
                </div>
                <div className="col">
                    <label for="inputPassword" className="col-auto">
                        <h3>
                            <span>Pesan :</span>
                        </h3>
                    </label>
                    <div className="col-sm-10">
                        <textarea
                            type="text"
                            className="form-control shadow"
                            id="inputPassword"
                            style={{
                                width: "110%",
                                height: "150px",
                            }}
                            onChange={(e) => setPesan(e.target.value)}
                        ></textarea>
                    </div>
                </div>
                <button
                    onClick={handleContact}
                    type="submit"
                    className="btn btn-primary col-md-4 my-3 align-self-center"
                >
                    Kirim Pesan
                </button>
            </div>
        </div>
    );
}
