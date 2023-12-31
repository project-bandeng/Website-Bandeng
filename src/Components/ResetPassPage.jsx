import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import Logo from "../Image/LogoLogin.png";
import axios from "../service/axios";
import forgotIcon from "../Image/forgot.png";
import Swal from "sweetalert2";
import "../login.css"
import InputPasswordComponent from "./InputPasswordComponent";

import { Ring } from '@uiball/loaders';

const ResetPassPage = () => {
    document.title = "Reset Password";
    const [password, setPassword] = useState("");
    const [conPassword, setConPassword] = useState("");
    const [params, setParams] = useSearchParams();
    const navigate = useNavigate();
    const [isLoading, setLoading] = useState(false);

    useEffect(() => {
        let tokenReqPassReset = params.get("token");
        console.log(tokenReqPassReset);
    }, []);

    function handleRPass(token) {
        setLoading(true);
        let tokenReqPassReset = params.get("token");
        let dataRpass = {
            resetPassToken: tokenReqPassReset,
            password,
            confirm_password: conPassword,
        };

        axios
            .post("/api/v2/login/reset-password", dataRpass)
            .then(function (response) {
                setLoading(false);
                navigate("/login");
                Swal.fire({
                    icon: "success",
                    title: "Good Job",
                    text: response.data.response,
                });
            })
            .catch(function (error) {
                setLoading(false);
                if (error.response.status === 500) {
                    Swal.fire({
                        icon: "error",
                        title: "Oops...",
                        text: error.data.error,
                    });
                }
            });
    }

    return (
        <div className="login-container">
        <div className="login-content col-10 col-md-7">
            <div className="logo-container">
                <img src={Logo} alt="Logo D'Bandeng" className="img-fluid" />
            </div>
                <div className="form-container">
                    <img src={forgotIcon} alt="ForgotPass" className="forgot pb-4" />
                    <h1 className="h1 text-white fw-bolder text-center">
                        Reset Password
                    </h1>
                    <p className="text-white">
                        Masukkan email yang anda daftarkan dan kami akan
                        mengirimkan instruksi untuk mengatur ulang kata sandi.
                    </p>
                    <Form onSubmit={handleRPass} className="">
                        <Form.Group controlId="formEmail">
                            <InputPasswordComponent
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="rounded-pill mb-4 p-2 form-login"
                            />
                        </Form.Group>
                        <Form.Group controlId="formEmail">
                            <InputPasswordComponent
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
                                    {isLoading ? <Ring size={20} lineWeight={5} speed={2} color="black" /> : 'Reset Password'}
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
