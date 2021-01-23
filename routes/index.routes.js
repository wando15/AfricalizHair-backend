const express = require("express");
const router = express.Router();
const auth_routes = require("./auth.routes");
const user_routes = require("./user.routes");
const customer_routes = require("./customer.routes");

router.use("/", auth_routes.router_login);
router.use((req, res, next) => {
    if (req.session.user) {
        next();
    } else {
        res.status(401).json({
            message: "Authrization failed! Please login"
        });
    }
});

router.use("/auth", auth_routes.router);
router.use("/user", user_routes);
router.use("/customer", customer_routes);

module.exports = router;