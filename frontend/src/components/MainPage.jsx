import { useState, useEffect } from "react";
import "../index.css";
import { useNavigate, Link } from "react-router-dom";
import Nav from "./Navigation";
import { Container, Form, Row, Col, Card, Placeholder } from "react-bootstrap";
import Chip from "@mui/material-next/Chip";
import Paper from "@mui/material/Paper";
import ArticleService from "../API/Article";
import CategoryService from "../API/Category";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import SortIcon from "@mui/icons-material/Sort";
import Tooltip from "@mui/material/Tooltip";
import Pagination from "./Pagination";
import VisibilityIcon from "@mui/icons-material/Visibility";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import Rating from "@mui/material/Rating";

const CardPlaceholder = () => {
  return (
    <Card
      style={{
        width: "18rem",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        marginRight: "10px",
        marginBottom: "10px",
        height: "32rem",
      }}
    >
      <Card.Img variant="top" style={{ height: "200px", objectFit: "cover" }} />
      <Card.Body>
        <Placeholder as={Card.Title} animation="glow">
          <Placeholder xs={6} />
        </Placeholder>
        <Placeholder as={Card.Text} animation="glow">
          <Placeholder xs={7} /> <Placeholder xs={4} /> <Placeholder xs={4} />{" "}
          <Placeholder xs={6} /> <Placeholder xs={8} />
        </Placeholder>
      </Card.Body>
    </Card>
  );
};

function LandingPage() {
  // const navigate = useNavigate();
  // const isAuthenticated = localStorage.getItem("access_token") !== null;
  const [articles, setArticles] = useState([]);
  const [category, setCategory] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isSort, setIsSort] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestedSearchTerms, setSuggestedSearchTerms] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isDateSort, setIsDateSort] = useState(false);
  const [viewedArticles, setViewedArticles] = useState([]);
  const [userRatings, setUserRatings] = useState({});

  const cardsPerPage = 36;
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
    .sort((a, b) => (isSort ? b.views - a.views : a.views - b.views))
    .sort((a, b) => (isDateSort ? new Date(b.date) - new Date(a.date) : 0));

  const currentCards = filteredArticles.slice(
    indexOfFirstCard,
    indexOfLastCard
  );

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    // console.log("Checking authentication...");
    // const isAuthenticated = localStorage.getItem("access_token") !== null;
    // console.log("Is authenticated:", isAuthenticated);

    // if (!isAuthenticated) {
    //   console.log("User is not authenticated. Redirecting to login.");

    //   navigate("/");
    const fetchArticles = async () => {
      try {
        const response = await ArticleService.getArticles();
        const articlesWithDate = response.map((article) => ({
          ...article,
          date: new Date(article.date),
          averageRating: 0,
        }));
        setArticles(articlesWithDate);

        const storedVotes = JSON.parse(localStorage.getItem("userVotes")) || {};
        setUserRatings(storedVotes);

        articlesWithDate.forEach(async (article) => {
          try {
            const averageRatingResponse = await ArticleService.getAverageRating(
              article.id
            );
            setArticles((prevArticles) =>
              prevArticles.map((prevArticle) =>
                prevArticle.id === article.id
                  ? {
                      ...prevArticle,
                      averageRating: averageRatingResponse.average_rating,
                    }
                  : prevArticle
              )
            );
          } catch (error) {
            console.error(
              `Error fetching average rating for article ${article.id}:`,
              error
            );
          }
        });
      } catch (error) {
        console.error("Error fetching articles:", error);
      }
    };

    const fetchCategory = async () => {
      try {
        const response = await CategoryService.getCategory();
        setCategory(response);
      } catch (error) {
        console.error("Error fetching articles:", error);
      }
    };

    fetchArticles();
    fetchCategory();
    // }
  }, []);

  const handleRatingChange = async (articleId, newRating) => {
    const updatedVotes = {
      ...(JSON.parse(localStorage.getItem("userVotes")) || {}),
      [articleId]: newRating,
    };

    localStorage.setItem("userVotes", JSON.stringify(updatedVotes));

    setUserRatings((prevUserRatings) => ({
      ...prevUserRatings,
      [articleId]: newRating,
    }));

    try {
      await ArticleService.addRating(articleId, newRating);

      const averageRatingResponse = await ArticleService.getAverageRating(
        articleId
      );

      const updatedArticles = articles.map((article) =>
        article.id === articleId
          ? {
              ...article,
              averageRating: averageRatingResponse.average_rating,
            }
          : article
      );

      setArticles(updatedArticles);

      console.log(`Rating for article ${articleId} added successfully.`);
    } catch (error) {
      console.error("Error adding or fetching rating:", error);
    }
  };

  useEffect(() => {
    const topFiveArticles = articles
      .sort((a, b) => b.views - a.views)
      .slice(0, 5);

    const terms = topFiveArticles.map((article) => article.title);

    setSuggestedSearchTerms(terms);
  }, [articles]);

  const handleCardClick = (articleId) => {
    if (!viewedArticles.includes(articleId)) {
      setViewedArticles([...viewedArticles, articleId]);

      ArticleService.incrementViews(articleId)
        .then((response) => {
          const updatedArticles = articles.map((article) =>
            article.id === articleId
              ? { ...article, views: article.views + 1 }
              : article
          );
          setArticles(updatedArticles);

          console.log(`View count for article ${articleId} incremented.`);
        })
        .catch((error) => {
          console.error("Error incrementing view count:", error);
        });
    }
  };

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

  const handleDateSort = () => {
    setIsDateSort(!isDateSort);
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
                  className="me-2 mt-2"
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
            <Col className="d-flex justify-content-center align-items-center mt-5">
              <div
                className="text-center p-1 me-2"
                style={{
                  width: 300,
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
                  className="p-1 text-center me-2"
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
              <Tooltip title="Filter by Date" arrow>
                <Paper
                  className="p-1 text-center"
                  onClick={handleDateSort}
                  style={{
                    width: 50,
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                    backgroundColor: isDateSort ? "#0096FF" : "white",
                    borderRadius: "7px",
                    position: "relative",
                    cursor: "pointer",
                    transition: "background-color 0.3s ease",
                  }}
                >
                  <CalendarMonthIcon
                    style={{
                      color: isDateSort ? "white" : "black",
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
              justifyContent: "center",
            }}
          >
            {articles.length > 0
              ? currentCards.map((article) => (
                  <Link
                    to={`${article.link}`}
                    key={article.id}
                    style={{ textDecoration: "none" }}
                    target="_blank"
                  >
                    <Tooltip arrow followCursor title={`${article.link}`}>
                      <Card
                        style={{
                          width: "18rem",
                          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                          marginRight: "10px",
                          marginBottom: "10px",
                          height: "32rem",
                        }}
                        onClick={() => handleCardClick(article.id)}
                      >
                        {article.thumbnail && (
                          <Card.Img
                            variant="top"
                            src={article.thumbnail}
                            alt={article.title}
                            style={{ height: "200px", objectFit: "cover" }}
                          />
                        )}
                        <Card.ImgOverlay>
                          <Card.Text className="d-flex justify-content-between align-items-center">
                            <Paper
                              className="d-flex align-items-center"
                              variant="elevation"
                              style={{
                                backgroundColor: "#00000000",
                                backdropFilter: "blur(20px)",
                                padding: "2px",
                              }}
                            >
                              <Rating
                                name={`user-rating-${article.id}`}
                                value={article.averageRating || 0} // Use averageRating instead of userRatings
                                precision={0.5}
                                onChange={(event, newRating) =>
                                  handleRatingChange(article.id, newRating)
                                }
                                size="small"
                              />
                            </Paper>
                            <Chip
                              icon={<AccountCircleIcon />}
                              label={`${article.username}`}
                              size="small"
                            />
                          </Card.Text>
                        </Card.ImgOverlay>
                        <Card.Body>
                          <div
                            className="mb-2 text-secondary"
                            style={{ fontSize: "12px" }}
                          >
                            <Card.Text className="d-flex justify-content-between align-items-center">
                              <small>
                                {new Date(article.date).toLocaleString(
                                  "en-US",
                                  {
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                  }
                                )}
                              </small>
                              <small className="d-flex align-items-center">
                                <VisibilityIcon
                                  className="me-2"
                                  sx={{ fontSize: 12 }}
                                />
                                {article.views}
                              </small>
                            </Card.Text>
                          </div>
                          <Card.Title className="mb-4">
                            <h6>
                              <b>{article.title}</b>
                            </h6>
                          </Card.Title>
                          <Card.Text>
                            <figcaption className="blockquote-footer">
                              {article.description}
                            </figcaption>
                          </Card.Text>
                        </Card.Body>
                        <Card.Footer
                          className="text-secondary"
                          style={{ fontSize: "12px" }}
                        >
                          Category: {article.category.join(", ")}
                        </Card.Footer>
                      </Card>
                    </Tooltip>
                  </Link>
                ))
              : Array.from({ length: cardsPerPage }).map((_, index) => (
                  <CardPlaceholder key={index} />
                ))}
          </div>
          <div className="mt-3 d-flex justify-content-center">
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
