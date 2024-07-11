const express = require("express");
const router = express.Router();
router.use("/users", require("./userRoute"));
router.use("/tasks", require("./taskRoute"));
module.exports = router;
