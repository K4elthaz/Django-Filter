import React from "react";
import { Card, Form, Button } from "react-bootstrap";
import "../index.css";
import { Link } from "react-router-dom";

function LoginPage() {
  return (
    <div className="centered">
      <Card
        className="d-flex justify-content-center align-items-center"
        style={{ width: "20rem" }}
      >
        <Card.Body>
          <Form className="d-flex flex-column">
            <Card.Title className="text-center my-4">
              <b>Login</b>
            </Card.Title>
            <Form.Group className="mb-3" controlId="username">
              <Form.Control type="text" placeholder="Username" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="password">
              <Form.Control type="password" placeholder="Password" />
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
        </Card.Body>
      </Card>
    </div>
  );
}

export default LoginPage;
