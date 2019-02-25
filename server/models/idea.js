const DB_PASS = process.env.DB_PASS;
const Sequelize = require('sequelize')
const sequelize = new Sequelize("mylivingcity", "master", DB_PASS, {
  dialect: "postgres",
  host: "mylivingcity.cilhwpqjm37r.us-west-1.rds.amazonaws.com",
  query: { searchPath: "prod", supportsSearchPath: true },
  operatorsAliases: false
});

// DEV DB CONNECTION
 //const sequelize = new Sequelize('mylivingcity', 'postgres', '#HelloThere69', {
   //host: 'localhost',
   //dialect: 'postgres'
 //});


const Idea = sequelize.define('idea', 
  {
    id: { 
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: Sequelize.STRING,
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
