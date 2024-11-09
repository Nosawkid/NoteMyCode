const Journal = require("../models/journal");

const journalControllers = {
  getAllJournals: async (req, res) => {
    const journals = await Journal.find({});
    res.status(200).json(journals);
  },
  getJournalById: async (req, res) => {
    const { id } = req.params;
    const journal = await Journal.findById(id);
    if (journal) {
      res.json(journal);
    } else {
      res.status(404).end();
    }
  },
  addNewJournal: async (req, res) => {
    const { title, content, challenges } = req.body;
    const existingTitle = await Journal.findOne({ title });
    if (existingTitle) {
      return res
        .status(400)
        .json({ error: `Journal with the title: ${title} already exists !` });
    }
    const newJournal = new Journal({
      title,
      content,
      challenges,
    });
    await newJournal.save();
    res.status(201).send(newJournal);
  },
  deleteJournalById: async (req, res) => {
    const { id } = req.params;
    const deletedJournal = await Journal.findByIdAndDelete(id);
    if (!deletedJournal) {
      return res.status(400).json({ error: "No item found" });
    } else {
      res.status(204).end();
    }
  },
  updateJournalById: async (req, res) => {
    const { id } = req.params;
    const { title, content, challenges } = req.body;
    const updatedJournal = await Journal.findByIdAndUpdate(
      id,
      {
        title,
        content,
        challenges,
      },
      { new: true, runValidators: true, context: "query" }
    );

    if (!updatedJournal) {
      return res.status(400).json({ error: "Invalid Id" });
    } else {
      res.status(200).json(updatedJournal);
    }
  },
};

module.exports = journalControllers;
