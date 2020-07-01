'use strict';
module.exports = (sequelize, DataTypes) => {
  const Impact_area = sequelize.define('Impact_area', {
    id: { 
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    area_name: DataTypes.STRING(50),
  }, {});
  return Impact_area;
};