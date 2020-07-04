'use strict';
module.exports = (sequelize, DataTypes) => {
  const Impact_Area = sequelize.define('Impact_Area', {
    id: { 
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    area_name: DataTypes.STRING
  }, {});
  Impact_Area.associate = function(models) {
      Impact_Area.hasMany(models.Idea_Impact_Area)
  };
  return Impact_Area;
};
