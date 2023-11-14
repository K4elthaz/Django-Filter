import React from "react";
import "../index.css";
import Nav from "./Navigation";
import { Container, Form, Row, Col, Card, Button } from "react-bootstrap";
import Chip from "@mui/material-next/Chip";
import Paper from "@mui/material/Paper";
import Rating from "@mui/material/Rating";

function LandingPage() {
  const handleClick = () => {
    console.info("You clicked the Chip.");
  };

  const handleDelete = () => {
    console.info("You clicked the delete icon.");
  };

  return (
    <div>
      <Nav />
      <Container>
        <div className=" my-5 py-4">
          <Form.Control
            size="lg"
            type="text"
            placeholder="Search..."
            style={{
              width: "100%",
              maxWidth: "300px",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            }}
          />
          <Row className="mt-3">
            <Col>
              <Chip
                style={{ marginTop: "5px", marginRight: "5px" }}
                color="secondary"
                size="small"
                variant="elevated"
                label="category"
                onClick={handleClick}
                onDelete={handleDelete}
              />
              <Chip
                style={{ marginTop: "5px", marginRight: "5px" }}
                color="secondary"
                size="small"
                variant="elevated"
                label="date"
                onClick={handleClick}
                onDelete={handleDelete}
              />
              <Chip
                style={{ marginTop: "5px", marginRight: "5px" }}
                color="secondary"
                size="small"
                variant="elevated"
                label="Author"
                onClick={handleClick}
                onDelete={handleDelete}
              />
              <Chip
                style={{ marginTop: "5px" }}
                color="secondary"
                size="small"
                variant="elevated"
                label="rate"
                onClick={handleClick}
                onDelete={handleDelete}
              />
            </Col>
          </Row>
          <div
            className="mt-5 text-center"
            style={{ width: 150, boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)" }}
          >
            <Paper className="p-1" square={false}>
              <b>Category 1</b>
            </Paper>
          </div>

          <div className="mt-5" style={{ display: "flex" }}>
            <Card
              style={{
                width: "18rem",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                marginRight: "10px",
              }}
            >
              <Card.Img
                variant="top"
                src="sample.png"
                style={{ height: "200px", objectFit: "cover" }}
              />
              <Card.Body>
                <Card.Title>Shikimori</Card.Title>
                <Card.Text>Sample Description</Card.Text>
                <Rating name="no-value" value={null} />
              </Card.Body>
            </Card>
            <Card
              style={{
                width: "18rem",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                marginRight: "10px",
              }}
            >
              <Card.Img
                variant="top"
                src="anot.png"
                style={{ height: "200px", objectFit: "cover" }}
              />
              <Card.Body>
                <Card.Title>Anot</Card.Title>
                <Card.Text>Sample Description</Card.Text>
                <Rating name="no-value" value={null} />
              </Card.Body>
            </Card>
          </div>
        </div>
      </Container>
    </div>
  );
}

export default LandingPage;
