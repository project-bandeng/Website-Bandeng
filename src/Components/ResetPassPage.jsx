import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import Logo from "../Image/LogoLogin.png";
import axios from "../service/axios";
import forgotIcon from "../Image/forgot.png";
import Swal from "sweetalert2";

const ResetPassPage = () => {
    document.title = "Reset Password";
    const [password, setPassword] = useState("");
    const [conPassword, setConPassword] = useState("");
    const [params, setParams] = useSearchParams();
    const navigate = useNavigate();

    useEffect(() => {
        let tokenReqPassReset = params.get("token");
        console.log(tokenReqPassReset);
    }, []);

    function handleRPass(token) {
        let tokenReqPassReset = params.get("token");
        let dataRpass = {
            resetPassToken: tokenReqPassReset,
            password,
            confirm_password: conPassword,
        };

        axios
            .post("/api/v2/login/reset-password", dataRpass)
            .then(function (response) {
                navigate("/login");
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
        <div className="login-container d-flex">
        <div className="login-content">
          <div className="logo-container">
            <img src={Logo} alt="Logo D'Bandeng" className="img-fluid" />
          </div>
                <div className="form-container">
                    <img src={forgotIcon} alt="ForgotPass" />
                    <h1 className="h1 text-white fw-bolder text-center">
                        Reset Password
                    </h1>
                    <p className="text-white">
                        Masukkan email yang anda daftarkan dan kami akan
                        mengirimkan instruksi untuk mengatur ulang kata sandi.
                    </p>
                    <Form onSubmit={handleRPass} className="px-5">
                        <Form.Group controlId="formEmail">
                            <Form.Control
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="rounded-pill mb-4 p-2 form-login"
                            />
                        </Form.Group>
                        <Form.Group controlId="formEmail">
                            <Form.Control
                                type="password"
                                placeholder="Confirm Password"
                                value={conPassword}
                                onChange={(e) => setConPassword(e.target.value)}
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
                                    onClick={handleRPass}
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

export default ResetPassPage;
