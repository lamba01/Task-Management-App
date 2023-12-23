// Assuming you've installed the mysql2/promise package
const db = require("../db").promise();

// Controller to update the status of a specific task
const updateTaskStatusController = async (req, res) => {
  const { taskId } = req.params;
  const { status } = req.body;

  try {
    // Find the task by ID in the database
    const [rows] = await db.query("SELECT * FROM tasks WHERE task_id = ?", [
      taskId,
    ]);
    const task = rows[0];

    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }

    // Update the status of the task
    await db.query("UPDATE tasks SET status = ? WHERE task_id = ?", [
      status,
      taskId,
    ]);

    // Send a success response
    res.json({ message: "Task status updated successfully", status });
  } catch (error) {
    console.error("Error updating task status:", error);
    res.status(500).json({ error: "Internal Server Error" });
  } finally {
    // Make sure to release the connection after the query
  }
};

module.exports = updateTaskStatusController;
