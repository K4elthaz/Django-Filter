import React, { useState } from "react";
import { Card, Form, Button } from "react-bootstrap";
import "../index.css";
import { Link } from "react-router-dom";
import ApiService from "../API/userAPI";

function RegisterPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    // Check if passwords match
    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }

    try {
      // Call your registration API endpoint here using ApiService
      await ApiService.register(username, password);

      // Registration successful, you can redirect the user to the login page or any other page
      console.log("Registration successful");

      // Redirect to the login page
      window.location.href = "/"; // You can use a more structured way to navigate
    } catch (error) {
      // Handle registration error
      setErrorMessage("Registration failed. Please try again.");
      console.error("Registration error:", error);
    }
  };

  return (
    <div className="centered">
      <Card
        className="d-flex justify-content-center align-items-center"
        style={{ width: "20rem" }}
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
