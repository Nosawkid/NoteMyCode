const loginRouter = require("express").Router();
const User = require("../models/users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

loginRouter.post("/", async (req, res) => {
  const { loginId, password } = req.body;
  if (!loginId || !password) {
    return res
      .status(400)
      .json({ error: "Username and Password cannot be blank" });
  }
  const user = await User.findOne({
    $or: [{ username: loginId }, { email: loginId }],
  });
  if (!user) {
    return res.status(401).json({ error: "Invalid Username" });
  }
  const isPassword = await bcrypt.compare(password, user.passwordHash);
  if (!isPassword) {
    return res.status(401).json({ error: "Invalid Password" });
  }
  const userToken = {
    username: user.username,
    id: user._id,
  };
  const token = jwt.sign(userToken, process.env.SECRET, {
    expiresIn: "24h",
  });
  res.status(200).send({ token, id: user._id, username: user.username });
});

module.exports = loginRouter;
