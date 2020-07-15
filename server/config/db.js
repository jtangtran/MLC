module.exports = {
  development: {
    username: 'postgres',
    password: process.env.DB_PASS || 'postgres',
    database: 'mylivingcity',
    host: 'host.docker.internal' || 'localhost',
    dialect: 'postgres'
  },
  production: {
    username: 'master',
    password: process.env.DB_PASS,
    database: 'mylivingcity',
    host: "mylivingcity.cilhwpqjm37r.us-west-1.rds.amazonaws.com",
    dialect: 'postgres'
  }
};

