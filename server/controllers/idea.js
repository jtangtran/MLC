const db = require('../db/models/index');
const Idea = db.Idea; 
const Vote = db.Vote; 
const User = db.User;
const Rating = db.Rating;
const Sequelize = db.Sequelize;

// GET /:category/idea/:id
const getIdeasByCategory = async function(req, res) {
  try{
    if(req.params.category === 'Nature' && req.params.sort === 'new'){
      var dbIdeas = await Idea.findAll({
        include: [{
          model: User,
          attributes: [
            ['fname', 'fname'],
            ['lname', 'lname']
          ]},
        { 
          association: 'developer',
          attributes: [
            ['fname', 'fname'],
            ['lname', 'lname']
          ]}
      ],
      where: {active: true, category: 'Nature'},
      offset: req.params.offset,
      limit: 50,
      order: [['createdAt', 'DESC']]
      }).catch((err) => {
        throw err;
      });
      var ideas = await Promise.all(dbIdeas.map(idea => addVotes(idea))) 
      res.send(ideas);
    } else if (req.params.category === 'Community' && req.params.sort === 'new'){
        var dbIdeas = await Idea.findAll({
          include: [{
            model: User,
            attributes: [
              ['fname', 'fname'],
              ['lname', 'lname']
            ]},
          { 
            association: 'developer',
            attributes: [
              ['fname', 'fname'],
              ['lname', 'lname']
            ]}
        ],
        where: {active: true, category: 'Community'},
        offset: req.params.offset,
        limit: 50,
        order: [['createdAt', 'DESC']]
        }).catch((err) => {
          throw err;
        });
        var ideas = await Promise.all(dbIdeas.map(idea => addVotes(idea))) 
        res.send(ideas);      
    } else if (req.params.category === 'Arts' && req.params.sort === 'new'){
      var dbIdeas = await Idea.findAll({
        include: [{
          model: User,
          attributes: [
            ['fname', 'fname'],
            ['lname', 'lname']
          ]},
        { 
          association: 'developer',
          attributes: [
            ['fname', 'fname'],
            ['lname', 'lname']
          ]}
      ],
      where: {active: true, category: 'Arts'},
      offset: req.params.offset,
      limit: 50,
      order: [['createdAt', 'DESC']]
      }).catch((err) => {
        throw err;
      });
      var ideas = await Promise.all(dbIdeas.map(idea => addVotes(idea))) 
      res.send(ideas);      
    } else if(req.params.category === 'Energy' && req.params.sort === 'new'){
      var dbIdeas = await Idea.findAll({
        include: [{
          model: User,
          attributes: [
            ['fname', 'fname'],
            ['lname', 'lname']
          ]},
        { 
          association: 'developer',
          attributes: [
            ['fname', 'fname'],
            ['lname', 'lname']
          ]}
      ],
      where: {active: true, category: 'Energy'},
      offset: req.params.offset,
      limit: 50,
      order: [['createdAt', 'DESC']]
      }).catch((err) => {
        throw err;
      });
      var ideas = await Promise.all(dbIdeas.map(idea => addVotes(idea))) 
      res.send(ideas);
    } else if(req.params.category === 'Manufacturing' && req.params.sort === 'new'){
      var dbIdeas = await Idea.findAll({
        include: [{
          model: User,
          attributes: [
            ['fname', 'fname'],
            ['lname', 'lname']
          ]},
        { 
          association: 'developer',
          attributes: [
            ['fname', 'fname'],
            ['lname', 'lname']
          ]}
      ],
      where: {active: true, category: 'Manufacturing'},
      offset: req.params.offset,
      limit: 50,
      order: [['createdAt', 'DESC']]
      }).catch((err) => {
        throw err;
      });
      var ideas = await Promise.all(dbIdeas.map(idea => addVotes(idea))) 
      res.send(ideas);  
    } else if(req.params.category === 'Nature' && req.params.sort === 'trending'){
      var dbIdeas = await Idea.findAll({
        include: [{
          model: User,
          attributes: [
            ['fname', 'fname'],
            ['lname', 'lname']
          ]},
          {
            association: 'developer',
            attributes: [
              ['fname', 'fname'],
              ['lname', 'lname']
          ]}
        ],
        where: {active: true, category: 'Nature'},
        offset: req.params.offset,
        limit: 50,
        order: [['createdAt', 'DESC']]
      }).catch((err) => {throw err;});
      var ideas = await Promise.all(dbIdeas.map(idea => addVotes(idea))) 
      ideas.sort((a,b) => {
        if (a.upvoteCount - a.downvoteCount > b.upvoteCount - b.downvoteCount) {
          return 1;
        }
        if (a.upvoteCount - a.downvoteCount < b.upvoteCount - b.downvoteCount) {
          return -1;
        }
        return 0;
      }).reverse();
      res.send(ideas);
    } else if(req.params.category === 'Community' && req.params.sort === 'trending'){
      var dbIdeas = await Idea.findAll({
        include: [{
          model: User,
          attributes: [
            ['fname', 'fname'],
            ['lname', 'lname']
          ]},
          {
            association: 'developer',
            attributes: [
              ['fname', 'fname'],
              ['lname', 'lname']
          ]}
        ],
        where: {active: true, category: 'Community'},
        offset: req.params.offset,
        limit: 50,
        order: [['createdAt', 'DESC']]
      }).catch((err) => {throw err;});
      var ideas = await Promise.all(dbIdeas.map(idea => addVotes(idea))) 
      ideas.sort((a,b) => {
        if (a.upvoteCount - a.downvoteCount > b.upvoteCount - b.downvoteCount) {
          return 1;
        }
        if (a.upvoteCount - a.downvoteCount < b.upvoteCount - b.downvoteCount) {
          return -1;
        }
        return 0;
      }).reverse();
      res.send(ideas);
    } else if(req.params.category === 'Arts' && req.params.sort === 'trending'){
      var dbIdeas = await Idea.findAll({
        include: [{
          model: User,
          attributes: [
            ['fname', 'fname'],
            ['lname', 'lname']
          ]},
          {
            association: 'developer',
            attributes: [
              ['fname', 'fname'],
              ['lname', 'lname']
          ]}
        ],
        where: {active: true, category: 'Arts'},
        offset: req.params.offset,
        limit: 50,
        order: [['createdAt', 'DESC']]
      }).catch((err) => {throw err;});
      var ideas = await Promise.all(dbIdeas.map(idea => addVotes(idea))) 
      ideas.sort((a,b) => {
        if (a.upvoteCount - a.downvoteCount > b.upvoteCount - b.downvoteCount) {
          return 1;
        }
        if (a.upvoteCount - a.downvoteCount < b.upvoteCount - b.downvoteCount) {
          return -1;
        }
        return 0;
      }).reverse();
      res.send(ideas);
    } else if(req.params.category === 'Energy' && req.params.sort === 'trending'){
      var dbIdeas = await Idea.findAll({
        include: [{
          model: User,
          attributes: [
            ['fname', 'fname'],
            ['lname', 'lname']
          ]},
          {
            association: 'developer',
            attributes: [
              ['fname', 'fname'],
              ['lname', 'lname']
          ]}
        ],
        where: {active: true, category: 'Energy'},
        offset: req.params.offset,
        limit: 50,
        order: [['createdAt', 'DESC']]
      }).catch((err) => {throw err;});
      var ideas = await Promise.all(dbIdeas.map(idea => addVotes(idea))) 
      ideas.sort((a,b) => {
        if (a.upvoteCount - a.downvoteCount > b.upvoteCount - b.downvoteCount) {
          return 1;
        }
        if (a.upvoteCount - a.downvoteCount < b.upvoteCount - b.downvoteCount) {
          return -1;
        }
        return 0;
      }).reverse();
      res.send(ideas);
    } else if(req.params.category === 'Manufacturing' && req.params.sort === 'trending'){
      var dbIdeas = await Idea.findAll({
        include: [{
          model: User,
          attributes: [
            ['fname', 'fname'],
            ['lname', 'lname']
          ]},
          {
            association: 'developer',
            attributes: [
              ['fname', 'fname'],
              ['lname', 'lname']
          ]}
        ],
        where: {active: true, category: 'Manufacturing'},
        offset: req.params.offset,
        limit: 50,
        order: [['createdAt', 'DESC']]
      }).catch((err) => {throw err;});
      var ideas = await Promise.all(dbIdeas.map(idea => addVotes(idea))) 
      ideas.sort((a,b) => {
        if (a.upvoteCount - a.downvoteCount > b.upvoteCount - b.downvoteCount) {
          return 1;
        }
        if (a.upvoteCount - a.downvoteCount < b.upvoteCount - b.downvoteCount) {
          return -1;
        }
        return 0;
      }).reverse();
      res.send(ideas);
    } else {
      throw 'Invalid category';
    }
  } catch(e) {
    return res.status(400).json({
      errors: {
        error: e.stack
      },
    });
  }
}


// GET /ideas/:sort/:offset
const getIdeas = async function (req, res) {
  try {
    if (req.params.sort === 'new') {
      var dbIdeas = await Idea.findAll({
        include: [{
            model: User,
            attributes: [
              ['fname', 'fname'],
              ['lname', 'lname']
            ]},
          { 
            association: 'developer',
            attributes: [
              ['fname', 'fname'],
              ['lname', 'lname']
            ]}
        ],
        where: {active: true},
        offset: req.params.offset,
        limit: 50,
        order: [['createdAt', 'DESC']]
      }).catch((err) => {throw err;});
      var ideas = await Promise.all(dbIdeas.map(idea => addVotes(idea))) 
      res.send(ideas);
    } else if (req.params.sort === 'trending') {
     var dbIdeas = await Idea.findAll({
        include: [{
          model: User,
          attributes: [
            ['fname', 'fname'],
            ['lname', 'lname']
          ]},
          {
            association: 'developer',
            attributes: [
              ['fname', 'fname'],
              ['lname', 'lname']
          ]}
        ],
        where: {active: true},
        offset: req.params.offset,
        limit: 50,
        order: [['createdAt', 'DESC']]
      }).catch((err) => {throw err;});
      var ideas = await Promise.all(dbIdeas.map(idea => addVotes(idea))) 
      ideas.sort((a,b) => {
        if (a.upvoteCount - a.downvoteCount > b.upvoteCount - b.downvoteCount) {
          return 1;
        }
        if (a.upvoteCount - a.downvoteCount < b.upvoteCount - b.downvoteCount) {
          return -1;
        }
        return 0;
      }).reverse();
      res.send(ideas);

    // Not really a sort but gets only ideas the user has interacted with.
    // Stuck it here because the route is the same format.
    // Also I felt this query was too complicated to do with sequelize so that's why
    // it's a raw query instead.
    } else if (req.params.sort === 'interacted') {
      [dbIdeas, metadata] = await db.sequelize.query(
        'SELECT DISTINCT "Ideas".*, "Users".fname, "Users".lname, developer.fname AS developer_fname, developer.lname AS developer_lname FROM "Votes" JOIN "Ideas" ON "Votes"."IdeaId" = "Ideas".id LEFT OUTER JOIN "Comments" ON "Ideas".id = "Comments"."IdeaId" JOIN "Users" ON "Ideas"."UserId" = "Users".id LEFT OUTER JOIN "Users" AS "developer" ON "Ideas"."developerId" = "Users".id WHERE ("Ideas"."UserId" = ' + req.session.user.id + ' OR "Votes"."UserId" = ' + req.session.user.id + 'OR "Comments"."UserId" = ' + req.session.user.id + ') AND "Ideas".active = true ORDER BY "updatedAt" OFFSET ' + req.params.offset + 'ROWS FETCH NEXT 50 ROWS ONLY'
      ).catch((err) => {throw err;});
      dbIdeas.map(idea => {
        idea.User = {};
        idea.User.fname = idea.fname;
        idea.User.lname = idea.lname;
        delete idea.fname;
        delete idea.lname;
        if (idea.developerId !== null) {
          idea.developer = {};
          idea.developer.fname = idea.developer_fname;
          idea.developer.lname = idea.developer_lname;
        } else { 
          idea.developer = null;
        }
        delete idea.developer_fname;
        delete idea.developer_lname;
        return idea;
      });
      var ideas = await Promise.all(dbIdeas.map(idea => addVotes(idea))) 
      res.send(ideas);
    } else {
      throw "invalid sort method";
    }
  } catch(e) {
    return res.status(400).json({
      errors: {
        error: e.stack
      },
    });
  }
}

// Adds votes to an idea object
const addVotes = async idea => {
  var upvoteCount = await Vote.count({ where: {'up': true, 'IdeaId': idea.id} });

  var downvoteCount = await Vote.count({ where: {'down': true, 'IdeaId': idea.id} });

  var averageRating = await Rating.findOne({
    attributes: ['IdeaId', [Sequelize.fn('AVG', 
      Sequelize.col('rating')), 'rating'
    ]],
    group: ['IdeaId'],
    where: {'IdeaId': idea.id}
  });

  return await {
    idea,
    upvoteCount,
    downvoteCount,
    averageRating
  }
}

/*
// Average rating of an idea object
const averageRating = async idea => {
  var averageRating = await Rating.findAll({
    attributes: ['id', [models.sequelize.fn('AVG', 
      models.sequelize.col('rating')), 'averageRating'
    ]],
    group: ['id'],
    where: {'id': idea.id}
  });
  
  return await {
    idea,
    averageRating
  }
}
*/


// GET /idea/:id
const getSingleIdea = async function(req, res) {
  try {
    var dbIdea = await Idea.findByPk(req.params.id, {
      include: [{
        model: User,
        attributes: [
          ['fname', 'fname'],
          ['lname', 'lname']
        ]},
        {
        association: 'developer',
        attributes: [
          ['fname', 'fname'],
          ['lname', 'lname']
        ]}
      ],
    }).catch(err => {throw err;});
    var upvoteCount = await Vote.count({ where: {'up': true, 'IdeaId': req.params.id} });
    var downvoteCount = await Vote.count({ where: {'down': true, 'IdeaId': req.params.id} });
    var idea = await addVotes(dbIdea) 
    res.send(idea);
  } catch (e) {
    return res.status(500).json({
      errors: {
        error: e.stack
      },
    });
  }
};



// POST /ideas
const postIdea = (req, res) => {
  Idea.create({
    title: req.body.title,
    category: req.body.category,
    description: req.body.description,
    community_impact: req.body.community_impact,
    nature_impact: req.body.nature_impact,
    arts_impact: req.body.arts_impact,
    energy_impact: req.body.energy_impact,
    manufacturing_impact: req.body.manufacturing_impact,
    UserId: req.session.user.id
  }).then((idea) => {
    res.status(200).send(idea);
  }).catch((e) => {
    return res.status(500).json({
      errors: {
        error: e.stack
      },
    });
  });
};

// PUT /idea/:id
const editIdea = (req, res) => {
  Idea.findByPk(req.params.id).then(idea => {
    if (req.session.user.id != idea.UserId) {
      return res.status(401).send("Unauthorized");
    }
  });
  try {
    Idea.update({
      title: req.body.title,
      category: req.body.category,
      description: req.body.description,
      community_impact: req.body.community_impact, 
      nature_impact: req.body.nature_impact,
      arts_impact: req.body.arts_impact,
      energy_impact: req.body.energy_impact,
      manufacturing_impact: req.body.manufacturing_impact,
    }, { where: {id: req.params.id}});
    res.status(200).end();
  } catch(e){
    return res.status(500).json({
      errors: {
        error: e.stack
      },
    });
  }
};

// DELETE /idea/:id
const deleteIdea = (req, res) => {
  Idea.findByPk(req.params.id).then(idea => {
    if (req.session.user.id != idea.UserId) {
      return res.status(401).send("Unauthorized");
    }
  });
  try {
    Idea.update({
      active: false
    }, { where: {id: req.params.id}});
    res.status(200).end();
  } catch(e){
    return res.status(500).json({
      errors: {
        error: e.stack
      },
    });
  }
};

const upvote = async function (req, res) {
  try {
    var existingVote = await Vote.findOne({ where: {UserId: req.session.user.id, IdeaId: req.params.id}});
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
      }).catch((err) => {throw err;});

      // Did we transition to a proposal state?
      var upvoteCount = await Vote.count({ where: {'up': true, 'IdeaId': req.params.id} }).catch((err) => {throw err;});
      var downvoteCount = await Vote.count({ where: {'down': true, 'IdeaId': req.params.id} }).catch((err) => {throw err;});
      if (upvoteCount + downvoteCount >= 50) {
        if (downvoteCount == 0) { downvoteCount = 1; } // avoid divide by zero
        if ((upvoteCount/downvoteCount * 100) >= 70) {
          Idea.update({state: 'proposal'}, { where: {id: req.params.id}}).catch((err) => {throw err;});
        }
      }//else if upvote over 100 => update state: collaborations
      //else  upvote over 500 => update state: project
      res.status(200).end();
    }
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

// POST /idea/:id/rate
const rate = async function (req, res) {
  try {
    var existingRating = await Rating.findOne({ where: {UserId: req.session.user.id, IdeaId: req.params.id}});
    if (existingRating != null) {
      return res.status(409).json({
        errors: {
          error: 'You have already rated',
        },
      });
    } else {
      Rating.create({
        UserId: req.session.user.id,
        IdeaId: req.params.id,
        rating: req.body.rating
      }).catch((err) => {throw err;});
      res.status(200).end();
    }
  } catch(e) {
    return res.status(400).json({
      errors: {
        error: e.stack,
      }
    });
  }
};

// PUT /idea/:id/developer
const assignDeveloper = async function (req, res, next) {
  await Idea.findByPk(req.params.id).then(idea => {
    if (req.session.user.id != idea.UserId) {
      return res.status(401).send("Unauthorized");
    }
  }).catch((e) => { 
    return res.status(401).send("Unauthorized");
  });
  try {
    await Idea.update({
      developerId: req.body.developerId,
      state: 'collaboration',
    }, { where: {id: req.params.id}});
    res.status(200).end();
  } catch(e){
    return res.status(400).json({
      errors: {
        error: e.stack
      },
    });
  }
};

module.exports = {
  getIdeas,
  getSingleIdea,
  postIdea,
  getIdeasByCategory,
  editIdea,
  deleteIdea,
  upvote,
  downvote,
  rate,
  assignDeveloper,
};

