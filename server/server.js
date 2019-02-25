const Sequelize = require('sequelize');
const express = require('express');
var cors = require('cors');
const bodyParser = require('body-parser');

var app = express()
app.use(cors())
const port = 3000
const DB_PASS = process.env.DB_PASS;

const Idea = require('./models/idea')

// DEV DB CONNECTION
 //const sequelize = new Sequelize('mylivingcity', 'postgres', '#HelloThere69', {
   //host: 'localhost',
   //dialect: 'postgres'
 //});

// PRODUCTION DB CONNECTION
const sequelize = new Sequelize("mylivingcity", "master", DB_PASS, {
  dialect: "postgres",
  host: "mylivingcity.cilhwpqjm37r.us-west-1.rds.amazonaws.com",
  query: { searchPath: "prod", supportsSearchPath: true },
  operatorsAliases: false
});

app.get('/', (req, res) => res.send('Welcome to My Living City!'))

app.get('/ideas', async (req, res) => {
  Idea.findAll().then(ideas => {   
    res.send(ideas)
  })
   .catch(err => {
    console.error('Error: ', err);
  })
});

app.get('/ideas/:id', async (req, res) => {
  Idea.findById(req.params.id).then(idea => {
    res.send(idea)
  })
   .catch(err => {
    console.error('Error: ', err);
  })
});

app.post('/ideas', bodyParser.json(), async (req, res) => {
  try {
    Idea.create({
      title: req.body.title,
      place_petal: req.body.place_petal,
      water_petal: req.body.water_petal,
      energy_petal: req.body.energy_petal,
      health_petal: req.body.health_petal,
      materials_petal: req.body.materials_petal,
      equity_petal: req.body.equity_petal,
      beauty_petal: req.body.beauty_petal
    });
    res.status(200).end();
  } catch(e){
    console.log(e.stack);
    res.status(500).end();
  }
})

app.listen(port, () => console.log(`My Living City listening on port ${port}!`))
