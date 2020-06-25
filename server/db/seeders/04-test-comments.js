'use strict';

var Sequelize = require('sequelize');
const db = require('../models/index');
const User = db.User;
const Idea = db.Idea;

/** 
 * Bulk inserts test comments into "Comments" table
*/

var testComments = [
  {
    "text": "This is placeholder text for a comment",
    "UserId": 0,
    "IdeaId": 0,
    "createdAt": new Date(),
    "updatedAt": new Date()
  },
  {
    "text": "This is placeholder text for a comment",
    "UserId": 0,
    "IdeaId": 0,
    "createdAt": new Date(),
    "updatedAt": new Date()
  },
  {
    "text": "This is placeholder text for a comment",
    "UserId": 0,
    "IdeaId": 0,
    "createdAt": new Date(),
    "updatedAt": new Date()
  },
  {
    "text": "This is placeholder text for a comment",
    "UserId": 0,
    "IdeaId": 0,
    "createdAt": new Date(),
    "updatedAt": new Date()
  },
  {
    "text": "This is placeholder text for a comment",
    "UserId": 0,
    "IdeaId": 0,
    "createdAt": new Date(),
    "updatedAt": new Date()
  },
  {
    "text": "This is placeholder text for a comment",
    "UserId": 0,
    "IdeaId": 0,
    "createdAt": new Date(),
    "updatedAt": new Date()
  },
  {
    "text": "This is placeholder text for a comment",
    "UserId": 0,
    "IdeaId": 0,
    "createdAt": new Date(),
    "updatedAt": new Date()
  },
  {
    "text": "This is placeholder text for a comment",
    "UserId": 0,
    "IdeaId": 0,
    "createdAt": new Date(),
    "updatedAt": new Date()
  },
  {
    "text": "This is placeholder text for a comment",
    "UserId": 0,
    "IdeaId": 0,
    "createdAt": new Date(),
    "updatedAt": new Date()
  },
  {
    "text": "This is placeholder text for a comment",
    "UserId": 0,
    "IdeaId": 0,
    "createdAt": new Date(),
    "updatedAt": new Date()
  },
  {
    "text": "This is placeholder text for a comment",
    "UserId": 0,
    "IdeaId": 0,
    "createdAt": new Date(),
    "updatedAt": new Date()
  },
  {
    "text": "This is placeholder text for a comment",
    "UserId": 0,
    "IdeaId": 0,
    "createdAt": new Date(),
    "updatedAt": new Date()
  },
  {
    "text": "This is placeholder text for a comment",
    "UserId": 0,
    "IdeaId": 0,
    "createdAt": new Date(),
    "updatedAt": new Date()
  },
  {
    "text": "This is placeholder text for a comment",
    "UserId": 0,
    "IdeaId": 0,
    "createdAt": new Date(),
    "updatedAt": new Date()
  },
  {
    "text": "This is placeholder text for a comment",
    "UserId": 0,
    "IdeaId": 0,
    "createdAt": new Date(),
    "updatedAt": new Date()
  },
  {
    "text": "This is placeholder text for a comment",
    "UserId": 0,
    "IdeaId": 0,
    "createdAt": new Date(),
    "updatedAt": new Date()
  },
  {
    "text": "This is placeholder text for a comment",
    "UserId": 0,
    "IdeaId": 0,
    "createdAt": new Date(),
    "updatedAt": new Date()
  },
  {
    "text": "This is placeholder text for a comment",
    "UserId": 0,
    "IdeaId": 0,
    "createdAt": new Date(),
    "updatedAt": new Date()
  },
  {
    "text": "This is placeholder text for a comment",
    "UserId": 0,
    "IdeaId": 0,
    "createdAt": new Date(),
    "updatedAt": new Date()
  },
  {
    "text": "This is placeholder text for a comment",
    "UserId": 0,
    "IdeaId": 0,
    "createdAt": new Date(),
    "updatedAt": new Date()
  },
  {
    "text": "This is placeholder text for a comment",
    "UserId": 0,
    "IdeaId": 0,
    "createdAt": new Date(),
    "updatedAt": new Date()
  },
  {
    "text": "This is placeholder text for a comment",
    "UserId": 0,
    "IdeaId": 0,
    "createdAt": new Date(),
    "updatedAt": new Date()
  },
  {
    "text": "This is placeholder text for a comment",
    "UserId": 0,
    "IdeaId": 0,
    "createdAt": new Date(),
    "updatedAt": new Date()
  },
  {
    "text": "This is placeholder text for a comment",
    "UserId": 0,
    "IdeaId": 0,
    "createdAt": new Date(),
    "updatedAt": new Date()
  },
  {
    "text": "This is placeholder text for a comment",
    "UserId": 0,
    "IdeaId": 0,
    "createdAt": new Date(),
    "updatedAt": new Date()
  },
  {
    "text": "This is placeholder text for a comment",
    "UserId": 0,
    "IdeaId": 0,
    "createdAt": new Date(),
    "updatedAt": new Date()
  },
  {
    "text": "This is placeholder text for a comment",
    "UserId": 0,
    "IdeaId": 0,
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

    var ideaIds = await Idea.findAll({
      attributes: ['id'],
      raw: true
    });
    console.log(userIds);

    var userIndex = 0;
    var ideaIndex = 0;
    for (let comment of testComments) {
      comment.UserId = userIds[userIndex].id;
      comment.IdeaId = ideaIds[ideaIndex].id;
      if (userIndex < userIds.length - 1) {
        userIndex++;
      } else {
        userIndex = 0;
        if (ideaIndex < ideaIds.length -1) {
          ideaIndex++;
        } else {
          ideaIndex = 0;
        }
      }
    }

    await queryInterface.bulkInsert('Comments', testComments);
  },
  down: function(queryInterface, Sequelize)
  {
    return queryInterface.bulkDelete('Comments', null, {});
  }
};
