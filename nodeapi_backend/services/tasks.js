const db = require('../config/db.config');

async function getAllTask(id) {
    return new Promise(function (resolve, reject) {
       console.log(id);
        db.query(
            'select * from tasks where userId = ?' , [id.userId], (err, rows) => {
                if (!err) {
                    resolve(rows);
                } else {
                    resolve(null);
                }
            })
    })
}


async function getTaskByTd(data) {
    return new Promise(function (resolve, reject) {
        db.query(
            'select * from tasks where id = ?',[data.task_id], (err, rows) => {
                if (!err) {
                    resolve(rows);
                } else {
                    resolve(null);
                }
            })
    })
}

async function addTask(task) {
    //console.log(task); 
    return new Promise(function (resolve, reject) {      
        db.query('INSERT INTO tasks (userId, title, description) VALUES (?, ?, ?)', [task.userId, task.title, task.description],
            (error) => {
                if (error) {
                    resolve('error');
                }
                else {
                    const message = { status: 'OK' };
                    resolve(message);
                }
            }
        );
    })
}

async function updateTask(task) {
    return new Promise(function (resolve, reject) {
        db.query(
            'UPDATE tasks SET title = ?,  description = ? WHERE id=?', [task.title, task.description, task.id],
            (error) => {
                if (error) {
                    resolve('error');

                } else {
                    const message = { status: 'OK' };
                    resolve(message);
                }
            }
        );
    })
}


async function deleteTask(data) {
    return new Promise(function (resolve, reject) {
        db.query(
            'DELETE FROM tasks WHERE id = ?', [data.id],
            (error) => {
                if (error) {
                    resolve('error');

                } else {
                    const message = { status: 'OK' };
                    resolve(message);
                }
            }
        );
    })
}


module.exports = {
    getAllTask,
    getTaskByTd,
    addTask,
    updateTask,
    deleteTask
}