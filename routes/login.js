const loginRouter = require("express").Router();
const loginController = require("../controllers/logins");

loginRouter.post("/", loginController.authenticateUser);

module.exports = loginRouter;
