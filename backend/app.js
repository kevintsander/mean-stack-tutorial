const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const config = require("./config.json");

const postRoutes = require("./routes/posts");

const app = express();

mongoose
  .connect(
    `mongodb+srv://${config["db"]["user"]}:${config["db"]["password"]}@cluster0.g7oxtkv.mongodb.net/${config["db"]["db-name"]}?retryWrites=true&w=majority`
  )
  .then(() => {
    console.log("Connected to database!");
  })
  .catch(() => {
    console.log("Connection failed!");
  });

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false })); // not actually used, just shown as part of training to indicate other types of data besides json can be parsed

app.use("/api/posts", postRoutes);

module.exports = app;
