const db = require('../config/db.config');



    async function login(data) {
        return new Promise(function (resolve, reject) {
            db.query(
                'SELECT * FROM users WHERE email = ? AND password = ?', [data.email, data.password], (err, rows) => {
                    if (!err) {
                        if (rows.length > 0) {
                            resolve({ message: 'password matched', rows });
                        } else {
                            reject({ message: 'password does not match' });
                        }
                    } else {
                        reject({ message: 'An error occurred while querying the database' });
                    }
                });
        });
    }


/*-----------------------Get User Data-----------------------*/

async function getAllUsers() {

    return new Promise(function (resolve, reject) {
        db.query(
            'select name, email, mobile, city from users', (err, rows) => {
                if (!err) {
                    resolve(rows);
                } else {
                    resolve(null);
                }
            })
    })
}


/*-----------------------Add User Data-----------------------*/

async function addUsers(user) {
   
    return new Promise(function (resolve, reject) {
       
        db.query('INSERT INTO users (name, email, mobile, city, password) VALUES (?, ?, ?, ?, ?)', [user.fullname, user.email, user.mobile, user.city, user.password],
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

module.exports = {
    getAllUsers,
    addUsers,
    login
}