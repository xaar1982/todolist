const { pool } = require("../utils/db");
const {v4: uuid} = require('uuid');
const {ValidationError, handleError} = require("../utils/errors");

class TodoRecord {
    constructor(obj,req,res) {
        this.id = obj.id;
        this.title = obj.title;
        this.createDate = obj.createDate;
    }

    static _validate(title, createDate, req, res) {
            if (title.trim().length < 5) {
                return handleError(new ValidationError('Title should be at least 5 char'), req, res);
            }
            else if (title.length > 150) {
                return handleError(new ValidationError('Title should be at most than 150 characters'), req , res);
            }
            else if (createDate === '') {
                return handleError(new ValidationError('Create time cannot be empty'), req, res);
            }
            else {
                return true;
            }
    }

    async insert() {
            this.id = this.id ?? uuid();
            await pool.execute('INSERT INTO `todos` VALUES (:id, :title, :createDate)', {
                id: this.id,
                title: this.title,
                createDate: this.createDate
        })
            return this.id;

    }

    async delete() {
        if (!this.id) {
            throw new Error('Todo has no Id');
        }

        await pool.execute('DELETE FROM `todos` WHERE `id` = :id', {
            id: this.id
        })
    }
    static async find(id) {
        const [results] = await pool.execute('SELECT * FROM `todos` WHERE `id` = :id', {
            id: id
        });
        return new TodoRecord(results[0]);
    }
    static async findAll() {
        const [allTasks]  = await pool.execute('SELECT * FROM `todos` ORDER BY `createDate` ASC');
        return allTasks;
    }


    async update() {
        await pool.execute('UPDATE `todos` SET `title` = :title, `createDate` = :createDate WHERE `id` = :id', {
            id: this.id,
            title: this.title,
            createDate: this.createDate
        });
    }

}

module.exports = {
    TodoRecord,
}