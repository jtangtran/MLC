const Sequelize = require("sequelize");
const sequelize = require("../db.js"); 

const Users = sequelize.define('users', 
  {
    id: { 
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    email: Sequelize.STRING,
    password: Sequelize.STRING,
    fname: Sequelize.STRING,
    lname: Sequelize.STRING
  },
  {
    schema: "prod"
  }
);

module.exports = Users;