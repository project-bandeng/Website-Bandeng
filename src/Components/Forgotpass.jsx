import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../Image/LogoLogin.png";
import axios from "../service/axios";
import forgotIcon from "../Image/forgot.png";
import Swal from "sweetalert2";

const Forgotpasspage = () => {
    document.title = 'Forgot Password';
    const [email, setEmail] = useState("");

    function handleFPass() {
        let dataFpass = { email };

        axios
            .post("/api/v2/login/forgot-password", dataFpass)
            .then(function (response) {
                // localStorage.setItem('Forgot-Pass-info', JSON.stringify(dataFpass));
                // navigate("/");
                console.log(response);
            })
            .catch(function (error) {
                if (error.response.status === 400) {
                    Swal.fire({
                        icon: "error",
                        title: "Oops...",
                        text: "Terjadi Kesalahan Lain.",
                    });
                }
            });
    }

    return (
        <div className="login-container container-fluid">
            <div
                className="row justify-content-center align-items-center mx-5"
                style={{ height: "100vh" }}
            >
                <div
                    className="col-md-5 bg-white d-flex justify-content-center rounded-start"
                    style={{ padding: "2.0rem" }}
                >
                    <img
                        src={Logo}
                        alt="Logo D'Bandeng"
                        className="img-fluid"
                    />
                </div>
                <div className="col-md-5 bg-primary p-4 rounded-end">
                    <img src={forgotIcon} alt="ForgotPass" />
                    <h1 className="h1 text-white fw-bolder text-center">
                        Reset Password
                    </h1>
                    <p className="text-white">
                        Masukkan email yang anda daftarkan dan kami akan
                        mengirimkan instruksi untuk mengatur ulang kata sandi.
                    </p>
                    <Form onSubmit={handleFPass} className="px-5">
                        <Form.Group controlId="formEmail">
                            <Form.Control
                                type="email"
                                placeholder="Alamat Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="rounded-pill mb-4 p-2 form-login"
                            />
                        </Form.Group>

                        <div className="d-flex justify-content-center">
                            <Link>
                                <Button
                                    variant="light"
                                    type="submit"
                                    className="rounded-pill fw-bold text-primary"
                                    style={{ width: "180px" }}
                                    onClick={handleFPass}
                                >
                                    Reset Password
                                </Button>
                            </Link>
                        </div>
                    </Form>
                </div>
            </div>
        </div>
    );
};

export default Forgotpasspage;
