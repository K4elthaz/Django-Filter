import React, { useState } from "react";
import { Card, Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import ApiService from "../API/userAPI";
import { useNavigate } from "react-router-dom";
import "../index.css";
function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const accessToken = await ApiService.login(username, password);
      const user_id = localStorage.getItem('user_id');
      const name = localStorage.getItem('name');
      localStorage.setItem('access_token', accessToken);
      localStorage.setItem('user_id', user_id);
      localStorage.setItem('name', username);

      console.log('Logged in successfully with access token:', accessToken);
      console.log('User ID:', user_id);
      console.log('Name:', username);

      // Redirect to the "/home" route
      navigate('/home');
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setErrorMessage('Invalid username or password.');
      } else if (error.response && error.response.status === 400) {
        setErrorMessage('Please input the required fields.');
      } else {
        setErrorMessage('An error occurred while logging in. Please try again later.');
      }

      console.error('Login error:', error);
    }
  };

  return (
    <div className="centered">
      <Card
        className="d-flex justify-content-center align-items-center"
        style={{ width: "20rem" }}
      >
        <Card.Body>
          <Form className="d-flex flex-column" onSubmit={handleLogin}>
            <Card.Title className="text-center my-4">
              <b>Login</b>
            </Card.Title>
            <Form.Group className="mb-3" controlId="username">
              <Form.Control
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="password">
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>
            <Button variant="outline-success" type="submit">
              Login
            </Button>
          </Form>
          <div className="text-muted mt-3">
            <p>
              Don't have an account? <Link to="/Register">Register</Link>
            </p>
          </div>
          {errorMessage && (
            <div className="text-danger mt-3">
              <p>{errorMessage}</p>
            </div>
          )}
        </Card.Body>
      </Card>
    </div>
  );
}

export default LoginPage;
