const express = require('express');

const mainRouter = express.Router();

mainRouter
    .get('/', (req,res) => {
        res.render('tasks/list-all');
    })

module.exports = {
    mainRouter,
}