const express = require('express');
const router = express.Router();
const User = require('../models/user');

const bcrypt = require('bcrypt');

router.post('/login', (req, res) => {
    console.log('Here into login', req.body);
    User.findOne({ email: req.body.email })
        .then((findedUserEmail) => {
            console.log('here finded user by email', findedUserEmail);
            if (!findedUserEmail) {
                res.status(200).json({
                    message: '0',
                });
            }
            return bcrypt.compare(req.body.pwd, findedUserEmail.pwd);
        })
        .then((resultAfterPwd) => {
            console.log('here after compare pwd', resultAfterPwd);
            if (!resultAfterPwd) {
                res.status(200).json({
                    message: '1',
                });
            }

            User.findOne({email : req.body.email}).then(
                (finalUser)=>{
                    let userToSend = {
                        id:finalUser._id,
                        firstName : finalUser.firstName,
                        lastName : finalUser.lastName,
                        role : finalUser.role
                    }

                    res.status(200).json({
                        user : userToSend,
                        message : "2",
                    })
                }
            )


        });
});

router.post('/signup', (req, res) => {
    console.log("Here into add user", req.body);

    bcrypt.hash(req.body.pwd, 10).then(
        (cryptedPwd) => {
            console.log("Here result after cryptedPwd", cryptedPwd);
            const user = new User({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                pwd: cryptedPwd,
                role: req.body.role

            });
            user.save().then((result) => {
                console.log("Here result :", result);
                res.status(200).json({
                    message: 'User added with successs'
                });
            });

        }
    );
});



module.exports = router;