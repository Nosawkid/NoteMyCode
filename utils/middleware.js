const logger = require("./logger");
const jwt = require("jsonwebtoken");
const User = require("../models/users");

const unknownEndpoints = (req, res, next) => {
  res.status(404).send({ error: "No Resource found" });
};

const errorHandler = (error, req, res, next) => {
  logger.error("Error Name:", error.name);
  logger.error("Error Message:", error.message);
  if (error.name === "CastError") {
    return res.status(400).json({ error: "Invalid ID" });
  }
  if (error.name === "ValidationError") {
    return res.status(404).json({ error: error.message });
  }
  if (
    error.name === "MongoServerError" &&
    error.message.includes("E11000 duplicate key error")
  ) {
    return res.status(400).json({ error: `expected 'username' to be unique` });
  }
  if (error.name === "JsonWebTokenError") {
    return res.status(401).json({ error: "Invalid Token" });
  }
  if (error.name === "TokenExpiredError") {
    return res.status(401).json({ error: "Token Expired" });
  }

  next(error);
};

const extractToken = (req, res, next) => {
  const authorization = req.get("authorization");
  if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
    req.token = authorization.slice(7);
  } else {
    req.token = null;
  }
  next();
};

const userExtractor = async (req, res, next) => {
  const token = req.token;
  if (!token) {
    return res.status(401).json({ error: "Token required" });
  }
  const decodedToken = jwt.verify(token, process.env.SECRET);
  if (!decodedToken.id) {
    return res.status(401).json({ error: "Invalid User" });
  }
  const user = await User.findById(decodedToken.id);
  if (!user) {
    return res.status(404).json({ error: "No user found" });
  }
  req.user = user;
  next();
};

module.exports = {
  unknownEndpoints,
  errorHandler,
  extractToken,
  userExtractor,
};
