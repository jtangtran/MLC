const express = require('express');
var cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const cookieParser = require('cookie-parser');
var multer = require('multer');
multer = multer({storage: multer.memoryStorage()});
app.use(cookieParser());
app.use(cors());
const port = 3001;

const db = require('./db/models/index');
const sequelize = db.sequelize;
sequelize.sync();

require('./config/passport');
const passport = require('passport');
const auth = require ('./controllers/auth');
var session = require("express-session");
app.use(session({
  secret: "?Jmapv57ueVK!#6@WZJ-VMs7W#@?&!RX",
  cookie: {
    maxAge: 30 * 60 * 60 * 24 * 1000, // 30 days in milliseconds
    secure: process.env.NODE_ENV === "production"
  } 
}));
app.use(passport.initialize());
app.use(passport.session());


passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  db.User.findByPk(id, function(err, user) {
    done(err, user);
  });
});

const validateLogin = function(req, res, next) {
  if (req.session.user) {
    next();
  } else {
    res.status(401).send("Not logged in");
  }
}

const ideaController = require('./controllers/idea');
const userController = require('./controllers/user');
const blogController = require('./controllers/blog');
const commentController = require('./controllers/comment');
const imageController = require('./controllers/image');

app.get('/', auth.optional, (req, res) => res.send('Welcome to My Living City!'));

app.get('/ideas/:sort/:offset', ideaController.getIdeas);
app.get('/idea/:id', ideaController.getSingleIdea);
app.delete('/idea/:id', validateLogin, ideaController.deleteIdea);
app.put('/idea/:id', validateLogin, bodyParser.json(), ideaController.editIdea);
app.post('/idea', bodyParser.json(), ideaController.postIdea);

app.get('/:category/ideas/:sort/:offset', auth.optional, ideaController.getIdeasByCategory);

app.post('/idea/:id/upvote', validateLogin, ideaController.upvote);
app.post('/idea/:id/downvote', validateLogin, ideaController.downvote);
app.post('/idea/:id/rate', validateLogin, bodyParser.json(), ideaController.rate);
app.put('/idea/:id/developer', validateLogin, bodyParser.json(), ideaController.assignDeveloper);

app.get('/:type/:id/comments', commentController.getComments);
app.post('/:type/:id/comment', validateLogin, bodyParser.json(), commentController.addComment);
app.post('/comment/:id/upvote', validateLogin, bodyParser.json(), commentController.upvote);
app.post('/comment/:id/downvote', validateLogin, bodyParser.json(), commentController.downvote);
app.post('/comment/:id/rate', validateLogin, bodyParser.json(), commentController.rate);
app.put('/comment/:id', validateLogin, bodyParser.json(), commentController.editComment);
app.delete('/comment/:id', validateLogin, commentController.deleteComment);

app.post('/user/register', bodyParser.json(), userController.register);
app.post('/user/login', bodyParser.json(), userController.login);
app.post('/user/logout', validateLogin, userController.logout);
app.get('/user/me', validateLogin, userController.getCurrentUser);
app.get('/roles', userController.getRoles);
app.get('/users', userController.getUsers);

app.get('/blogs', blogController.getBlogs);
app.get('/blog/:id', blogController.getBlog);
app.post('/blog', validateLogin, bodyParser.json(), blogController.postBlog);
app.put('/blog/:id', validateLogin, bodyParser.json(), blogController.editBlog);
app.delete('/blog/:id', validateLogin, blogController.deleteBlog);

app.get('/image/:filename', imageController.getImage);
app.get('/:type/:id/images', imageController.getImageUrls);
app.post('/:type/:id/images', validateLogin, multer.array('file'), imageController.postImage);

app.listen(port, () => console.log(`My Living City listening on port ${port}!`));
