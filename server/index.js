const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const cors = require("cors");
// const mysql = require("mysql2");
const signupController = require("./controllers/signupController");
const loginController = require("./controllers/loginController");
const db = require("./db");

const app = express();

// Middlewares
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

// Routes
app.post("/api/signup", signupController);
app.post("/api/login", loginController);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
