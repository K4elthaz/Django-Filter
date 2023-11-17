import { useState, useEffect } from "react";
import "../index.css";
import Nav from "./Navigation";
import { Container, Form, Row, Col, Card, Button } from "react-bootstrap";
import Chip from "@mui/material-next/Chip";
import Paper from "@mui/material/Paper";
import ArticleService from "../API/Article";
import { Link } from "react-router-dom";
import CategoryService from "../API/Category";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import SortIcon from "@mui/icons-material/Sort";
import Tooltip from "@mui/material/Tooltip";
import Pagination from "./Pagination";

function LandingPage() {
  const [articles, setArticles] = useState([]);
  const [category, setCategory] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isSort, setIsSort] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestedSearchTerms, setSuggestedSearchTerms] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const cardsPerPage = 12;

  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const filteredArticles = articles
    .filter((article) => {
      const categoryFilter =
        !selectedCategory || article.category.includes(selectedCategory.name);
      const searchFilter =
        !searchQuery ||
        article.title.toLowerCase().includes(searchQuery.toLowerCase());
      return categoryFilter && searchFilter;
    })
    .sort((a, b) => (isSort ? b.views - a.views : a.views - b.views));

  const currentCards = filteredArticles.slice(
    indexOfFirstCard,
    indexOfLastCard
  );

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

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

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const response = await CategoryService.getCategory();
        setCategory(response);
      } catch (error) {
        console.error("Error fetching articles:", error);
      }
    };

    fetchCategory();
  }, []);

  useEffect(() => {
    const topFiveArticles = articles
      .sort((a, b) => b.views - a.views)
      .slice(0, 5);

    const terms = topFiveArticles.map((article) => article.title);

    setSuggestedSearchTerms(terms);
  }, [articles]);

  const handleDropdownToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setIsOpen(false);
  };

  const handleSort = () => {
    setIsSort(!isSort);
    console.log("Clicked");
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setSelectedCategory(null);
  };

  const handleChipClick = (term) => {
    setSearchQuery(term);
    setSelectedCategory(null);
  };

  const handleChipDelete = (index) => {
    const updatedTerms = [...suggestedSearchTerms];
    updatedTerms.splice(index, 1);
    setSuggestedSearchTerms(updatedTerms);
  };

  return (
    <div>
      <Nav />
      <Container>
        <div className=" my-5 py-4">
          <Form onSubmit={handleSearchSubmit}>
            <Form.Control
              size="lg"
              type="search"
              placeholder="Search..."
              style={{
                width: "100%",
                maxWidth: "300px",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
              }}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </Form>
          <Row className="mt-3 ">
            <Col>
              {suggestedSearchTerms.map((term, index) => (
                <Chip
                  className="me-2"
                  key={index}
                  style={{
                    marginTop: "5px",
                    cursor: "pointer",
                  }}
                  color="secondary"
                  size="small"
                  variant="elevated"
                  label={term}
                  onClick={() => handleChipClick(term)}
                  onDelete={() => handleChipDelete(index)}
                />
              ))}
            </Col>
          </Row>
          <Row>
            <Col className="d-flex align-items-center mt-5">
              <div
                className="text-center p-1 me-2"
                style={{
                  width: 200,
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                  backgroundColor: "white",
                  borderRadius: "7px",
                  position: "relative",
                }}
              >
                <div
                  onClick={handleDropdownToggle}
                  style={{ cursor: "pointer" }}
                >
                  <b>
                    {selectedCategory
                      ? selectedCategory.name
                      : "Select Category"}
                  </b>
                  {isOpen ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
                </div>
                {isOpen && (
                  <div
                    style={{
                      marginTop: 5,
                      position: "absolute",
                      top: "100%",
                      left: 0,
                      width: "100%",
                      zIndex: 1000,
                      backgroundColor: "white",
                    }}
                  >
                    <div
                      className="p-1"
                      style={{
                        cursor: "pointer",
                        borderBottom: "1px solid #ccc",
                      }}
                      onClick={() => handleCategorySelect(null)}
                    >
                      <b>Show All</b>
                    </div>
                    {category.map((categoryItem, index) => (
                      <div
                        key={index}
                        className="p-1"
                        style={{
                          cursor: "pointer",
                          borderBottom: "1px solid #ccc",
                        }}
                        onClick={() => handleCategorySelect(categoryItem)}
                      >
                        <b>{categoryItem.name}</b>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <Tooltip title="Filter by Views" arrow>
                <Paper
                  className="p-1 text-center"
                  onClick={handleSort}
                  style={{
                    width: 50,
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                    backgroundColor: isSort ? "#0096FF" : "white",
                    borderRadius: "7px",
                    position: "relative",
                    cursor: "pointer",
                    transition: "background-color 0.3s ease",
                  }}
                >
                  <SortIcon
                    style={{
                      color: isSort ? "white" : "black",
                    }}
                  />
                </Paper>
              </Tooltip>
            </Col>
          </Row>

          <div
            className="mt-5"
            style={{
              display: "flex",
              flexWrap: "wrap",
            }}
          >
            {currentCards.map((article) => (
              <Link
                to={`${article.link}`}
                key={article.id}
                style={{ textDecoration: "none" }}
              >
                <Tooltip arrow followCursor title={`${article.link}`}>
                  <Card
                    style={{
                      width: "18rem",
                      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                      marginRight: "10px",
                      marginBottom: "10px",
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
                </Tooltip>
              </Link>
            ))}
          </div>
          <div className="mt-3">
            <Pagination
              cardsPerPage={cardsPerPage}
              totalCards={articles.length}
              paginate={paginate}
            />
          </div>
        </div>
      </Container>
    </div>
  );
}

export default LandingPage;
