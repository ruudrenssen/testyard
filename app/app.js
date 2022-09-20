const path = require('path'); // native node
const express = require('express'); // packages
const exphbs = require('express-handlebars');

const homeRouter = require('./views/home/home.router');
const experimentsRouter = require('./views/experiments/experiments.router');

const app = express();

app.use(express.static('static')); // serve static files

app.set('views', path.join(__dirname, 'views')); // config views
app.engine('handlebars', exphbs({
  extname: 'handlebars',
  defaultLayout: 'main',
  layoutsDir: __dirname + '/layouts',
  partialsDir: __dirname + '/partials'
}));
app.set('view engine', 'handlebars');

app.use('/', homeRouter); // routes
app.use('/experiments', experimentsRouter); // routes

module.exports = app;
