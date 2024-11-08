const mongoose = require("mongoose");
const { Schema } = mongoose;

const journalSchema = new Schema({
  title: {
    type: String,
    required: [true, "Title cannot be blank"],
    trim: true,
  },
  content: {
    type: String,
    required: [true, "Content cannot be blank"],
    trim: true,
  },
  challenges: [
    {
      challengeTitle: {
        type: String,
        trim: true,
      },
      solution: {
        type: String,
        trim: true,
      },
      timeTaken: {
        type: Number,
        min: [0, "Time taken to tackle the solution cannot be negative"],
        default: 0,
      },
      sourceOfSolution: {
        type: String,
      },
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

journalSchema.set("toJSON", {
  transform: (document, returnedObj) => {
    returnedObj.id = returnedObj._id.toString();
    returnedObj.challenges.forEach((challenge) => {
      challenge.id = challenge._id.toString();
      delete challenge._id;
    });
    delete returnedObj._id;
    delete returnedObj.__v;
  },
});

module.exports = mongoose.model("Journal", journalSchema);
