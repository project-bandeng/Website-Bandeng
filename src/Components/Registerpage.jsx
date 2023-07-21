import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Logo from '../Image/LogoLogin.png';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import "../App.css"

const Registerpage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = (e) => {
    e.preventDefault();
    // You can handle the login logic here
    console.log('Username:', username);
    console.log('Password:', password);
  };

  const [selectedDate, setSelectedDate] = useState(null);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  return (
    <div className="login-container container-fluid">
      <div className="row justify-content-center align-items-center mx-5" style={{height: '100vh'}}>
        <div className='col-md-5 bg-white d-flex justify-content-center rounded-start' style={{padding: '2.0rem'}}>
          <img src={Logo} alt="Logo D'Bandeng" className='img-fluid'/>
        </div>
        <div className="col-md-5 bg-primary p-4 rounded-end">
          <h1 className='h1 text-white fw-bolder text-center mb-3'>REGISTER</h1>
          <Form onSubmit={handleRegister} className='px-5'>
          <Form.Group controlId="formNama">
              <Form.Control
                type="text"
                placeholder="Nama Lengkap"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="rounded-pill mb-4 p-2 form-email"
              />
            </Form.Group>
            <Form.Group controlId="formNama">
            <DatePicker
            className='rounded-pill mb-4 p-2 form-control'
            selected={selectedDate}
            onChange={handleDateChange}
            placeholderText="Tanggal Lahir"
            dateFormat="dd/MM/yyyy"
            isClearable
            />
            </Form.Group>
            <Form.Group controlId="formNama">
              <Form.Control
                type="text"
                placeholder="Alamat Usaha"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="rounded-pill mb-4 p-2 form-email"
              />
            </Form.Group>
            <Form.Group controlId="formEmail">
              <Form.Control
                type="email"
                placeholder="Alamat Email"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="rounded-pill mb-4 p-2 form-email"
              />
            </Form.Group>

            <Form.Group controlId="formPassword">
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="rounded-pill mb-2 p-2 form-password"
              />
            </Form.Group>
            <div className='d-flex justify-content-center mt-3'>
              <Link>
                <Button variant="light" type="submit" className='rounded-pill fw-bold text-primary' style={{width: '140px'}}>
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