const express = require('express');
var cors = require('cors');
const bodyParser = require('body-parser');

const bcrypt = require('bcrypt');
const saltRounds = 10;

const index = require('./models/index');
const sequelize = index.sequelize;

const Idea = index.Idea; 
const Users = index.Users;
const Blog = index.Blog; 
const Comment = index.Comment; 

const app = express();
app.use(cors());
const port = 3000;

app.get('/', (req, res) => res.send('Welcome to My Living City!'));

sequelize.sync();

app.get('/ideas', (req, res) => {
  Idea.findAll().then(ideas => {   
    res.send(ideas);
  })
   .catch(err => {
    console.error('Error: ', err);
  });
});

app.get('/ideas/:id', (req, res) => {
  Idea.findById(req.params.id).then(idea => {
    res.send(idea);
  })
   .catch(err => {
    console.error('Error: ', err);
  });
});

app.post('/ideas', bodyParser.json(), (req, res) => {
  try {
    Idea.create({
      title: req.body.title,
      description: req.body.description,
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
});

app.post('/register', bodyParser.json(), (req, res) => {
  try {
    bcrypt.genSalt(saltRounds, function(err, salt) {
      bcrypt.hash(req.body.password, salt, function(err, hashPass) {
        Users.create({
          email: req.body.email,
          password: hashPass,
          fname: req.body.fname,
          lname: req.body.lname,
        });
        console.log('User registered');
        res.status(200).end();
      });
    });
  } catch(e){
    console.log(e.stack);
    res.status(500).end();
  }
});

app.post('/login', bodyParser.json(), (req, res) => {
  console.log(' REQ: ', req.body);
  Users.findAll({
    where: {
      email: req.body.email
    }
  }).then(user => {
    if(user[0]){
      bcrypt.compare(req.body.password, user[0].password, function(err, hashResponse) {
        if(hashResponse){
          res.send(user);
          console.log('User logged in');
          res.status(200).end();
        }
        else{
          console.log('User password does not match');
          res.status(500).end();
        }
      });
    }
    else{
      console.log('User email does not exist');
      res.status(500).end();
    }
  }).catch(e => {
    console.log(e.stack);
    res.status(500).end();
  });
});

app.listen(port, () => console.log(`My Living City listening on port ${port}!`));
