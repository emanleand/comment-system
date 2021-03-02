'use strict';
let User = require('../models/user');
let validator = require('validator');
let bcript = require('bcrypt');
let jwt = require('../services/jwt');

let controller = {
    test: function (req, res) {
        return res.status(200).send({
            message: 'message from test'
        })
    },
    save: function (req, res) {
        let params = req.body;

        let validateName = !validator.isEmpty(params.name);
        let validateSurname = !validator.isEmpty(params.surname);
        let validateEmail = !validator.isEmpty(params.surname) && validator.isEmail(params.email);

        if (validateName &&
            validateSurname &&
            validateEmail
        ) {

            let user = new User();
            user.name = params.name;
            user.surname = params.surname;
            user.email = params.email;
            user.password = params.password
            user.role = 'ROLE_USER';
            user.image = null

            //verified user duplicate
            User.findOne({ email: user.email }, (err, issetUser) => {
                if (err) {
                    return res.status(409).send({
                        message: 'error to verified'
                    });
                }
                if (issetUser) {
                    return res.status(409).send({
                        message: 'user duplicate'
                    });
                }
                //cifre password
                bcript.hash(params.password, 10, (err, hash) => {
                    if (err) {
                        return res.status(409).send({
                            message: 'error to save user'
                        });
                    }
                    user.password = hash;

                    //save user
                    user.save((err, userStored) => {
                        if (err) {
                            return res.status(409).send({
                                message: 'error to save user'
                            });
                        }

                        if (!userStored) {
                            return res.status(409).send({
                                message: 'error to save user'
                            });
                        }

                        return res.status(200).send({
                            status: 'success',
                            user: userStored
                        });
                    });
                });
               
            })
        } else {
            return res.status(400).send({
                message: 'error in validation'
            })
        }
    },
    login: function (req, res) {
        let params = req.body;
        let validateEmail = !validator.isEmpty(params.email) && validator.isEmail(params.email);
        let validatePassword = !validator.isEmpty(params.password);

        if (!validateEmail || !validatePassword) {
            return res.status(400).send({
                message: 'values incorrect'
            });
        }
        //find user in system
        User.findOne({ email: params.email.toLowerCase() }, (err, user) => {
            if (err) {
                return res.status(409).send({
                    message: 'error to identified'
                });
            }

            if (!user) {
                return res.status(400).send({
                    message: 'user not found'
                });
            }
            //validate credential
            bcript.compare(params.password, user.password, (err, check) => {
                if (err) {
                    return res.status(409).send({
                        message: 'error to validate credential'
                    });
                }

                if (!check) {
                    return res.status(400).send({
                        message: 'credential not validate'
                    });
                }
                //generete token
                if (params.gettoken) {
                    return res.status(200).send({
                        token: jwt.createToken(user)
                    });
                } else {
                    //clear password before show it
                    user.password = undefined;
                    return res.status(200).send({
                        message: 'success',
                        data: user
                    });
                }
            });
        });

    },
    update: function (req, res) {
        try {
            let params = req.body;
            let validateName = !validator.isEmpty(params.name);
            let validateSurname = !validator.isEmpty(params.surname);
            let validateEmail = !validator.isEmpty(params.surname) && validator.isEmail(params.email);

            delete params.password;

            if (!validateName ||
                !validateSurname ||
                !validateEmail
            ) {
                return res.status(400).send({
                    status: 'error',
                    user: 'bad request'
                })
            }
            // verified user duplicate
            if (req.user.email !== params.email) {
                User.findOne({ email: params.email }, (err, issetUser) => {
                    if (err) {
                        return res.status(409).send({
                            message: 'error to verified user'
                        });
                    }
                    if (issetUser) {
                        return res.status(409).send({
                            message: 'email duplicate'
                        });
                    }
                });
            } else {
                //find user
                User.findByIdAndUpdate(req.user.sub, params, { new: true }, (err, userUpdate) => {
                    if (err || !userUpdate) {
                        return res.status(409).send({
                            status: 'error',
                            user: 'user not found'
                        })
                    }
    
                    return res.status(200).send({
                        status: 'success',
                        user: userUpdate
                    })
                });
            }


        } catch (error) {
            return res.status(409).send({
                status: 'conflict'
            });
        }
    }
};

module.exports = controller;