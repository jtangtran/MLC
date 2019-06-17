const passport = require('passport');
const LocalStrategy = require('passport-local');
const db = require('../db/models/index');
const User = db.User;
const sequelize = db.sequelize;

//POST new user route (optional, everyone has access)
const register = (req, res, next) => {
  const { body: { user } } = req;

  User.findOne({ where: {email: user.email} }).then(existingUser => {
    if (existingUser != null) {
      return res.status(409).json({
        errors: {
          email: 'already exists',
        },
      });
    } else {
      if(!user.email) {
        return res.status(422).json({
          errors: {
            email: 'is required',
          },
        });
      }
      if(!user.password) {
        return res.status(422).json({
          errors: {
            password: 'is required',
          },
        });
      }
      User.create(user)
        .then((user) => res.json({'user': user.toAuthJSON() }));
      }
  });
};

//POST login route (optional, everyone has access)
const login = (req, res, next) => {
  const { body: { user } } = req;

  if(!user.email) {
    return res.status(422).json({
      errors: {
        email: 'is required',
      },
    });
  }

  if(!user.password) {
    return res.status(422).json({
      errors: {
        password: 'is required',
      },
    });
  }

  return passport.authenticate('local', { session: true }, (err, passportUser, info) => {
    if(err) {
      return next(err);
    }

    if(passportUser) {
      const user = passportUser;
      user.token = passportUser.generateJWT();
      req.session.user = user;
      res.cookie('authToken', user.token, { 
        maxAge: 30 * 60 * 60 * 24 * 1000  // 30 days in ms
      });
      return res.json({ user: user.toAuthJSON() });
    }

    return res.status(400).info;
  })(req, res, next);
};

const logout = (req, res, next) => {
  req.session.destroy();
  res.clearCookie('authToken');
  res.clearCookie('connect.sid');
  res.status(200).end();
};

//GET current route (required, only authenticated users have access)
const getCurrentUser = (req, res, next) => {
  const { payload: { id } } = req;

  return User.findByPk(id)
    .then((user) => {
      if(!user) {
        return res.sendStatus(400);
      }

      return res.json({ user: user.toAuthJSON() });
    });
};

module.exports = {
  register,
  login,
  logout,
  getCurrentUser
};
