import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import SignUp from "./pages/Signup/SignUp";
import { TaskUpdateProvider } from "./contexts/TaskUpdateContext";
import { TaskProvider } from "./contexts/TaskContext";
import { TaskStatusProvider } from "./contexts/TaskStatusContext";

function App() {
  return (
    <Router>
      <TaskProvider>
        <TaskUpdateProvider>
          <TaskStatusProvider>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<SignUp />} />
            </Routes>
          </TaskStatusProvider>
        </TaskUpdateProvider>
      </TaskProvider>
    </Router>
  );
}

export default App;
