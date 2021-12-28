const { pool } = require("../utils/db");
const {v4: uuid} = require('uuid');
const moment = require('moment');
const {ValidatonError} = require("../utils/errors");

class TodoRecord {
    constructor(obj) {
        //this.isValidated = this._validate();

        this.id = obj.id;
        this.title = obj.title;
       // this.createDate = moment(Date.now()).format('YYYY-MM-DD');
        this.createDate = obj.createDate;
        this._validate()

    }

    /* _validate() {
        try {
            if (this.title.trim().length < 5) {
               // throw new Error(' Title should be at least 5 char ');
                throw new ValidatonError('Title should be at least 5 char')
            }
            else if (this.title.length > 150) {
                throw new Error('Todo title should be at most than 150 characters');
            }
            else {
                return {
                    state: true,
                    error: ''
                }
            }
        } catch (err) {
            console.log(err.toString());
            return {
                state: false,
                error: err.toString()
            }
        }

    }*/
    _validate() {
       // try {
            if (this.title.trim().length < 5) {
               // throw new Error(' Title should be at least 5 char ');
                throw new ValidatonError('Title should be at least 5 char')
            }
       //     else if (this.title.length > 150) {
            if (this.title.length > 150) {
                throw new Error('Todo title should be at most than 150 characters');
            }
          //  else {
          //      return {
          //          state: true,
          //          error: ''
          //      }
          //  }
        //} catch (err) {
        //    console.log(err.toString());
        //    return {
        //        state: false,
        //        error: err.toString()
        //    }
        //}

    }

    async insert() {
        if (this.isValidated.state)
        {
            this.id = this.id ?? uuid();
            await pool.execute('INSERT INTO `todos` VALUES (:id, :title, :createDate)', {
                id: this.id,
                title: this.title,
                createDate: this.createDate
            })
            return this.id;
        }
        else {
            this.id = '';
        }
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