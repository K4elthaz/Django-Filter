import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import "./index.css";

import LoginPage from "./components/Login";
import RegisterPage from "./components/Register";
import LandingPage from "./components/MainPage";
import PrivateRoute from "./components/PrivateRoute";
import Toastify from "./components/Toastify";
import Blog from "./components/BlogPost";
import About from "./components/AboutUs";
import Contact from "./components/ContactUs";

function App() {
  return (
    <main
      style={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        backgroundColor: "#F5F5F5",
        fontFamily: "Colon Mono, monospace",
      }}
    >
      <Router>
        <Toastify />
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/Register" element={<RegisterPage />} />
          <Route path="/" element={<Blog/>} />
          <Route path="/home" element={<LandingPage />} />
          <Route path="/about-us" element={<About/>} />
          <Route path="/contact-us" element={<Contact/>} />
        </Routes>
      </Router>
    </main>
  );
}

export default App;
