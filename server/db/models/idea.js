'use strict';
module.exports = (sequelize, DataTypes) => {
  const Idea = sequelize.define('Idea', {
    id: { 
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    category: DataTypes.STRING,
    title: DataTypes.STRING,
    description: DataTypes.STRING(5000),
    community_impact: DataTypes.STRING,
    nature_impact: DataTypes.STRING,
    arts_impact: DataTypes.STRING,
    energy_impact: DataTypes.STRING,
    manufacturing_impact: DataTypes.STRING,
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
    // Idea.belongsTo(models.User, {
    //   as: 'developer',
    //   foreignKey: 'developerId'
    // });
  };
  return Idea;
};
