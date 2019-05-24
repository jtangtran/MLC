'use strict';
module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define('Comment', {
    id: { 
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    text: DataTypes.STRING(5000),
    active: DataTypes.BOOLEAN,
  }, {});
  Comment.associate = function(models) {
    Comment.hasOne(models.Users);
    Comment.hasOne(models.Blog);
    Comment.hasOne(models.Idea);
  };
  return Comment;
};
