const express = require("express");
const router = express.Router();
const { TaskController } = require("../../controllers");
const { verifyToken } = require("../../utils");

router.post("/", verifyToken, TaskController.createTask);
router.get("/", verifyToken, TaskController.getTasks);
router.put("/:id", verifyToken, TaskController.updateTask);
router.delete("/:id", verifyToken, TaskController.deleteTask);

module.exports = router;
