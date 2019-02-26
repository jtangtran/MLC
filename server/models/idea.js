const Sequelize = require("sequelize");
const sequelize = require("../db.js"); 

const Idea = sequelize.define('idea', 
  {
    id: { 
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: Sequelize.STRING,
    description: Sequelize.STRING(5000),
    place_petal: Sequelize.STRING,
    water_petal: Sequelize.STRING,
    energy_petal: Sequelize.STRING,
    health_petal: Sequelize.STRING,
    materials_petal: Sequelize.STRING,
    equity_petal: Sequelize.STRING,
    beauty_petal: Sequelize.STRING
  },
  {
    schema: "prod"
  }
);

module.exports = Idea;
