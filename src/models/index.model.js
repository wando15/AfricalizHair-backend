const db = require("../../database/db-connect");
const auth = require("./auth.model");
const brand = require("./brand.model");
const category = require("./category.model");
const customer = require("./customer.model");
const module_model = require("./module.model");
const product = require("./product.model");
const profile_module = require("./profile_module.model");
const profile = require("./profile.model");
const template = require("./template.model");
const user = require("./user.model");

user.hasMany(auth, { foreignKey: 'user_id' })

brand.hasMany(product, { foreignKey: 'brand_id' });

category.hasMany(product, { foreignKey: 'category_id' });

profile.hasMany(user, { foreignKey: 'profile_id' });

db.sync({ alter: true });