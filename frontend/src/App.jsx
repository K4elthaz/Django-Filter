import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./index.css";

import LoginPage from "./components/Login";
import RegisterPage from "./components/Register";

function App() {
  return (
    <main
      style={{
        height: "100%",
        minHeight: "100vh",
        backgroundColor: "#1a1f2b",
      }}
    >
      <Router>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Routes>
      </Router>
    </main>
  );
}

export default App;
