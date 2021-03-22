'use strict';
let express = require('express');

/* Upload object route */
let router = express.Router();

let topicController = require('../controllers/topic');
let mdAuth = require('../middlewares/authenticated');

/* Routes */
router.get('/topic/test', topicController.test);
router.post('/topic', mdAuth.authenticated, mdAuth.authenticated, topicController.save);
router.get('/topic/list/:page?', topicController.listTopic);
router.get('/topic/list-user/:user', topicController.listTopicByUser);
router.get('/topic/detail/:topic', topicController.detailTopic);
router.put('/topic/:topic', mdAuth.authenticated, topicController.updateTopic);
router.delete('/topic/:topic', mdAuth.authenticated, topicController.deleteTopic);

module.exports = router;