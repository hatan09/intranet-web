import React from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import ProjectPage from "./components/ProjectPage";
import ProjectDetail from "./components/ProjectDetail";
import RegisterPage from "./components/RegisterPage";
import Upload from "./components/RegisterPage/upload";
import LoginPage from "./components/LoginPage";
import ProfilePage from "./components/ProfilePage";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/upload" element={<Upload />} />
          <Route path="/projects" element={<ProjectPage />}/>
          <Route path="/projects/:id" element={<ProjectDetail />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
