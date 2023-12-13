import React, { useState } from "react";
import {
  Container,
  Navbar,
  OverlayTrigger,
  Popover,
  Button,
  Nav,
} from "react-bootstrap";
import { toast } from "react-toastify";
import { useNavigate, Link } from "react-router-dom";
import FilterAltIcon from "@mui/icons-material/FilterAlt";

function MyNav() {
  const username = localStorage.getItem("name");
  const [showPopover, setShowPopover] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    toast.success(`Thank you ${username} has been logged out.`);
    localStorage.clear();

    navigate("/");
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
    <Navbar sticky="top" bg="danger" variant="dark">
      <Container>
        <Navbar.Brand className="d-flex align-items-center" href="/home">
          <FilterAltIcon />
          Filtering
        </Navbar.Brand>
        <Nav>
            <Nav.Link href="/about-us">About Us</Nav.Link>
            <Nav.Link href="/contact-us">Contact Us</Nav.Link>
            <Nav.Link href="/">Blog</Nav.Link>
          </Nav>
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
              {username ? (
                `Signed in as: ${username}`
              ) : (
                <Link to="/login">Welcome Guest</Link>
              )}
            </Navbar.Text>
          </OverlayTrigger>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default MyNav;
