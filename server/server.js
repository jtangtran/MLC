const Sequelize = require('sequelize');
const express = require('express')
var cors = require('cors')

const app = express()
app.use(cors())
const port = 3000
const DB_PASS = process.env.DB_PASS;
const sequelize = new Sequelize('postgres://master:'+DB_PASS+'@mylivingcity.cilhwpqjm37r.us-west-1.rds.amazonaws.com:5432/postgres');

app.get('/', (req, res) => res.send('Welcome to My Living City!'))

app.get('/dbtest', (req, res) => {
  sequelize.query("SELECT message FROM test", { type: sequelize.QueryTypes.SELECT})
  .then(message => {
    res.send(message)
  })
   .catch(err => {
    console.error('Error: ', err);
  })
})

app.listen(port, () => console.log(`My Living City listening on port ${port}!`))
