'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * addColumn "posRating" and "negRating" to table "Ratings"
 *
 **/

var info = {
    "revision": 19,
    "name": "add-category-ideas",
    "created": "2020-06-09T05:21:57.778Z",
    "comment": ""
};

var migrationCommands = [
    {
        fn: "addColumn",
        params: [
            "Ratings",
            "posRating",
            {
                "type": Sequelize.INTEGER,
                "field": "posRating",
            }
        ]
    },
    {
        fn: "addColumn",
        params: [
            "Ratings",
            "negRating",
            {
                "type": Sequelize.INTEGER,
                "field": "negRating",
            }
        ]
    }
];
var undoMigrationCommands = [
    {
        fn: "changeColumn",
        params: [
            "Ratings",
            "rating",
            {
                "type": Sequelize.INTEGER,
                "field": "rating",
                "allowNull": false
            }
        ]
    }
];

module.exports = {
    pos: 0,
    up: function(queryInterface, Sequelize)
    {
        var index = this.pos;
        return new Promise(function(resolve, reject) {
            function next() {
                if (index < migrationCommands.length)
                {
                    let command = migrationCommands[index];
                    console.log("[#"+index+"] execute: " + command.fn);
                    index++;
                    queryInterface[command.fn].apply(queryInterface, command.params).then(next, reject);
                }
                else
                    resolve();
            }
            next();
        });
    },
    down: function(queryInterface, Sequelize)
    {
        var index = this.pos;
        return new Promise(function(resolve, reject) {
            function next() {
                if (index < undoMigrationCommands.length)
                {
                    let command = undoMigrationCommands[index];
                    console.log("[#"+index+"] execute: " + command.fn);
                    index++;
                    queryInterface[command.fn].apply(queryInterface, command.params).then(next, reject);
                }
                else
                    resolve();
            }
            next();
        });
    },
    info: info
};