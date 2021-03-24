'use strict';
let User = require('../models/user');
let bcript = require('bcrypt');
let jwt = require('../services/jwt');
let fs = require('fs');
let path = require('path');
const {
    schemaCreateUser,
    schemaLoginUser,
    schemaUpdateUser
} = require('../services/schemas/user');

let controller = {
    save: function (req, res) {
        try {
            let Schemy = schemaCreateUser();
            if (!Schemy.validate(req.body)) {
                return res.status(400).send(
                    Schemy.getValidationErrors()
                );
            }
        } catch (err) {

            return res.status(400).send({
                message: 'Bad Request'
            });
        }
        /* prepare new User */
        let user = new User();

        let params = req.body;
        user.name = params.name;
        user.surname = params.surname;
        user.email = params.email;
        user.password = params.password
        user.role = 'ROLE_USER';
        user.image = null

        /* verified user duplicate */
        User.findOne({ email: user.email }, (err, issetUser) => {
            if (err) {
                return res.status(409).send({
                    message: 'Conflict'
                });
            }
            if (issetUser) {
                return res.status(400).send({
                    message: 'Email duplicate'
                });
            }
            /* cifre password */
            bcript.hash(params.password, 10, (err, hash) => {
                if (err) {
                    return res.status(409).send({
                        message: 'The password could not be encrypted'
                    });
                }
                user.password = hash;

                /* Save User */
                user.save((err, userStored) => {
                    if (err) {
                        return res.status(409).send({
                            message: 'The user could not be stored'
                        });
                    }

                    if (!userStored) {
                        return res.status(409).send({
                            message: 'The user could not be stored'
                        });
                    }

                    return res.status(200).send({
                        user: userStored
                    });
                });
            });
        });
    },
    login: function (req, res) {
        let Schemy = schemaLoginUser();
        if (!Schemy.validate(req.body)) {
            return res.status(400).send(
                Schemy.getValidationErrors()
            );
        }

        let params = req.body;
        User.findOne({ email: params.email.toLowerCase() }, (err, user) => {
            if (err) {
                return res.status(409).send({
                    message: 'Conflict'
                });
            }

            if (!user) {
                return res.status(403).send({
                    message: 'User not found'
                });
            }
            /* validate credential */
            bcript.compare(params.password, user.password, (err, check) => {
                if (err) {
                    return res.status(409).send({
                        message: 'imposible to validate credential'
                    });
                }

                if (!check) {
                    return res.status(400).send({
                        message: 'credential not validate'
                    });
                }
                /* generete token */
                if (params.gettoken) {
                    return res.status(200).send({
                        token: jwt.createToken(user)
                    });
                }
                /* clear password before show it */
                user.password = undefined;
                return res.status(200).send({
                    data: user
                });
            });
        });

    },
    update: async function (req, res) {
        try {
            let Schemy = schemaUpdateUser();
            if (!Schemy.validate(req.body)) {

                return res.status(400).send(
                    Schemy.getValidationErrors()
                );
            }
        } catch (err) {

            return res.status(400).send({
                message: 'Bad Request'
            });
        }

        let params = req.body;
        delete params.password;

        try {
            /* find user */
            User.findByIdAndUpdate(req.user.sub, params, { new: true }, (err, userUpdate) => {
                if (err || !userUpdate) {
                    return res.status(409).send({
                        message: 'User not found or Email duplicate'
                    });
                }

                return res.status(200).send({
                    user: userUpdate
                });
            });
        } catch (err) {

            return res.status(409).send({
                status: 'conflict'
            });
        }
    },
    uploadAvatar: function (req, res) {

        /* get file */
        let fileName = 'file not upload';
        if (!req.files) {
            return res.status(400).send({
                message: fileName
            });
        }

        let filePath = req.files.file.path;
        let fileSplit = filePath.split('/');
        fileName = fileSplit[2];

        /* get extension and validate */
        let extSplit = fileName.split('.');
        let fileExtension = extSplit[1];

        if (fileExtension != 'png' &&
            fileExtension != 'jpg' &&
            fileExtension != 'jpeg' &&
            fileExtension != 'gif'
        ) {
            fs.unlink(filePath, (err) => {
                if (err) {
                    return res.status(409).send({
                        message: 'extension not validate '
                    });
                } else {
                    return res.status(400).send({
                        message: 'extension not validate '
                    });
                }
            });

        } else {
            let userId = req.user.sub;
            User.findByIdAndUpdate({ _id: userId }, { image: fileName }, { new: true }, (err, userUpdated) => {
                if (err || !userUpdated) {
                    return res.status(409).send({
                        message: 'error by upload file'
                    });
                }

                return res.status(200).send({
                    user: userUpdated
                });
            });
        }
    },
    getAvatar: function (req, res) {
        let fileName = req.params.fileName;
        let filePath = './uploads/users/' + fileName;

        fs.exists(filePath, (exists) => {
            if (!exists) {

                return res.status(403).send({
                    message: 'avatar not found'
                });
                
            }

            return res.sendFile(path.resolve(filePath));
        });
    },
    list: function (req, res) {
        User.find().exec((err, users) => {
            if (err || !users) {

                return res.status(403).send({
                    message: 'users not found'
                });
            }

            return res.status(200).send({
                users
            });
        })
    },
    user: function (req, res) {
        let id = req.params.id;
        User.findById(id).exec((err, user) => {
            if (err || !user) {
                return res.status(403).send({
                    message: 'User not found'
                });
            }

            return res.status(200).send({
                user
            });
        });
    }

};

module.exports = controller;