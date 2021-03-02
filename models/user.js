'use strinct';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = Schema({
    name: String,
    surname: String,
    email: String,
    password: String,
    image: String,
    role: String
});

//Make lowercase and pluralize the name
module.exports = mongoose.model('User', userSchema) ;
//The collection will be renamed as users 