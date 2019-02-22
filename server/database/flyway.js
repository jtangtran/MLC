// LOCAL DEV MIGRATION
// module.exports = {
//     url: `jdbc:postgresql://localhost:5432/postgres`,
//     schemas: 'postgres',
//     locations: 'filesystem:database/migrations',
//     user: 'postgres',
//     password: '#HelloThere69',
//     sqlMigrationSuffix: '.sql'
// };

// PROD DB MIGRATION
const DB_PASS = process.env.DB_PASS;
module.exports = {
    url: `jdbc:postgresql://mylivingcity.cilhwpqjm37r.us-west-1.rds.amazonaws.com:5432/postgres`,
    schemas: 'postgres',
    locations: 'filesystem:database/migrations',
    user: 'master',
    password: DB_PASS,
    sqlMigrationSuffix: '.sql'
};