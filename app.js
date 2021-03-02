'use strict';
const express = require('express');
const bodyParser = require('body-parser');
//run express
let app = express();

//upload file of route
const routerUser = require('./routes/user'); 

//Middleware
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//routes
app.get('/prueba', (req, res) => {
    return res.status(200).send({
        message: 'hello world from bk'
    })
})

// add api to all routes of router user
app.use('/api', routerUser);

//exportar module
module.exports = app;