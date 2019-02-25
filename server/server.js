const sequelize = require('./db.js');
const express = require('express');
var cors = require('cors');
const bodyParser = require('body-parser');

const app = express()
app.use(cors())
const port = 3000

const Idea = require('./models/idea')

app.get('/', (req, res) => res.send('Welcome to My Living City!'))

app.get('/create_tables', (req, res) => {
  try {
    Idea.sync()
    res.status(200).end();
  } catch(e){
    console.log(e.stack);
    res.status(500).end();
  }
});

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
