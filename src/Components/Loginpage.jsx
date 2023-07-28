import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../Image/LogoLogin.png';
import axios from 'axios';
import Forgotpasspage from './Forgotpass';


const Loginpage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  function handleLogin() {
    let dataLogin = {email, password};

    axios.post('http://localhost:8000/api/v2/login', dataLogin)
    .then(function (response) {
      localStorage.setItem('Login-info', JSON.stringify(dataLogin));
      // navigate("/");
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
  };

  return (
    <div className="login-container container-fluid">
      <div className="row justify-content-center align-items-center mx-5" style={{height: '100vh'}}>
        <div className='col-md-5 bg-white d-flex justify-content-center rounded-start' style={{padding: '2.0rem'}}>
          <img src={Logo} alt="Logo D'Bandeng" className='img-fluid'/>
        </div>
        <div className="col-md-5 bg-primary p-4 rounded-end">
          <h1 className='h1 text-white fw-bolder text-center my-5'>LOGIN</h1>
          <Form onSubmit={handleLogin} className='px-5'>
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
            <Link to="" className='text-white'>Lupa Password?</Link>
            </div>
            <div className='d-flex justify-content-center'>
              <Link>
                <Button variant="light" type="submit" className='rounded-pill fw-bold text-primary' style={{width: '120px'}} onClick={handleLogin}>
                Login
                </Button>
              </Link>
            </div>
          </Form>
          <div className='mt-4 d-flex justify-content-center'>
            <p className='text-white'>Masih Belum Punya Akun? <Link className='text-white'>Sign Up</Link></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loginpage;
