const express = require("express");
const router = express.Router();
const app = require("../app");

const {
  addTodo,
  createTodoTask,
  deleteTodo,
  deleteTodoTask,
  editTodo,
  editTask,
  getTodos,
  getTodo,
  home,
} = require("../controllers/todoController");

// Home routes
router.get("/api/v1", home);
router.get("/api/v1/getTodos", getTodos);
router.get("/api/v1/getTodo/:todoId", getTodo);
router.post("/api/v1/addTodo", addTodo);
router.post("/api/v1/createTodoTask/:todoId", createTodoTask);
router.delete("/api/v1/deleteTodo/:todoId", deleteTodo);
router.delete("/api/v1/deleteTodoTask/:todoId", deleteTodoTask);
router.put("/api/v1/editTodo/:todoId", editTodo);
router.put("/api/v1/editTask/:todoId", editTask);

module.exports = router;
