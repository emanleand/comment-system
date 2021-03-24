'use strict';
let express = require('express');
let userController = require('../controllers/user');
let mdAuth = require('../middlewares/authenticated');
//this enables the reception of a binary file
let multiparty = require('connect-multiparty');
let mdUpload = multiparty({uploadDir: './uploads/users'});

//upload object route
let router = express.Router();

//routes user
router.post('/register', userController.save);
router.post('/login', userController.login);
router.put('/update', mdAuth.authenticated, userController.update);
router.post('/upload-avatar', [mdAuth.authenticated, mdUpload], userController.uploadAvatar);
router.get('/get-avatar/:fileName', userController.getAvatar);
router.get('/user/list', userController.list);
router.get('/user/:id', userController.user);

module.exports = router;