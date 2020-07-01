'use strict';

module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define('Comment', {
    id: { 
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    text: DataTypes.STRING(200),
  }, {});
  Comment.associate = function(models) {
    Comment.belongsTo(models.User);
    // Comment.belongsTo(models.Blog);
    Comment.belongsTo(models.Idea);
  };
  return Comment;
};
