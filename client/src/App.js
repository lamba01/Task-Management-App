import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import SignUp from "./pages/Signup/SignUp";
// import { BoardProvider } from "./contexts/BoardContext";
import { TaskProvider } from "./contexts/TaskContext";

function App() {
  return (
    <Router>
      <TaskProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<SignUp />} />
        </Routes>
      </TaskProvider>
    </Router>
  );
}

export default App;
