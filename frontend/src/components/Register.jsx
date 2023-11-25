import React, { useState } from "react";
import { Card, Form, Button } from "react-bootstrap";
import "../index.css";
import { Link, useNavigate } from "react-router-dom";
import ApiService from "../API/userAPI";
import { toast } from "react-toastify";

function RegisterPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    // Check if passwords match
    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    try {
      await ApiService.register(username, password);

      console.log("Registration successful");
      toast.success(`Registration successful. Welcome, ${username}!`);

      navigate("/");
    } catch (error) {
      toast.error("Registration failed. Please try again.");
      console.error("Registration error:", error);
    }
  };

  return (
    <div className="centered">
      <Card
        className="d-flex justify-content-center align-items-center"
        style={{ width: "20rem", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)" }}
      >
        <Card.Body>
          <Form className="d-flex flex-column" onSubmit={handleRegister}>
            <Card.Title className="text-center my-4">
              <b>Register</b>
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
            <Form.Group className="mb-3" controlId="confirm_password">
              <Form.Control
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </Form.Group>
            <Button variant="outline-success" type="submit">
              Register
            </Button>
          </Form>
          {errorMessage && (
            <div className="text-danger mt-3">
              <p>{errorMessage}</p>
            </div>
          )}
          <div className="text-muted mt-3">
            Already have an account? <Link to="/">Login</Link>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
}

export default RegisterPage;
