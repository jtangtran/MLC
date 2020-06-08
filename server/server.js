const express = require('express');
var cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const cookieParser = require('cookie-parser');
var multer = require('multer');
multer = multer({storage: multer.memoryStorage()});
app.use(cookieParser());
app.use(cors());
const port = 3000;

const db = require('./db/models/index');
const sequelize = db.sequelize;
sequelize.sync();

require('./config/passport');
const passport = require('passport');
const auth = require ('./controllers/auth');
var session = require("express-session");
app.use(session({
  secret: "?Jmapv57ueVK!#6@WZJ-VMs7W#@?&!RX",
  cookie: {maxAge: 30 * 60 * 60 * 24 * 1000} // 30 days in milliseconds
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

const ideaController = require('./controllers/idea');
const userController = require('./controllers/user');
const blogController = require('./controllers/blog');
const commentController = require('./controllers/comment');
const imageController = require('./controllers/image');

app.get('/', auth.optional, (req, res) => res.send('Welcome to My Living City!'));

app.get('/ideas/:sort/:offset', auth.optional, ideaController.getIdeas);
app.get('/idea/:id', auth.optional, ideaController.getSingleIdea);
app.delete('/idea/:id', auth.required, ideaController.deleteIdea);
app.put('/idea/:id', auth.required, bodyParser.json(), ideaController.editIdea);
app.post('/idea', auth.required, bodyParser.json(), ideaController.postIdea);
app.post('/idea/:id/upvote', auth.required, ideaController.upvote);
app.post('/idea/:id/downvote', auth.required, ideaController.downvote);
app.put('/idea/:id/developer', auth.required, bodyParser.json(), ideaController.assignDeveloper);

app.post('/user/register', auth.optional, bodyParser.json(), userController.register);
app.post('/user/login', auth.optional, bodyParser.json(), userController.login);
app.post('/user/logout', auth.required, userController.logout);
app.get('/user/me', auth.required, userController.getCurrentUser);
app.get('/users', auth.optional, userController.getUsers);


app.get('/blogs', auth.optional, blogController.getBlogs);
app.get('/blog/:id', auth.optional, blogController.getBlog);
app.post('/blog', auth.required, bodyParser.json(), blogController.postBlog);
app.put('/blog/:id', auth.required, bodyParser.json(), blogController.editBlog);
app.delete('/blog/:id', auth.required, blogController.deleteBlog);

app.get('/:type/:id/comments', auth.optional, commentController.getComments);
app.post('/:type/:id/comment', auth.required, bodyParser.json(), commentController.addComment);
app.put('/comment/:id', auth.required, bodyParser.json(), commentController.editComment);
app.delete('/comment/:id', auth.required, commentController.deleteComment);


app.get('/image/:filename', auth.optional, imageController.getImage);
app.get('/:type/:id/images', auth.optional, imageController.getImageUrls);
app.post('/:type/:id/images', auth.required, multer.array('file'), imageController.postImage);

app.listen(port, () => console.log(`My Living City listening on port ${port}!`));
