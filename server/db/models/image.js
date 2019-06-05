'use strict';
module.exports = (sequelize, DataTypes) => {
  const Image = sequelize.define('Image', {
    id: { 
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    filename: DataTypes.STRING(),
  }, {});
  Image.associate = function(models) {
    Image.belongsTo(models.User);
    Image.belongsTo(models.Blog);
    Image.belongsTo(models.Idea);
  };
  return Image;
};
