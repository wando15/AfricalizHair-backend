const express = require("express");
const router = express.Router();
const user_routes = require("./user.routes");
const customer_routes = require("./customer.routes");

router.use("/user", user_routes);
router.use("/customer", customer_routes);

module.exports = router;