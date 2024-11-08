const mongoose = require("mongoose");
const logger = require("./logger");

mongoose.set("strictQuery", false);
logger.info("Connecting to:", process.env.MONGODB_URI);

const connection = mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    logger.info("Connected to MONGODB");
  })
  .catch((err) => {
    logger.error("Mongo Error:", err);
  });

module.exports = connection;
