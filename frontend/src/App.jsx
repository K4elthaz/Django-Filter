import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./index.css";

import LoginPage from "./components/Login";
import RegisterPage from "./components/Register";
import LandingPage from "./components/MainPage";

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
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/Register" element={<RegisterPage />} />
          <Route path="/Home" element={<LandingPage />} />
        </Routes>
      </Router>
    </main>
  );
}

export default App;
