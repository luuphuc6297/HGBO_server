const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

let User = mongoose.model('User');
const send = require('../send');


router.post('/register', (req, res, next)=>{
    const user = new User({
        email: req.body.email,
        password: req.body.password
    });
    user.save()
});
router.post('/signup', async (req, res, next) => {
    let body = req.body;
    // Check email
    let userByEmail = await User.findOne({email: body.email}).exec();
    if(userByEmail) {
        return send.fail(res, 'Đã tồn tại email')
    }
    return send.success(res, 'Ok', {})
    /*
    User.findOne({email:req.body.email}).then(user =>{
        if(user){
            return res.status(409).json({
                message: "EXIST MAIL"
            })
        }else {
            bcrypt.hash(req.body.password, 10, (err, hash) =>{
                if(err){
                    return res.status(500).json({error: err});
                }
                else
                {
                    const user = new User({
                        email: req.body.email,
                        password: hash
                    });
                    user
                        .save()
                        .then(result =>{
                            res.status(201).json({
                                message: "CREATED USER"
                            })
                        })
                        .catch(err =>{
                            res.status(500).json({error: err});
                   })
                }
            })
        }
    });
    */
});
module.exports = router;