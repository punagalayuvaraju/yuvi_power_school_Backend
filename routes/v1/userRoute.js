const express = require("express");
const router = express.Router();
const { UserController } = require("../../controllers");

router.post("/", UserController.createUser);
router.get("/", UserController.getUsers);

module.exports = router;
