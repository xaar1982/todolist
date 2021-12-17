const express = require('express');

const mainRouter = express.Router();

mainRouter
    .get('/', (req,res) => {
        res.render('main/index');
    })

module.exports = {
    mainRouter,
}