const Sequelize = require('sequelize');
const express = require('express');
var cors = require('cors');
const bodyParser = require('body-parser');

const app = express()
app.use(cors())
const port = 3000
const DB_PASS = process.env.DB_PASS;

// DEV DB CONNECTION
// const sequelize = new Sequelize('postgres', 'postgres', '#HelloThere69', {
//   host: 'localhost',
//   dialect: 'postgres'
// });

// PRODUCTION DB CONNECTION
const sequelize = new Sequelize('postgres://master:'+DB_PASS+'@mylivingcity.cilhwpqjm37r.us-west-1.rds.amazonaws.com:5432/postgres');

app.get('/', (req, res) => res.send('Welcome to My Living City!'))


app.post('/post_idea', bodyParser.json(), async (req, res) => {
  console.log(req.body);
  const queryString = `
  INSERT INTO ideas (
    title,
    place_petal,
    water_petal,
    energy_petal,
    health_petal,
    materials_petal,
    equity_petal,
    beauty_petal
    ) 
    VALUES (
      \'${req.body.title}\',
      \'${req.body.place_petal}\',
      \'${req.body.water_petal}\',
      \'${req.body.energy_petal}\',
      \'${req.body.health_petal}\',
      \'${req.body.materials_petal}\',
      \'${req.body.equity_petal}\',
      \'${req.body.beauty_petal}\'
    )
  `
  try{
    sequelize.query(queryString)
    res.status(200).end();
  }
  catch(e){
    console.log(e.stack);
    res.status(500).end();
  }
})

app.listen(port, () => console.log(`My Living City listening on port ${port}!`))
