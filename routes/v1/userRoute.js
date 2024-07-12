const express = require("express");
const router = express.Router();
const { UserController } = require("../../controllers");

router.post("/", UserController.createUser);
router.post("/login", UserController.loginUser);
router.get("/", UserController.getUsers);

module.exports = router;
