const User = require("../models/users");
const bcrypt = require("bcrypt");

const userController = {
  getAllUsers: async (req, res) => {
    const users = await User.find({});
    res.json(users);
  },
  getUserById: async (req, res) => {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ error: "No user found" });
    } else {
      res.status(200).json(user);
    }
  },
  registerUser: async (req, res) => {
    const { username, email, password } = req.body;
    if (!password) {
      return res.status(400).json({ error: "Password cannot be blank" });
    }
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);
    const user = new User({
      username,
      email,
      passwordHash,
    });
    const newUser = await user.save();
    res.status(201).json(newUser);
  },
};

module.exports = userController;
