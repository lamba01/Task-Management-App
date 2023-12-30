const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const signupController = require("./controllers/signupController");
const loginController = require("./controllers/loginController");
const boardController = require("./controllers/boardController");
const boardFetchController = require("./controllers/boardFetchController");
const boardDeleteController = require("./controllers/boardDeleteController");
const taskFormController = require("./controllers/taskFormController");
const taskFetchController = require("./controllers/taskFetchController");
const subtaskFetchController = require("./controllers/subtaskFetchController");
const getTaskStatusController = require("./controllers/getTaskStatusController");
const updateTaskStatusController = require("./controllers/updateTaskStatusController");
const taskFormEditController = require("./controllers/taskFormEditController");
const navBoardFetch = require("./controllers/navBoardFetch");
const deleteTaskController = require("./controllers/deleteTaskController");
const updateBoardController = require("./controllers/updateBoardController");
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
app.get("/api/boards/:boardId", navBoardFetch);
app.put("/api/boards/:boardId", updateBoardController);
app.delete("/api/boards/:boardId", boardDeleteController);
app.post("/api/tasks", taskFormController);
app.get("/api/tasks/:boardId", taskFetchController);
app.get("/api/subtasks/:taskId", subtaskFetchController);
app.get("/api/task/:taskId/status", getTaskStatusController);
app.put("/api/task/:taskId/status", updateTaskStatusController);
app.put("/api/tasks/:taskId", taskFormEditController);
app.delete("/api/tasks/:taskId", deleteTaskController);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
