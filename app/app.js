const path = require('path'); // native node

const express = require('express'); // packages
const exphbs = require('express-handlebars');

const dashboardRouter = require('./views/dashboard/dashboard.router');
const experimentsRouter = require('./views/experiments/experiments.router');

const app = express();

app.use(express.static('static')); // serve static files

app.set('views', path.join(__dirname, 'views')); // config views
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

app.use('/', dashboardRouter); // routes
app.use('/experiments', experimentsRouter); // routes

module.exports = app;
