'use strict';
let express = require('express');
let userController = require('../controllers/user');
let mdAuth = require('../middlewares/authenticated');

//upload object route
let router = express.Router();

router.get('/test', userController.test);
//routes user
router.post('/register',userController.save);
router.post('/login',userController.login);
router.put('/update', mdAuth.authenticated, userController.update);

module.exports = router;