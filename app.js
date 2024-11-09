require("express-async-errors");
const express = require("express");
const app = express();
const connectDB = require("./utils/connectDB");
const middlewares = require("./utils/middleware");

// Routes
const journalRoute = require("./routes/journals");
const userRoute = require("./routes/users");
const loginRoute = require("./routes/login");

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome to NoteMyCode");
});
app.use(middlewares.extractToken);
app.use("/api/journals", middlewares.userExtractor, journalRoute);
app.use("/api/users", userRoute);
app.use("/api/login", loginRoute);
app.use(middlewares.unknownEndpoints);
app.use(middlewares.errorHandler);

module.exports = app;
