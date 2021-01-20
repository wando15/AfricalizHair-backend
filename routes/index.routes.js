const express = require("express");
const router = express.Router();
const user_routes = require("./user.routes");

router.use("/user", user_routes);

module.exports = router;