'use strict';
const validator = require('validator');
const Topic = require('../models/topic');

let controller = {
    test: function (req, res) {
        return res.status(200).send({
            message: 'hello topic controller test'
        });
    },
    save: function (req, res) {
        let param = req.body;

        if (validator.isEmpty(param.title) ||
            validator.isEmpty(param.content) ||
            validator.isEmpty(param.lang)
        ) {
            return res.status(400).send({
                message: 'Bad Request'
            });
        }

        let topic = new Topic();
        topic.title = param.title;
        topic.content = param.content;
        topic.lang = param.lang;
        topic.code = param.code;
        topic.user = req.user.sub;

        topic.save((err, topicStored) => {
            if (err || !topicStored) {
                return res.status(403).send({
                    message: 'conflict'
                });
            }

            return res.status(200).send({
                message: 'success',
                topicStored
            });
        });
    },
    listTopic: function (req, res) {
        /* library for paginated was add in the model */
        let page = 1;
        if (req.params.page &&
            req.params.page !== 0 &&
            !isNaN(Number(req.params.page))) {
            page = parseInt(req.params.page, 10);
        }
        /* prepare option of pagination */
        let option = {
            sort: { date: -1 },
            populate: 'user',
            limit: 5,
            page: page
        }

        Topic.paginate({}, option, (err, topics) => {
            if (err) {
                return res.status(403).send({
                    message: 'conflict'
                });
            }

            return res.status(200).send({
                topics: topics.docs,
                totalDocs: topics.totalDocs,
                totalPages: topics.totalPages
            });
        })
    },
    listTopicByUser: function (req, res) {
        let userId = req.params.user;

        Topic.find({
            user: userId
        })
            .sort([['date', 'descending']])
            .exec((err, topics) => {

                if (err || !topics) {
                    return res.status(403).send({
                        message: 'Resource not found'
                    });
                }

                return res.status(200).send({
                    topics
                });
            });
    },
    detailTopic: function (req, res) {
        let topicId = req.params.topic;
        Topic.findById(topicId)
            .populate('user')
            .exec((err, topic) => {
                if (err || !topic) {
                    return res.status(403).send({
                        message: 'Resource not found'
                    });
                }

                return res.status(200).send({
                    topic
                });
            });
    },
    updateTopic: function (req, res) {
        let param;

        try {
            param = req.body;
            if (validator.isEmpty(param.title) ||
                validator.isEmpty(param.content) ||
                validator.isEmpty(param.lang)
            ) {
                return res.status(400).send({
                    message: 'Bad Request'
                });
            }

        } catch (err) {
            return res.status(400).send({
                message: 'Bad Request'
            });
        }

        let update = {
            title: param.title,
            content: param.content,
            code: param.code,
            lang: param.lang
        }

        let topicId = req.params.topic;
        Topic.findByIdAndUpdate({
            _id: topicId,
            user: req.user.sub
        }, update, { new: true }, (err, topicUpdate) => {

            if (err || !topicUpdate) {
                return res.status(409).send({
                    message: 'conflict'
                });
            }

            return res.status(200).send({
                topicUpdate
            });
        });
    },
    deleteTopic: function (req, res) {
        let topicId = req.params.topic;

        Topic.findByIdAndDelete({
            _id: topicId,
            user: req.user.sub
        }, (err, topicRemoved) => {
            if (err) {
                return res.status(409).send({
                    message: 'conflict'
                });
            }

            if (!topicRemoved) {
                return res.status(403).send({
                    message: 'Resource not found'
                });
            }

            return res.status(200).send({
                topicRemoved
            });
        });
    },
    search: function (req, res) {

        let search = req.params.search;
        if (!search.trim() || search.trim().length <= 1) {
            return res.status(400).send({
                message: 'Bad Request'
            });
        }
        /* find topic */
        Topic.find({
            '$or': [
                { 'title': { '$regex': search.trim(), '$options': 'i' } },
                { 'content': { '$regex': search.trim(), '$options': 'i' } },
                { 'code': { '$regex': search.trim(), '$options': 'i' } },
                { 'lang': { '$regex': search.trim(), '$options': 'i' } }
            ]
        })
            .sort([['date', 'descending']])
            .populate('user')
            .exec((err, topics) => {
                if (err) {
                    return res.status(403).send({
                        message: 'Resource not found'
                    });
                }

                if (!topics) {
                    return res.status(403).send({
                        message: 'Resource not found'
                    });
                }

                return res.status(200).send({
                    topics
                });
            });
    }
}

module.exports = controller;