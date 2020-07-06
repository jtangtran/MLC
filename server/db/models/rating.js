'use strict';
module.exports = (sequelize, DataTypes) => {
  const Rating = sequelize.define('Rating', {
    id: { 
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    rating: DataTypes.INTEGER
  }, {});
  Rating.associate = function(models) {
    Rating.belongsTo(models.User);
    Rating.belongsTo(models.Idea);
    Rating.belongsTo(models.Comment);
  };
  return Rating;
};