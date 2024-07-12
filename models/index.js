const mongoose = require("mongoose");
const config =
  require("../config/config")[process.env.NODE_ENV || "development"];
mongoose
  .connect(config.host, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log(`Connected to Database Sucessfully...!!!`);
  })
  .catch((err) => {
    console.error("App starting error:", err.message);
    process.exit(1);
  });
module.exports = mongoose;
