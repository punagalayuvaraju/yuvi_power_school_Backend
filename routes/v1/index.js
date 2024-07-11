const express = require("express");
const { AuthController } = require("../../controllers");
const router = express.Router();
router.get("/login", AuthController.login);
module.exports = router;
