const Schemy = require('schemy');

function schemaCreateUser() {
    return new Schemy({
        'name': {
            type: String,
            required: true
        },
        'surname': {
            type: String,
            required: true
        },
        'email': {
            type: String,
            required: true,
            regex: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        },
        'password': {
            type: String,
            required: true
        }
    })
}

function schemaUpdateUser() {
    return new Schemy({
        'name': {
            type: String,
            required: true
        },
        'surname': {
            type: String,
            required: true
        },
        'email': {
            type: String,
            required: true,
            regex: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        }
    })
}

function schemaLoginUser() {
    return new Schemy({
        'email': {
            type: String,
            required: true,
            regex: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        },
        'password': {
            type: String,
            required: true
        },
        'gettoken': {
            type: String
        }
    })
}

module.exports = {
    schemaCreateUser,
    schemaLoginUser,
    schemaUpdateUser
}