'use strict';
module.exports = (sequelize, DataTypes) => {
  const Rating = sequelize.define('Rating', {
    id: { 
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    score: DataTypes.INTEGER
  }, {});
  Rating.associate = function(models) {
    Rating.belongsTo(models.User, {
      foreignKey: User.id,
      allowNull: true
    });
    Rating.belongsTo(models.Idea, {
      foreignKey: Idea.id,
      allowNull: true
    });
    Rating.belongsTo(models.Comment);
  };
  return Rating;
};