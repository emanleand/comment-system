'use strict';
let jwt = require('jwt-simple');
let moment = require('moment');
let secret = 'secret-proof';
//next: this allow the stream to exit the middleware and run the following code
exports.authenticated = function(req, res, next) {
    //verified header
    if (!req.headers.authorization) {
        return res.status(401).send({
            message: 'unauthorized'
        })
    }
    //clear token
    let token = req.headers.authorization.replace(/["']+/g, '');
    //decode token
    try {
        let payload = jwt.decode(token, secret);
        if (payload.exp <= moment().unix()) {
            return res.status(401).send({
                message: 'unauthorized'
            })
        }

        req.user = payload;
        next();
    } catch (error) {
        return res.status(401).send({
            message: 'unauthorized'
        })
    }
}