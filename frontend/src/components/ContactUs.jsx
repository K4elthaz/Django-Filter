import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Nav from "./Navigation";
function ContactUs() {
  return (
    <div>
      <Nav />
      <Container>
        <h1 className="mt-5">Contact Us</h1>
        <Row>
          <Col md={6}>
            <p>
              You can reach us at{" "}
              <a href="contentrsrchfiltering@gmail.com"></a> or
              call us at <a href="tel:+11234567890">+1-123-456-7890</a>.
            </p>
          </Col>
          <Col md={6}>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default ContactUs;
