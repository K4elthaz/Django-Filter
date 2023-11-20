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
          <Route path="/" element={<LandingPage />} />
        </Routes>
      </Router>
    </main>
  );
}

export default App;
