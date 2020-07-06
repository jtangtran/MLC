'use strict';

var Sequelize = require('sequelize');
const db = require('../models/index');
const User = db.User;
const Comment = db.Comment;

/** 
 * Bulk inserts test ratings into "Ratings" table
*/

var testRatings = [
  {
    "rating": 3,
    "UserId": 0,
    "CommentId": 0,
    "createdAt": new Date(),
    "updatedAt": new Date()
  },
  {
    "rating": 4,
    "UserId": 0,
    "CommentId": 0,
    "createdAt": new Date(),
    "updatedAt": new Date()
  },
  {
    "rating": 3,
    "UserId": 0,
    "CommentId": 0,
    "createdAt": new Date(),
    "updatedAt": new Date()
  },
  {
    "rating": 5,
    "UserId": 0,
    "CommentId": 0,
    "createdAt": new Date(),
    "updatedAt": new Date()
  },
  {
    "rating": 3,
    "UserId": 0,
    "CommentId": 0,
    "createdAt": new Date(),
    "updatedAt": new Date()
  },
  {
    "rating": 2,
    "UserId": 0,
    "CommentId": 0,
    "createdAt": new Date(),
    "updatedAt": new Date()
  },
  {
    "rating": 3,
    "UserId": 0,
    "CommentId": 0,
    "createdAt": new Date(),
    "updatedAt": new Date()
  },
  {
    "rating": 5,
    "UserId": 0,
    "CommentId": 0,
    "createdAt": new Date(),
    "updatedAt": new Date()
  },
  {
    "rating": 4,
    "UserId": 0,
    "CommentId": 0,
    "createdAt": new Date(),
    "updatedAt": new Date()
  },
  {
    "rating": 3,
    "UserId": 0,
    "CommentId": 0,
    "createdAt": new Date(),
    "updatedAt": new Date()
  },
  {
    "rating": 2,
    "UserId": 0,
    "CommentId": 0,
    "createdAt": new Date(),
    "updatedAt": new Date()
  },
  {
    "rating": 1,
    "UserId": 0,
    "CommentId": 0,
    "createdAt": new Date(),
    "updatedAt": new Date()
  },
  {
    "rating": 2,
    "UserId": 0,
    "CommentId": 0,
    "createdAt": new Date(),
    "updatedAt": new Date()
  },
  {
    "rating": 3,
    "UserId": 0,
    "CommentId": 0,
    "createdAt": new Date(),
    "updatedAt": new Date()
  },
  {
    "rating": 4,
    "UserId": 0,
    "CommentId": 0,
    "createdAt": new Date(),
    "updatedAt": new Date()
  },
  {
    "rating": 5,
    "UserId": 0,
    "CommentId": 0,
    "createdAt": new Date(),
    "updatedAt": new Date()
  },
  {
    "rating": 4,
    "UserId": 0,
    "CommentId": 0,
    "createdAt": new Date(),
    "updatedAt": new Date()
  },
  {
    "rating": 3,
    "UserId": 0,
    "CommentId": 0,
    "createdAt": new Date(),
    "updatedAt": new Date()
  },
  {
    "rating": 2,
    "UserId": 0,
    "CommentId": 0,
    "createdAt": new Date(),
    "updatedAt": new Date()
  },
  {
    "rating": 4,
    "UserId": 0,
    "CommentId": 0,
    "createdAt": new Date(),
    "updatedAt": new Date()
  },
  {
    "rating": 5,
    "UserId": 0,
    "CommentId": 0,
    "createdAt": new Date(),
    "updatedAt": new Date()
  },
  {
    "rating": 4,
    "UserId": 0,
    "CommentId": 0,
    "createdAt": new Date(),
    "updatedAt": new Date()
  },
  {
    "rating": 5,
    "UserId": 0,
    "CommentId": 0,
    "createdAt": new Date(),
    "updatedAt": new Date()
  },
  {
    "rating": 5,
    "UserId": 0,
    "CommentId": 0,
    "createdAt": new Date(),
    "updatedAt": new Date()
  },
  {
    "rating": 3,
    "UserId": 0,
    "CommentId": 0,
    "createdAt": new Date(),
    "updatedAt": new Date()
  },
  {
    "rating": 2,
    "UserId": 0,
    "CommentId": 0,
    "createdAt": new Date(),
    "updatedAt": new Date()
  },
  {
    "rating": 5,
    "UserId": 0,
    "CommentId": 0,
    "createdAt": new Date(),
    "updatedAt": new Date()
  },
  {
    "rating": 1,
    "UserId": 0,
    "CommentId": 0,
    "createdAt": new Date(),
    "updatedAt": new Date()
  },
  {
    "rating": 1,
    "UserId": 0,
    "CommentId": 0,
    "createdAt": new Date(),
    "updatedAt": new Date()
  },
  {
    "rating": 2,
    "UserId": 0,
    "CommentId": 0,
    "createdAt": new Date(),
    "updatedAt": new Date()
  },
  {
    "rating": 3,
    "UserId": 0,
    "CommentId": 0,
    "createdAt": new Date(),
    "updatedAt": new Date()
  },
  {
    "rating": 2,
    "UserId": 0,
    "CommentId": 0,
    "createdAt": new Date(),
    "updatedAt": new Date()
  },
  {
    "rating": 3,
    "UserId": 0,
    "CommentId": 0,
    "createdAt": new Date(),
    "updatedAt": new Date()
  },
  {
    "rating": 3,
    "UserId": 0,
    "CommentId": 0,
    "createdAt": new Date(),
    "updatedAt": new Date()
  },
  {
    "rating": 1,
    "UserId": 0,
    "CommentId": 0,
    "createdAt": new Date(),
    "updatedAt": new Date()
  },
  {
    "rating": 2,
    "UserId": 0,
    "CommentId": 0,
    "createdAt": new Date(),
    "updatedAt": new Date()
  },
];

module.exports = {
  up: async function(queryInterface, Sequelize)
  {
    var userIds = await User.findAll({
      attributes: ['id'],
      raw: true
    });
    console.log(userIds);

    var commentIds = await Comment.findAll({
      attributes: ['id'],
      raw: true
    });
    console.log(commentIds);

    var userIndex = 0;
    var commentIndex = 0;
    for (let rating of testRatings) {
      rating.UserId = userIds[userIndex].id;
      rating.CommentId = commentIds[commentIndex].id;
      if (userIndex < userIds.length - 1) {
        userIndex++;
      } else {
        userIndex = 0;
        if (commentIndex < commentIds.length -1) {
          commentIndex++;
        } else {
          commentIndex = 0;
        }
      }
    }

    await queryInterface.bulkInsert('Ratings', testRatings);
  },
  down: function(queryInterface, Sequelize)
  {
    return queryInterface.bulkDelete('Ratings', null, {});
  }
};
