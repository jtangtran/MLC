const db = require('../db/models/index');
const Comment = db.Comment; 
const User = db.User;

// GET /:type/:id/comments
const getComments = (req, res) => {
  if (req.params.type === 'blog') { 
    Comment.findAll({
      where: {
        'BlogId': req.params.id
      },
      active: true,
      include: [{
        model: User,
        attributes: [
          ['fname', 'fname'],
          ['lname', 'lname']
        ]}
      ],
      }).then(comments => {
      res.send(comments);
    })
    .catch(err => {
      return res.status(500).json({
        errors: {
          error: err.stack
        },
      });
    });
  } else if (req.params.type === 'idea') {
    Comment.findAll({
      where: {
        'IdeaId': req.params.id
      },
      active: true,
      include: [{
        model: User,
        attributes: [
          ['fname', 'fname'],
          ['lname', 'lname']
        ]}
      ],
    }).then(comments => {
      res.send(comments);
    })
    .catch(err => {
      return res.status(500).json({
        errors: {
          error: err.stack
        },
      });
    });
  }
};

// POST /:type/:id/comment
const addComment = (req, res, next) => {
  try {
    if (req.params.type === 'blog') {
      Comment.create({
        text: req.body.text,
        active: true,
        UserId: req.session.user.id,
        BlogId: req.params.id,
      }).catch((err) => { throw err;});

    } else if (req.params.type === 'idea') {
      Comment.create({
        text: req.body.text,
        active: true,
        UserId: req.session.user.id,
        IdeaId: req.params.id, 
      }).catch((err) => { throw err;});
    }
    res.status(200).end();
  } catch(e){
      return res.status(400).json({
          errors: {
            error: e.stack
          },
      });
  }
};

// PUT /comment/:id
const editComment = (req, res) => {
  Comment.findByPk(req.params.id).then(comment => {
    if (req.session.user.id != comment.UserId) {
      return res.status(401).send("Unauthorized");
    }
  });
  try {
    Comment.update({
      text: req.body.text,
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

// DELETE /comment/:id
const deleteComment = (req, res) => {
  Comment.findByPk(req.params.id).then(comment => {
    if (req.session.user.id != comment.UserId) {
      return res.status(401).send("Unauthorized");
    }
  });
  try {
    Comment.update({
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

module.exports = {
  getComments,
  addComment,
  editComment,
  deleteComment,
};

