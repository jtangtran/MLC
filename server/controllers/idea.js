const db = require('../db/models/index');
const Idea = db.Idea; 
const Vote = db.Vote; 
const User = db.User;

// GET /ideas
const getAllIdeas = async function (req, res) {
  try {
    var dbIdeas = await Idea.findAll({
      include: [{
          model: User,
          attributes: [
            ['fname', 'fname'],
            ['lname', 'lname']
          ]}
      ],
    });
    var ideas = await Promise.all(dbIdeas.map(idea => addVotes(idea))) 
    res.send(ideas);
  }

  catch(err) {
    console.error('Error: ', err);
  }
}

// Adds votes to an idea object
const addVotes = async idea => {
  var upvoteCount = await Vote.count({ where: {'up': true, 'IdeaId': idea.id} });
  var downvoteCount = await Vote.count({ where: {'down': true, 'IdeaId': idea.id} });
  return await {
    idea,
    upvoteCount,
    downvoteCount,
  }
}

// GET /ideas/:id
const getSingleIdea = async function(req, res) {
  try {
    var dbIdea = await Idea.findByPk(req.params.id, {
      include: [{
        model: User,
        attributes: [
          ['fname', 'fname'],
          ['lname', 'lname']
        ]}
      ],
    });
    var upvoteCount = await Vote.count({ where: {'up': true, 'IdeaId': req.params.id} });
    var downvoteCount = await Vote.count({ where: {'down': true, 'IdeaId': req.params.id} });
    var idea = await addVotes(dbIdea) 
    res.send(idea);
  } catch (err) {
    console.error('Error: ', err);
  }
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
      beauty_petal: req.body.beauty_petal,
      UserId: req.session.user.id
    });
    res.status(200).end();
  } catch(e){
    console.log(e.stack);
    res.status(500).end();
  }
};

const upvote = (req, res) => {
  try {
    Vote.findOne({ where: {UserId: req.session.user.id, IdeaId: req.params.id}})
    .then(existingVote => {
      if (existingVote != null) {
          return res.status(409).json({
              errors: {
                error: 'You have already voted',
              },
          });
      } else {
        Vote.create({
          UserId: req.session.user.id,
          IdeaId: req.params.id,
          up: true
        });
        res.status(200).end();
      }
    });
  } catch(e) {
    return res.status(400).json({
      errors: {
        error: e.stack,
      }
    });
  }
};

const downvote = (req, res) => {
  try {
    Vote.findOne({ where: {UserId: req.session.user.id, IdeaId: req.params.id}})
    .then(existingVote => {
      if (existingVote != null) {
          return res.status(409).json({
              errors: {
                error: 'You have already voted on this idea',
              },
          });
      } else {
        Vote.create({
          UserId: req.session.user.id,
          IdeaId: req.params.id,
          down: true
        });
        res.status(200).end();
      }
    });
  } catch(e) {
    return res.status(400).json({
      errors: {
        error: e.stack,
      }
    });
  }
};

getUpvoteCount = (req, res) => {
  Vote.count({ where: {'up': true, 'IdeaId': req.params.id} }).then(count => {
    res.status(200).send({'upvoteCount': count}); 
  });
};

getDownvoteCount = (req, res) => {
  Vote.count({ where: {'down': true, 'IdeaId': req.params.id} }).then(count => {
    res.status(200).send({'downvoteCount': count}); 
  });
};

module.exports = {
  getAllIdeas,
  getSingleIdea,
  postIdea,
  upvote,
  downvote,
};

