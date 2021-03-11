const express = require("express");
const router = express.Router();
const auth_routes = require("./auth.routes");
const user_routes = require("./user.routes");
const customer_routes = require("./customer.routes");
const profile_routes = require("./profile.routes");
const module_routes = require("./module.routes");
const product_routes = require("./product.routes");
const brand_routes = require("./brand.routes");
const category_routes = require("./category.routes");

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
router.use("/profile", profile_routes);
router.use("/module", module_routes);
router.use("/product", product_routes);
router.use("/brand", brand_routes);
router.use("/category", category_routes);

module.exports = router;