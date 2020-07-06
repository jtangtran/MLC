'use strict';
module.exports = (sequelize, DataTypes) => {
  const Role = sequelize.define('Role', {
    id: { 
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    role_name: DataTypes.STRING
  }, {});
  // Role.associate = function(models) {
  // };
  return Role;
};