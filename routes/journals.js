const journalRoute = require("express").Router();
const journalControllers = require("../controllers/journals");

// Get All Journals
journalRoute.get("/", journalControllers.getAllJournals);

// Get a journal by id
journalRoute.get("/:id", journalControllers.getJournalById);

// Get All Journals of user
journalRoute.get("/:userId/user", journalControllers.getJournalsOfAUser);

// Add new journal
journalRoute.post("/", journalControllers.addNewJournal);

// Delete a journal by id
journalRoute.delete("/:id", journalControllers.deleteJournalById);

// Update a journal by id
journalRoute.put("/:id", journalControllers.updateJournalById);

module.exports = journalRoute;
