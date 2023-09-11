import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../Image/LogoLogin.png";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Swal from "sweetalert2";
import "../App.css";
import axios from "../service/axios";
import "../register.css"

const Registerpage = () => {
    document.title = "Register Admin";
    const [username, setUsername] = useState("");
    const [alamat, setAlamat] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [notelp, setNotelp] = useState("");
    const navigate = useNavigate();

    function getErrorData(error) {}

    function handleRegister() {
        let dataRegister = {
            namaMitra: username,
            alamatMitra: alamat,
            no_tlp: notelp,
            email,
        };

        axios
            .post("/api/v1/register", dataRegister)
            .then(function (response) {
                Swal.fire({
                    icon: "success",
                    title: "Good job!",
                    text: response.data,
                });
                navigate("/login");
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

    // function convertDate(date){
    //   let yy = date.getFullYear()
    //   let mm = date.getMonth() + 1; // Months start at 0!
    //   let dd = date.getDate();

    //   mm = mm < 10 ? ("0" + mm) : mm;

    //   return yy + "-" + mm + "-" + dd}

    // const handleDateChange = (date) => {
    //   console.log(date);
    //   setSelectedDate(date);
    // };

    return (
                    <div className="login-container">
                    <div className="login-content">
                    <div className="logo-container">
                        <img src={Logo} alt="Logo D'Bandeng" className="img-fluid" />
                    </div>
                    <div className="form-container">
                    <h1 className="h1 text-white fw-bolder text-center mb-3">
                        REGISTER
                    </h1>
                    <Form className="">
                        <Form.Group controlId="formNama">
                            <Form.Control
                                type="text"
                                placeholder="Nama Mitra"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="rounded-pill mb-4 p-2 form-register"
                                required
                            />
                            {/* </Form.Group>
            <Form.Group controlId="formTglLahir">
            <DatePicker
            className='rounded-pill mb-4 p-2 form-control form-register'
            selected={selectedDate}
            onChange={handleDateChange}
            placeholderText="Tanggal Lahir"
            showYearDropdown
            yearDropdownItemNumber={20}
            scrollableYearDropdown
            dateFormat="dd/MM/yyyy"
            required
            /> */}
                        </Form.Group>
                        <Form.Group controlId="formAlamat">
                            <Form.Control
                                type="text"
                                placeholder="Alamat Usaha"
                                value={alamat}
                                onChange={(e) => setAlamat(e.target.value)}
                                className="rounded-pill mb-4 p-2 form-register"
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="NoTelp">
                            <Form.Control
                                type="text"
                                placeholder="No Telepon"
                                value={notelp}
                                onChange={(e) => setNotelp(e.target.value)}
                                className="rounded-pill mb-4 p-2 form-register"
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="formEmail">
                            <Form.Control
                                type="email"
                                placeholder="Alamat Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="rounded-pill mb-4 p-2 form-register"
                                required
                            />
                        </Form.Group>
{/* 
                        <Form.Group controlId="formPassword">
                            <Form.Control
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="rounded-pill mb-2 p-2 form-register"
                                required
                            />
                        </Form.Group> */}
                        <div className="d-flex justify-content-center mt-3">
                            <Link>
                                <Button
                                    onClick={handleRegister}
                                    variant="light"
                                    type="submit"
                                    className="rounded-pill fw-bold text-primary"
                                    style={{ width: "140px" }}
                                >
                                    Register
                                </Button>
                            </Link>
                        </div>
                    </Form>
                </div>
            </div>
        </div>
    );
};

export default Registerpage;
