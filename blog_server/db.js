require("dotenv").config();
const mongoose = require("mongoose");
const dburi = process.env.DB_URI;
mongoose.connect(dburi);

mongoose.connection.on("connected", () => {
  console.log("connected to MongoDB");
});

mongoose.connection.on("error", (err) => {
  console.log("Connection Error : ", err);
});

module.exports = mongoose;
