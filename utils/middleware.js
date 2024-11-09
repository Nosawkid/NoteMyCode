const logger = require("./logger");

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

  next(error);
};

module.exports = {
  unknownEndpoints,
  errorHandler,
};
