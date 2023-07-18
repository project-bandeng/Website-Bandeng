import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';


const Loginpage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    // You can handle the login logic here
    console.log('Username:', username);
    console.log('Password:', password);
  };

  return (
    <div className="login-container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <Form onSubmit={handleLogin}>
            <Form.Group controlId="formUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>

            <Button variant="primary" type="submit">
              Login
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Loginpage;
