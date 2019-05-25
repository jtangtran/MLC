const express = require('express');
var cors = require('cors');
const bodyParser = require('body-parser');

const db = require('./db/models/index');
const sequelize = db.sequelize;

const app = express();
app.use(cors());
const port = 3000;

require('./config/passport');

const ideaController = require('./controllers/idea');
const userController = require('./controllers/user');
const auth = require ('./controllers/auth');

app.get('/', auth.optional, (req, res) => res.send('Welcome to My Living City!'));

app.get('/ideas', auth.optional, ideaController.getAllIdeas);
app.get('/ideas/:id', auth.optional, ideaController.getSingleIdea);
app.post('/ideas', auth.required, bodyParser.json(), ideaController.postIdea);

app.post('/user/register', auth.optional, bodyParser.json(), userController.register);
app.post('/user/login', auth.optional, bodyParser.json(), userController.login);
app.get('/user/me', auth.required, userController.getCurrentUser);

app.listen(port, () => console.log(`My Living City listening on port ${port}!`));
