'use strict';
module.exports = (sequelize, DataTypes) => {
  const Idea = sequelize.define('Idea', {
    id: { 
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: DataTypes.STRING,
    description: DataTypes.STRING(5000),
    place_petal: DataTypes.STRING,
    water_petal: DataTypes.STRING,
    energy_petal: DataTypes.STRING,
    health_petal: DataTypes.STRING,
    materials_petal: DataTypes.STRING,
    equity_petal: DataTypes.STRING,
    beauty_petal: DataTypes.STRING,
    state: {
      type: DataTypes.STRING,
      defaultValue: 'idea'
    },
    active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
  }, {});
  Idea.associate = function(models) {
    Idea.belongsTo(models.User);
  };
  return Idea;
};
