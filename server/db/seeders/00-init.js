'use strict';

var Sequelize = require('sequelize');

/** 
 * initialize Roles, Impact_Areas, and Impacts
*/

var roles = [
    {
        "role_name": "Resident"
    },
    {
        "role_name": "Worker"
    },
    {
        "role_name": "Associate"
    },
    {
        "role_name": "Guest"
    },
    {
        "role_name": "Administrator"
    },
];

var impactAreas = [
    {
        "area_name": "Community & Place"
    },
    {
        "area_name": "Nature, Food, & Security"
    },
    {
        "area_name": "Arts, Culture, & Education"
    },
    {
        "area_name": "Manufacturing & Waste"
    },
    {
        "area_name": "Water & Energy"
    },
];

var impacts = [
    {
        "impact_name": "Positive - Low"
    },
    {
        "impact_name": "Positive - Medium"
    },
    {
        "impact_name": "Positive - High"
    },
    {
        "impact_name": "Negative - Low"
    },
    {
        "impact_name": "Negative - Medium"
    },
    {
        "impact_name": "Negative - High"
    },
];

module.exports = {
    up: async function(queryInterface, Sequelize)
    {
      await queryInterface.bulkInsert('Roles', roles);
      await queryInterface.bulkInsert('Impact_Areas', impactAreas);
      return await queryInterface.bulkInsert('Impacts', impacts);
    },
    down: async function(queryInterface, Sequelize)
    {
      await queryInterface.bulkDelete('Roles', null, {});
      await queryInterface.bulkDelete('Impact_Areas', null, {});
      return await queryInterface.bulkDelete('Impacts', null, {});
    }
  };