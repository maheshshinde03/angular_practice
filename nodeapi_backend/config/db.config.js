const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'mahesh@28',
    database: 'angular_practice',
    multipleStatements: true,
    connectTimeout: 10000,
})

connection.connect(function (err) {
    if (err) {
        console.log(err);
        console.log('Database not Connected')
    }
    else {

        console.log('Database Connected')
    }
});


// connection.connect((err) => {
//     if (err) {
//         throw err;
//     }
//     console.log('MySQL connected');
// });


module.exports = connection;