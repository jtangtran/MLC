module.exports = {
  development: {
    username: 'testuser',
    password: process.env.DB_PASS || 'testuser',
    database: 'mylivingcity',
    host: '127.0.0.1',
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

