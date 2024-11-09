require("express-async-errors");
const express = require("express");
const app = express();
const connectDB = require("./utils/connectDB");
const middlewares = require("./utils/middleware");

app.use(express.json());

// Routes
const journalRoute = require("./routes/journals");

app.get("/", (req, res) => {
  res.send("Welcome to NoteMyCode");
});
app.use("/api/journals", journalRoute);
app.use(middlewares.unknownEndpoints);
app.use(middlewares.errorHandler);

module.exports = app;
