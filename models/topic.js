'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//model comment
const CommentSchema = Schema({
    content: String,
    date: { type: Date, default: Date.now },
    user:{ type: Schema.ObjectId, ref: 'User'}
});

//to create a specific comment
let Comment = mongoose.model('Comment', CommentSchema);

// model topic
const TopicSchema = Schema({
    title: String,
    content: String,
    code: String,
    lang: String,
    date: { type: Date, default: Date.now },
    user:{ type: Schema.ObjectId, ref: 'User'},
    comments: [CommentSchema]
});

//Make lowercase and pluralize the name
module.exports = mongoose.model('Topic', TopicSchema) ;
//The collection will be renamed as users 