const express = require('express');
const {TodoRecord} = require("../records/todo.record");

const mainRouter = express.Router();

mainRouter
    .get('/', async (req,res) => {
        res.render('tasks/list-all', {
            tasks:  await TodoRecord.findAll()
        });
    })

module.exports = {
    mainRouter,
}