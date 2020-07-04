'use strict';
module.exports = (sequelize, DataTypes) => {
  const Idea_Impact_Area = sequelize.define('Idea_Impact_Area', {
    id: { 
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    impact: DataTypes.STRING
  }, {});
  Idea_Impact_Area.associate = function(models) {
      Idea_Impact_Area.belongsTo(models.Idea);
      Idea_Impact_Area.belongsTo(models.Impact_Area);
  };
  return Idea_Impact_Area;
};
