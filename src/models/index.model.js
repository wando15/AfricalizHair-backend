const db = require("../../database/db-connect");
const auth = require("./auth.model");
const brand = require("./brand.model");
const category = require("./category.model");
const customer = require("./customer.model");
const module_model = require("./module.model");
const product = require("./product.model");
const service = require("./service.model");
const profile_module = require("./profile_module.model");
const profile = require("./profile.model");
const template = require("./template.model");
const order = require("./order.model");
const order_item = require("./order_item.model");
const user = require("./user.model");

user.hasMany(auth, { foreignKey: "user_id" })

brand.hasMany(product, { foreignKey: "brand_id" });

category.hasMany(product, { foreignKey: "category_id" });

user.hasMany(order, { foreignKey: "updated_user_id" });
user.hasMany(order, { foreignKey: "salesman_id" });
customer.hasMany(order, { foreignKey: "customer_id" });

order.hasMany(order_item, {foreignKey: "order_id"});
product.hasMany(order_item, {foreignKey: "product_id"});
service.hasMany(order_item, {foreignKey: "service_id"});

profile.hasMany(user, { foreignKey: "profile_id" });

profile_module.belongsTo(profile, { foreignKey: "profile_id" });
profile_module.belongsTo(module_model, { foreignKey: "module_id" });

// db.sync({ alter: true });