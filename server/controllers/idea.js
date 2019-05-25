const db = require('../db/models/index');
const Idea = db.Idea; 

// GET /ideas
const getAllIdeas = (req, res) => {
  Idea.findAll().then(ideas => {   
    res.send(ideas);
  })
   .catch(err => {
    console.error('Error: ', err);
  });
};

// GET /ideas/:id
const getSingleIdea = (req, res) => {
  Idea.findById(req.params.id).then(idea => {
    res.send(idea);
  })
   .catch(err => {
    console.error('Error: ', err);
  });
};

// POST /ideas
const postIdea = (req, res) => {
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
};

module.exports = {
    getAllIdeas,
    getSingleIdea,
    postIdea
};

