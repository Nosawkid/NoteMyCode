const journalRoute = require("express").Router();
const Journal = require("../models/journal");

journalRoute.get("/", async (req, res) => {
  const journals = await Journal.find({});
  res.status(200).json(journals);
});

journalRoute.get("/:id", async (req, res) => {
  const { id } = req.params;
  const journal = await Journal.findById(id);
  res.status(200).json(journal);
});

module.exports = journalRoute;
