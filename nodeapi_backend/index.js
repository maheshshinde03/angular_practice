const express = require("express");
const app = express();
const port = 3000;
const cors = require('cors');

const mysql = require('mysql2');

var path = require('path');

const usersRouter = require('./routes/users');
const tasksRouter = require('./routes/tasks');
const adminRouter = require('./routes/admin');

require('dotenv').config()

app.use(express.json());
app.use(cors());

app.use(express.static('upload'));

app.use(
    express.urlencoded({
        extended: true,
    })
);

app.get("/", (req, res) => {
    res.json({ message: "ok" });
});

app.use('/users', usersRouter);
app.use('/tasks', tasksRouter);
app.use('/admin', adminRouter);

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});

