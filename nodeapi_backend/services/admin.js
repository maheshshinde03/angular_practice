const db = require('../config/db.config');

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




module.exports = {
    getAllUsers,
}