'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * createTable "Roles", deps: []
 * createTable "Impact_Areas", deps: []
 * createTable "Impacts", deps: []
 * createTable "Ideas_Impact_Areas", deps: [Ideas, Impact_Areas, Impacts]
 *
 **/

var migrationCommands = [
    {
        fn: "createTable",
        params: [
            "Roles",
            {
                "id": {
                    "type": Sequelize.INTEGER,
                    "field": "id",
                    "autoIncrement": true,
                    "primaryKey": true
                },
                "role_name": {
                    "type": Sequelize.STRING,
                    "field": "role_name"
                },
            }
        ]
    },
    {
        fn: "createTable",
        params: [
            "Impact_Areas",
            {
                "id": {
                    "type": Sequelize.INTEGER,
                    "field": "id",
                    "autoIncrement": true,
                    "primaryKey": true
                },
                "area_name": {
                    "type": Sequelize.STRING,
                    "field": "area_name"
                },
            }
        ]
    },
    {
        fn: "createTable",
        params: [
            "Ideas_Impact_Areas",
            {
                "idea_id": {
                    "type": Sequelize.INTEGER,
                    "field": "idea_id",
                    "primaryKey": true,
                    "onUpdate": "CASCADE",
                    "onDelete": "SET NULL",
                    "references": {
                        "model": "Ideas",
                        "key": "id"
                    }
                },
                "impact_area_id": {
                    "type": Sequelize.INTEGER,
                    "field": "impact_area_id",
                    "primaryKey": true,
                    "onUpdate": "CASCADE",
                    "onDelete": "SET NULL",
                    "references": {
                        "model": "Impact_Areas",
                        "key": "id"
                    }
                },
                "impact": {
                    "type": Sequelize.STRING,
                    "field": "impact",
                    "allowNull": false
                },
            }
        ]
    },
];

var undoMigrationCommands = [
    {
        fn: "dropTable",
        params: [
            "Ideas_Impact_Areas"
        ]
    },
    {
        fn: "dropTable",
        params: [
            "Impact_Areas"
        ]
    },
    {
        fn: "dropTable",
        params: [
            "Roles"
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