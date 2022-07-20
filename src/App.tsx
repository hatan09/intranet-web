import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import ProjectPage from "./components/ProjectPage";
import ProjectDetail from "./components/ProjectDetail";
import RegisterPage from "./components/RegisterPage";
import LoginPage from "./components/LoginPage";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/projects" element={<ProjectPage />} />
          <Route path="/view-project" element={<ProjectDetail />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
