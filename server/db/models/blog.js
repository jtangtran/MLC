'use strict';
module.exports = (sequelize, DataTypes) => {
  const Blog = sequelize.define('Blog', {
    id: { 
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: DataTypes.STRING,
    markdown: DataTypes.STRING(5000),
    active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    slug: DataTypes.STRING,
    short_desc: DataTypes.STRING(500),
  }, {});
  Blog.associate = function(models) {
    Blog.belongsTo(models.User);
  };
  return Blog;
};
