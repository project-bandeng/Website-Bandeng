import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Logo from '../Image/LogoLogin.png';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import "../App.css";

const Registerpage = () => {
  const [username, setUsername] = useState('');
  const [alamat, setAlamat] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function handleRegister() {
    hello();
    // You can handle the login logic here
    let dataRegister = {'namaMitra':username, 'alamatMitra':alamat, email, password};
    console.log(dataRegister);
    let result = await fetch("http://localhost:8000/api/register", {
      method: "POST",
      body: JSON.stringify(dataRegister),
      Headers: {
        "content-type" : 'application/json',
        Accept : 'application/json',
      }
    })
    result = await result.json();
    console.log("Result", result);
  };

  async function hello() {
    let result = await fetch("http://localhost:8000/api/generatecrsf", {
      Headers: {
        "content-type" : 'application/json',
        Accept : 'application/json',
      }
    })
    result = await result.json();
    console.log("Result", result);
  }

  const [selectedDate, setSelectedDate] = useState(null);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  return (
    <div className="login-container container-fluid">
      <div className="row justify-content-center align-items-center mx-5" style={{height: '100vh'}}>
        <div className='col-md-5 bg-white d-flex justify-content-center rounded-start' style={{padding: '2.6rem'}}>
          <img src={Logo} alt="Logo D'Bandeng" className='img-fluid'/>
        </div>
        <div className="col-md-5 bg-primary p-4 rounded-end">
          <h1 className='h1 text-white fw-bolder text-center mb-3'>REGISTER</h1>
          <Form className='px-5'>
          <Form.Group controlId="formNama">
              <Form.Control
                type="text"
                placeholder="Nama Lengkap"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="rounded-pill mb-4 p-2 form-register"
              />
            </Form.Group>
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
            />
            </Form.Group>
            <Form.Group controlId="formAlamat">
              <Form.Control
                type="text"
                placeholder="Alamat Usaha"
                value={alamat}
                onChange={(e) => setAlamat(e.target.value)}
                className="rounded-pill mb-4 p-2 form-register"
              />
            </Form.Group>
            <Form.Group controlId="formEmail">
              <Form.Control
                type="email"
                placeholder="Alamat Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="rounded-pill mb-4 p-2 form-register"
              />
            </Form.Group>

            <Form.Group controlId="formPassword">
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="rounded-pill mb-2 p-2 form-register"
              />
            </Form.Group>
            <div className='d-flex justify-content-center mt-3'>
              <Link>
                <Button onClick={handleRegister} variant="light" type="submit" className='rounded-pill fw-bold text-primary' style={{width: '140px'}}>
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