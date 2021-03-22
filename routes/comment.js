'use strict';

let express = require('express');

/* Upload object route */
let router = express.Router();

let commentController = require('../controllers/comment');
let mdAuth = require('../middlewares/authenticated');

/* Routes */
router.post('/comment/topic/:topic', mdAuth.authenticated, commentController.add);
router.put('/comment/:comment', mdAuth.authenticated, commentController.update);
router.delete('/comment/:topic/:comment', mdAuth.authenticated, commentController.delete);

module.exports = router;