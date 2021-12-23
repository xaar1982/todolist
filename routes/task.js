const express = require('express');
const {TodoRecord} = require("../records/todo.record");

const taskRouter = express.Router();

const renderAll = async (res) => {
    res.render('tasks/list-all', {
        tasks:  await TodoRecord.findAll()
    });
}

taskRouter
    .get('/', async (req,res) => {
        await renderAll(res);
    })
    .post('/', async (req,res) => {
        const {title} = req.body;
        const newToDoTask = new TodoRecord({
            title,
        })
        const newId = await newToDoTask.insert();
        await renderAll(res);
    })

module.exports = {
    taskRouter,
}