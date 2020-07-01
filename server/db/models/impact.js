'use strict';
module.exports = (sequelize, DataTypes) => {
  const Impact = sequelize.define('Impact', {
    id: { 
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    impact_name: DataTypes.STRING(50),
  }, {});
  return Impact;
};