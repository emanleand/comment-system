'use strict';
const express = require('express');
const bodyParser = require('body-parser');
//run express
let app = express();

/* upload file of route */
const routerUser = require('./routes/user'); 
const routeTopic = require('./routes/topic');
const routeComment = require('./routes/comment');

//Middleware
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//cors
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});


//routes
app.get('/prueba', (req, res) => {
    return res.status(200).send({
        message: 'hello world from bk'
    })
})

// add api to all routes of router user
app.use('/api', routerUser);

// add api to all routes of router topic
app.use('/api', routeTopic);

// add api to all routes of router comment
app.use('/api', routeComment);

//exportar module
module.exports = app;