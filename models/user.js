'use strinct';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = Schema({
    name: String,
    surname: String,
    email: {
        type: String,
        unique: true
    },
    password: String,
    image: String,
    role: String
});

/* hidden attribute password */
userSchema.methods.toJSON = function() {
    let obj = this.toObject();
    delete obj.password;

    return obj;
}

/* Make lowercase and pluralize the name */
module.exports = mongoose.model('User', userSchema);
/* The collection will be renamed as users */