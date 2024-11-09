const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  username: {
    type: String,
    required: [true, "Name cannot be empty"],
    unique: true,
    minLength: 5,
  },
  email: {
    type: String,
    required: [true, "Email cannot be blank"],
  },
  passwordHash: {
    type: String,
    required: [true, "Password Cannot be blank"],
  },
  journal: [
    {
      type: Schema.Types.ObjectId,
      ref: "Journal",
    },
  ],
});

userSchema.set("toJSON", {
  transform: (document, returnedObj) => {
    returnedObj.id = returnedObj._id.toString();
    delete returnedObj._id;
    delete returnedObj.__v;
    delete returnedObj.passwordHash;
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
