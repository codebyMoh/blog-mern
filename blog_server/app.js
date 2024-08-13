require("dotenv").config();
const express = require("express");

const bodyParser = require("body-parser");

const cors = require("cors");

const db = require("./db");
const userRoute = require("./routes/usersapi");
const user = require("./models/user");

const app = express();

app.use(bodyParser.json());

app.use(cors());
app.use("/api/user", userRoute); // http://localhost:7777/api/user/adduser

const port = process.env.PORT || 5001;

app.get("/", (req, res) => {
  res.send("Hello World from Server");
});

app.listen(port, () => {
  console.log(`server is running on : http://localhost:${port}`);
});
