const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const signupController = require("./controllers/signupController");
const loginController = require("./controllers/loginController");
const boardController = require("./controllers/boardController");
const boardFetchController = require("./controllers/boardFetchController");
const boardDeleteController = require("./controllers/boardDeleteController");

const app = express();

// Middlewares
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

// Routes
app.post("/api/signup", signupController);
app.post("/api/login", loginController);
app.post("/api/add-board", boardController);
app.get("/api/boards", boardFetchController);
app.delete("/api/boards/:taskId", boardDeleteController);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
