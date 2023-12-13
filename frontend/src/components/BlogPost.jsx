// Example usage in your frontend component
import React, { useState, useEffect } from "react";
import BlogService from "../API/BlogAPI";
import userApi from "../API/userAPI";
import Nav from "./Navigation";
import {
  Card,
  Row,
  Col,
  Container,
  CardTitle,
  CardBody,
} from "react-bootstrap";
import "../index.css";

function CreateBlog() {
  const [blogs, setBlogs] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [newBlog, setNewBlog] = useState({
    title: "",
    content: "",
  });

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const fetchBlogs = async () => {
    try {
      const response = await BlogService.getBlogs();
      setBlogs(response);
    } catch (error) {
      console.error("Error fetching Blogs:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewBlog({
      ...newBlog,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await BlogService.createBlog(newBlog);

      // Clear the form and refresh the blog list
      setNewBlog({ title: "", content: "" });
      fetchBlogs();
    } catch (error) {
      console.error("Error creating Blog:", error);
    }
  };

  // Fetch the blog posts when the component mounts
  useEffect(() => {
    fetchBlogs();
  }, []);
  return (
    <div
      className=""
      style={{
        minHeight: "100vh",
        backgroundColor: "#F5F5F5",
        fontFamily: "Colon Mono, monospace",
      }}
    >
      <Nav />
      <Container className="mt-5 d-flex justify-content-center">
        <Row className="">
          <Col xs={12} md={8} className="">
            {/* <div className="tools">
              <div className="circle">
                <span className="red box"></span>
              </div>
              <div className="circle">
                <span className="yellow box"></span>
              </div>
              <div className="circle">
                <span className="green box"></span>
              </div>
            </div> */}
            {blogs.map((blog) => (
              <div className="d-flex justify-content-center">
                <div className="card__content mt-3">
                  <div className="cardings">
                    <span className="titles">Posts</span>
                    <div className="comments">
                      <div className="comment-container" key={blog.id}>
                        <div className="user">
                          <div className="user-pic">
                            <svg
                              fill="none"
                              viewBox="0 0 24 24"
                              height="20"
                              width="20"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                stroke-linejoin="round"
                                fill="#707277"
                                stroke-linecap="round"
                                stroke-width="2"
                                stroke="#707277"
                                d="M6.57757 15.4816C5.1628 16.324 1.45336 18.0441 3.71266 20.1966C4.81631 21.248 6.04549 22 7.59087 22H16.4091C17.9545 22 19.1837 21.248 20.2873 20.1966C22.5466 18.0441 18.8372 16.324 17.4224 15.4816C14.1048 13.5061 9.89519 13.5061 6.57757 15.4816Z"
                              ></path>
                              <path
                                stroke-width="2"
                                fill="#707277"
                                stroke="#707277"
                                d="M16.5 6.5C16.5 8.98528 14.4853 11 12 11C9.51472 11 7.5 8.98528 7.5 6.5C7.5 4.01472 9.51472 2 12 2C14.4853 2 16.5 4.01472 16.5 6.5Z"
                              ></path>
                            </svg>
                          </div>
                          <div className="user-info">
                            <span>{blog.author}</span>
                            <p>{formatDate(blog.date_created)}</p>
                            <div className="comment-content">
                              <h5 className="">{blog.content}</h5>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </Col>
          {isLoggedIn && ( // Conditionally render the form if user is logged in
            <Col xs={12} md={4} >
              <div className="d-flex justify-content-center mt-3" style={{width:"100%", minWidth:"300px"}}>
              <form className="formers" onSubmit={handleSubmit}>
                <div className="title">Create a Post</div>
                <input
                  type="text"
                  placeholder="Your Title"
                  className="input"
                  name="title"
                  value={newBlog.title}
                  onChange={handleInputChange}
                />
                <textarea
                  placeholder="Your post"
                  name="content"
                  value={newBlog.content}
                  onChange={handleInputChange}
                ></textarea>
                <button type="submit">Post</button>
              </form>
              </div>
            </Col>
          )}
        </Row>
      </Container>
    </div>
  );
}
function formatDate(dateString) {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString(undefined, options);
}
export default CreateBlog;
