const express = require("express");
const app = express();
const connectDB = require("./utils/connectDB");
require("express-async-errors");
app.use(express.json());

// Routes
const journalRoute = require("./routes/journals");

app.use("/api/journals", journalRoute);

app.get("/", (req, res) => {
  res.send("Welcome to NoteMyCode");
});

module.exports = app;
