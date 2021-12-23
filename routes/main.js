const express = require('express');
const {TodoRecord} = require("../records/todo.record");

const mainRouter = express.Router();

mainRouter
    .get('/',(req,res) => {
        res.redirect('/task');
    })

module.exports = {
    mainRouter,
}