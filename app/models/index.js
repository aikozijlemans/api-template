const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.user = require("./user.model");
db.role = require("./role.model");
db.tutorials = require("./tutorial.model.js")(mongoose);

db.ROLES = ["user", "admin", "owner", "moderator"];

module.exports = db;