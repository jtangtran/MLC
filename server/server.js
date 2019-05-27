const express = require('express');
var cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const cookieParser = require('cookie-parser');
app.use(cookieParser());
app.use(cors());
const port = 3000;

const db = require('./db/models/index');
const sequelize = db.sequelize;

require('./config/passport');
const passport = require('passport');
const auth = require ('./controllers/auth');
var session = require("express-session");
app.use(session({ secret: "?Jmapv57ueVK!#6@WZJ-VMs7W#@?&!RX" }));
app.use(passport.initialize());
app.use(passport.session());


passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  db.User.findByPk(id, function(err, user) {
    console.log(id);
    done(err, user);
  });
});

const ideaController = require('./controllers/idea');
const userController = require('./controllers/user');
const blogController = require('./controllers/blog');

app.get('/', auth.optional, (req, res) => res.send('Welcome to My Living City!'));

app.get('/ideas', auth.optional, ideaController.getAllIdeas);
app.get('/ideas/:id', auth.optional, ideaController.getSingleIdea);
app.post('/ideas', auth.required, bodyParser.json(), ideaController.postIdea);

app.post('/user/register', auth.optional, bodyParser.json(), userController.register);
app.post('/user/login', auth.optional, bodyParser.json(), userController.login);
app.get('/user/me', auth.required, userController.getCurrentUser);

app.get('/blog/:id', auth.optional, blogController.getBlog);


app.listen(port, () => console.log(`My Living City listening on port ${port}!`));
