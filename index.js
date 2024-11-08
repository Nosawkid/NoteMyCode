require("dotenv").config();
const app = require("./app");
const { info } = require("./utils/logger");

const port = process.env.PORT;
app.listen(port, () => {
  info("Server running at port:", port);
});
