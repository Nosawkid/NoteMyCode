const Journal = require("../models/journal");
const User = require("../models/users");

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
    const user = await User.findById(req.user.id);
    const existingTitle = await Journal.findOne({ title, user: user._id });

    if (existingTitle) {
      return res
        .status(400)
        .json({ error: `Journal with the title: ${title} already exists !` });
    }
    const journal = new Journal({
      title,
      content,
      challenges,
      user: user._id,
    });
    const newJournal = await journal.save();
    user.journals = user.journals.concat(newJournal._id);
    await user.save();
    res.status(201).send(newJournal);
  },
  deleteJournalById: async (req, res) => {
    const { id } = req.params;
    const journal = await Journal.findById(id);
    if (!journal) {
      return res.status(404).json({ error: "No Journal found" });
    }
    if (journal.user.toString() !== req.user.id) {
      return res.status(400).json({ error: "Unauthorized Action" });
    }
    await Journal.findByIdAndDelete(id);
    res.status(204).end();
  },
  updateJournalById: async (req, res) => {
    const { id } = req.params;
    const { title, content, challenges } = req.body;
    const journal = await Journal.findById(id);
    if (!journal) {
      return res.status(404).json({ error: "No Journal Found" });
    }
    if (journal.user.toString() !== req.user.id) {
      return res.status(401).json({ error: "Unauthorized Operation" });
    }
    const updatedJournal = await Journal.findByIdAndUpdate(
      id,
      {
        title,
        content,
        challenges,
      },
      { new: true, runValidators: true, context: "query" }
    );
    res.status(200).json(updatedJournal);
  },

  getJournalsOfAUser: async (req, res) => {
    const { userId } = req.params;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "No User found on this id" });
    }
    const journals = await Journal.find({ user: userId });
    res.status(200).json(journals);
  },
};

module.exports = journalControllers;
