const Sequelize = require("sequelize");
var sequelize;
const DB_PASS = process.env.DB_PASS;


if (process.env.NODE_ENV == "production") {
  // PRODUCTION DB CONNECTION
  sequelize = new Sequelize("mylivingcity", "master", DB_PASS, {
    dialect: "postgres",
    host: "mylivingcity.cilhwpqjm37r.us-west-1.rds.amazonaws.com",
    query: { searchPath: "prod", supportsSearchPath: true },
    operatorsAliases: false
  });
} else {
  // DEV DB CONNECTION
  sequelize = new Sequelize('postgres', 'postgres', '#HelloThere69', {
    host: 'localhost',
    dialect: 'postgres',
    query: { searchPath: "prod", supportsSearchPath: true },
    operatorsAliases: false
  });
}

module.exports = sequelize
