'use strict';

var Sequelize = require('sequelize');
const db = require('../models/index');
const User = db.User;
const Comment = db.Comment;

/** 
 * Bulk inserts test ratings into "Ratings" table
*/

var testRatings = [];

module.exports = {
  up: async function(queryInterface, Sequelize)
  {
    var userIds = await User.findAll({
      attributes: ['id'],
      raw: true
    });

    var commentIds = await Comment.findAll({
      attributes: ['id'],
      raw: true
    });

    for (let commentIndex = 0; commentIndex < commentIds.length; commentIndex++) {
      for (let userIndex = 0; userIndex < userIds.length; userIndex++) {
        testRatings.push({
          "rating": 3,
          "UserId": userIds[userIndex].id,
          "CommentId": commentIds[commentIndex].id,
          "createdAt": new Date(),
          "updatedAt": new Date()
        });
      }
    }

    await queryInterface.bulkInsert('Ratings', testRatings);
  },
  down: function(queryInterface, Sequelize)
  {
    return queryInterface.bulkDelete('Ratings', null, {});
  }
};
