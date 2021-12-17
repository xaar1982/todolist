const express = require('express');
const hbs = require('express-handlebars');

const { mainRouter } = require('../routes/main');

const app = express();

app.use(express.static('public'));

app.engine('.hbs', hbs({
    extname: '.hbs'
}));

app.set('view engine', '.hbs');

app.use('/', mainRouter);

module.exports = {
    app,
}