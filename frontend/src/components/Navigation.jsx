import React from "react";
import "../index.css";
import { Container, Navbar } from "react-bootstrap";

function Nav() {
  // Retrieve the username from localStorage
  const username = localStorage.getItem("name");

  return (
    <Navbar sticky="top" bg="dark" data-bs-theme="dark">
      <Container>
        <Navbar.Brand href="/">Filtering</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
            {username ? `Signed in as: ${username}` : "Not signed in"}
          </Navbar.Text>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Nav;
