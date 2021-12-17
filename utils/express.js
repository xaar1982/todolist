const express = require('express');
const hbs = require('express-handlebars');
const methodOverride = require('method-override');

const { mainRouter } = require('../routes/main');
const {handlebarsHelpers} = require("../handlebars-helpers");

const app = express();

app.use(express.static('public'));
app.use(express.json());
app.use(methodOverride('_method'));
app.engine('.hbs', hbs({
    extname: '.hbs',
    helpers: handlebarsHelpers
}));

app.set('view engine', '.hbs');

app.use('/', mainRouter);

module.exports = {
    app,
}