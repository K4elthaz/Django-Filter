import { useState, useEffect } from "react";
import "../index.css";
import Nav from "./Navigation";
import { Container, Form, Row, Col, Card, Button } from "react-bootstrap";
import Chip from "@mui/material-next/Chip";
import Paper from "@mui/material/Paper";
import ArticleService from "../API/Article";
import { Link } from "react-router-dom";

function LandingPage() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await ArticleService.getArticles();
        setArticles(response);
      } catch (error) {
        console.error("Error fetching articles:", error);
      }
    };

    fetchArticles();
  }, []);

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
            {articles.map((article) => (
              <Link
                to={`${article.link}`}
                key={article.id}
                style={{ textDecoration: "none" }}
              >
                <Card
                  style={{
                    width: "18rem",
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                    marginRight: "10px",
                  }}
                >
                  {article.thumbnail && (
                    <Card.Img
                      variant="top"
                      src={article.thumbnail}
                      alt={article.title}
                      style={{ height: "200px", objectFit: "cover" }}
                    />
                  )}
                  <Card.Body>
                    <Card.Title>{article.title}</Card.Title>
                    <Card.Text>{article.description}</Card.Text>
                    <Card.Text>
                      <p>
                        <b>Views:</b> <span>{article.views}</span>
                      </p>
                    </Card.Text>
                    <Card.Text>
                      {new Date(article.date).toLocaleString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                        hour: "numeric",
                        minute: "numeric",
                      })}
                    </Card.Text>
                    <Card.Text>{article.username}</Card.Text>
                    <Card.Text>{article.category}</Card.Text>
                  </Card.Body>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </Container>
    </div>
  );
}

export default LandingPage;
