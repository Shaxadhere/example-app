const express = require("express");
const morgan = require("morgan");
const app = express();
const exampleRoutes = require("./routes/example");
const { ApiResponse } = require("./helpers");
const cors = require("cors");
require("dotenv").config();

//Database Connection
require("./config/database").connect();

//Adding Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(cors());
app.use(express.json());
app.use(express.static("/"));
app.use("/uploads", express.static("uploads"));

//Registering Routes
app.use("/example", exampleRoutes);
app.use("/", (req, res) => {
  res.status(200).send(ApiResponse(true, "Example Node API"));
});

//Connecting to server
const { PORT } = process.env || 3000;
server.listen(PORT, (err, result) => {
  if (err) console.log(err);
  else console.log(`Server is running on port ${PORT}`);
});
