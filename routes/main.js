const express = require('express');

const mainRouter = express.Router();

mainRouter
    .get('/',(req,res) => {
        res.redirect('/task');
    })

module.exports = {
    mainRouter,
}