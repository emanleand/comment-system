'use Strict';

const Topic = require('../models/topic');
const validator = require('validator');

let controller = {
    add: function (req, res) {

        let topicId = req.params.topic;

        Topic.findById(topicId).exec((err, topic) => {
            if (err) {
                return res.status(409).send({
                    message: 'Conflict'
                });
            }

            if (!topic) {
                return res.status(403).send({
                    message: 'Resource not found'
                });
            }
            /* validate input comment */
            if (validator.isEmpty(req.body.content)) {
                return res.status(400).send({
                    message: 'Bad Request'
                });
            }
            /* set comment */
            let comment = {
                user: req.user.sub,
                content: req.body.content
            }
            topic.comments.push(comment);
            /* set topic whit comment */
            topic.save((err, topicStored) => {
                if (err || !topicStored) {
                    return res.status(409).send({
                        message: 'Conflict'
                    });
                }

                return res.status(200).send({
                    topicStored
                });

            })
        });
    },
    update: function (req, res) {
        let commentId;

        try {
            commentId = req.params.comment;
            /* validate input comment */
            if (validator.isEmpty(req.body.content)) {
                return res.status(400).send({
                    message: 'Bad Request'
                });
            }

        } catch (err) {
            return res.status(400).send({
                message: 'Bad Request'
            });
        }

        Topic.findOneAndUpdate(
            {'comments._id': commentId},
            {
                '$set': {
                    'comments.$.content': req.body.content
                }
            },
            {new: true},
            (err, topicUpdate) => {
                if (err) {
                    return res.status(403).send({
                        message: 'Resource not found'
                    });
                }
    
                if (!topicUpdate) {
                    return res.status(403).send({
                        message: 'Resource not found'
                    });
                }

                return res.status(200).send({
                    topicUpdate
                });
            }
        )
    },
    delete: function (req, res) {
        let topicId;
        let commentId;

        try {
            topicId = req.params.topic;
            commentId = req.params.comment;
        } catch (err) {

            return res.status(400).send({
                message: 'Bad Request'
            });
        }

        Topic.findById(topicId, (err, topic) => {
            if (err) {
                return res.status(403).send({
                    message: 'Resource not found'
                });
            }

            if (!topic) {
                return res.status(403).send({
                    message: 'Resource not found'
                });
            }
            /* search document comment to delete */
            let comment = topic.comments.id(commentId);
            if (!comment) {

                return res.status(403).send({
                    message: 'Resource not found'
                });
            }
            /* Remove comment and update topic */
            comment.remove();

            topic.save((err, topicStored) => {
                if (err || !topicStored) {
                    return res.status(409).send({
                        message: 'Conflict'
                    });
                }

                return res.status(200).send({
                    topic
                });
            })
        });
    },
}

module.exports = controller;