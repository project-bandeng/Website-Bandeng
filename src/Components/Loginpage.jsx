import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../Image/LogoLogin.png";
import axios from "axios";
import Swal from "sweetalert2";

const Loginpage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const [error, setError] = useState("");

    function handleLogin() {
        let dataLogin = { email, password };

        axios
            .post("/api/v2/login", dataLogin)
            .then(function (response) {
                console.log(response);
                const token = response.data.token.token;
                const dataUser = {
                    email: response.data.email,
                    id: response.data.id,
                };
                localStorage.setItem("data-user", JSON.stringify(dataUser));
                localStorage.setItem("auth-token", token);
                console.log("Berhasil Login");
                // navigate("/");
            })
            .catch((error) => {
                console.log(error);
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Terjadi Kesalahan Lain.",
                });
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
                    <h1 className="h1 text-white fw-bolder text-center my-5">
                        LOGIN
                    </h1>
                    <Form onSubmit={handleLogin} className="px-5">
                        <Form.Group controlId="formEmail">
                            <Form.Control
                                type="email"
                                placeholder="Alamat Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="rounded-pill mb-4 p-2 form-login"
                            />
                        </Form.Group>

                        <Form.Group controlId="formPassword">
                            <Form.Control
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="rounded-pill mb-2 p-2 form-login"
                            />
                        </Form.Group>
                        <div className="d-flex justify-content-end mb-3 mx-2">
                            <Link to="/login/forgot-password" className="text-white">
                                Lupa Password?
                            </Link>
                        </div>
                        <div className="d-flex justify-content-center">
                            <Link>
                                <Button
                                    variant="light"
                                    type="submit"
                                    className="rounded-pill fw-bold text-primary"
                                    style={{ width: "120px" }}
                                    onClick={handleLogin}
                                >
                                    Login
                                </Button>
                            </Link>
                        </div>
                    </Form>
                    <div className="mt-4 d-flex justify-content-center">
                        <p className="text-white">
                            Masih Belum Punya Akun?{" "}
                            <Link to="/register" className="text-white">Sign Up</Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Loginpage;
