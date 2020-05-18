const express = require("express");
const router = express.Router();
const {
  createTask,
  taskById,
  deleteTask,
  getTasks,
  updateTask,
  getTaskById,
} = require("../controllers/task");
router.get("/", (req, res) => {
  res.send("Hello");
});

router.get("/tasks", getTasks);
router.get("/task/:taskId", getTaskById);
router.post("/task/new", createTask);
router.delete("/task/:taskId", deleteTask);
router.put("/task/:taskId", updateTask);
router.param("taskId", taskById);
module.exports = router;
