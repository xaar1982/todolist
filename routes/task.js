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
    .get('/forms/edit/:id', async (req,res) =>{
        const task = await TodoRecord.find(req.params.id);
        if (!task) {
            throw new Error('Task not found');
        }

        res.render('forms/edit', {
            task,
        })

    })
    .post('/', async (req,res) => {
        const {title, createDate } = req.body;
        if (TodoRecord._validate(title, createDate, req, res)) {
            const newToDoTask = new TodoRecord({
                title,
                createDate,
            })
            await newToDoTask.insert();
            await renderAll(res);
        }
    })
    .put('/:id', async (req,res) => {
        const id = req.params.id;
        const { title, createDate } = req.body;
        if (TodoRecord._validate(title, createDate, req, res)) {
            const task = await TodoRecord.find(id);
            task.title = title;
            task.createDate = createDate;
            await task.update();
            await renderAll(res);
        }
    })
    .delete('/:id' , async (req,res) => {
        const id = req.params.id;
        const task = await TodoRecord.find(id);
        await task.delete();
        await renderAll(res);
    })

module.exports = {
    taskRouter,
}