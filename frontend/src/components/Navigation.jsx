import React, { useState } from "react";
import {
  Container,
  Navbar,
  OverlayTrigger,
  Popover,
  Button,
} from "react-bootstrap";

function Nav() {
  const username = localStorage.getItem("name");
  const [showPopover, setShowPopover] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("name");
    window.location.href = "/";
  };

  const popover = (
    <Popover id="popover-basic" style={{ cursor: "pointer" }}>
      <Popover.Header as="h3">User Information</Popover.Header>
      <Popover.Body>
        {username && (
          <Button variant="danger" onClick={handleLogout}>
            Logout
          </Button>
        )}
      </Popover.Body>
    </Popover>
  );

  return (
    <Navbar sticky="top" bg="dark" data-bs-theme="dark">
      <Container>
        <Navbar.Brand href="/">Filtering</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <OverlayTrigger
            trigger="click"
            placement="bottom"
            show={showPopover}
            onToggle={(show) => setShowPopover(show)}
            overlay={popover}
          >
            <Navbar.Text style={{ cursor: "pointer" }}>
              {username ? `Signed in as: ${username}` : "Not signed in"}
            </Navbar.Text>
          </OverlayTrigger>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Nav;
