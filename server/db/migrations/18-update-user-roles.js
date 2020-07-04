'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * changeColumn Users.role to reference Roles.id
 *
 **/

var migrationCommands = [
    {
        fn: "changeColumn",
        params: [
            "Users",
            "role",
            {
                "type": Sequelize.INTEGER,
                "field": "role",
                "onUpdate": "CASCADE",
                "onDelete": "SET NULL",
                "references": {
                    "model": "Roles",
                    "key": "id"
                },
                "allowNull": false
            }
        ]
    },
];

var undoMigrationCommands = [
    {
        fn: "changeColumn",
        params: [
            "Users",
            "role",
            {
                "type": Sequelize.STRING,
                "field": "role",
                "defaultValue": "user"
            }
        ]
    },
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
    }
};