'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Likes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Likes.belongsTo(models.Posts, {
        foreignKey: "postId",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
        as: "likedPost"
      });
      Likes.belongsTo(models.Users, {
				foreignKey: "userId",
				onDelete: "CASCADE",
        onUpdate: "CASCADE",
				as: "likedBy"
			});
    }
  }
  Likes.init({
    likes: DataTypes.STRING,
    postId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Likes',
  });
  return Likes;
};