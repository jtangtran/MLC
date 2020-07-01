'use strict';


module.exports = (sequelize, DataTypes) => {
  const Idea_Impact_Area = sequelize.define('Idea_Impact_Area', {
  }, {});
  Idea_Impact_Area.associate = function(models) {
    Idea_Impact_Area.belongsTo(models.Idea, {
        foreignKey: {
            primaryKey: true
        },
        onDelete: 'CASCADE'
    });
    Idea_Impact_Area.belongsTo(models.Impact_area, {
        foreignKey: {
            primaryKey: true
        },
        onDelete: 'CASECASE'
    });
    Idea_Impact_Area.belongsTo(models.Impact);
  };
  return Idea_Impact_Area;
};
