const express = require('express');
const hbs = require('express-handlebars');
const methodOverride = require('method-override');

const { mainRouter } = require('../routes/main');
const { taskRouter } = require('../routes/task');
const {handlebarsHelpers} = require("../handlebars-helpers");
const {handleError} = require("./errors");

const app = express();

app.use(express.urlencoded({
    extended: true,
}));

app.use(express.static('public'));
app.use(express.json());
app.use(methodOverride('_method'));
app.engine('.hbs', hbs({
    extname: '.hbs',
    helpers: handlebarsHelpers
}));

app.set('view engine', '.hbs');

app.use('/', mainRouter);
app.use('/task', taskRouter);

app.use(handleError);

module.exports = {
    app,
}