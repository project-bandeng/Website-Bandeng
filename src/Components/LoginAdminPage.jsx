import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../Image/LogoLogin.png";
import axios from "../service/axios";
import Swal from "sweetalert2";
import "../login.css";
import { Ring } from "@uiball/loaders";

const LoginAdminPage = () => {
  document.title = "Login Admin";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const [isLoading, setLoading] = useState(false);

  const [error, setError] = useState("");

  function handleLogin() {
    setLoading(true);
    let dataLogin = { email, password };

    axios
      .post("/api/admin/login", dataLogin)
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
        Swal.fire({
          icon: 'success',
          title: 'Good job!',
          text: response.data.response,
        });
        setLoading(false);
        navigate("/user");
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
        if(error.response.status === 400) {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: error.data.error,
          });
        }
      });
  }

  return (
    <div className="login-container">
      <div className="login-content">
        <div className="logo-container">
          <img src={Logo} alt="Logo D'Bandeng" className="img-fluid" />
        </div>
        <div className="form-container">
          <h1 className="h1 text-white fw-bolder text-center my-5">
            LOGIN ADMIN
          </h1>
          <Form onSubmit={handleLogin} className="">
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
            <div className="d-flex justify-content-center mt-5">
              <Link>
                <Button
                  variant="light"
                  type="submit"
                  className="rounded-pill fw-bold text-primary"
                  style={{ width: "120px" }}
                  onClick={handleLogin}
                >
                  {isLoading ? (
                    <Ring size={20} lineWeight={5} speed={2} color="black" />
                  ) : (
                    "Login"
                  )}
                </Button>
              </Link>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default LoginAdminPage;
