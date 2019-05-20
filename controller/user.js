const mongoose = require('mongoose');
const passport = require('passport');

let User = mongoose.model('User');

exports.Login_user = (req, res, next) =>{
    res.render('login')
};
exports.Login_successful = (req, res , next) =>{
    res.send('SUCCESSFUL');
};

exports.Secret_user = (req, res, next) =>{
    if(req.isAuthenticated()) {
        res.send('LOGIN SUCCESSFUL');
    }
    else
        res.redirect('/login');
};

exports.Post_user = (req, res, next) =>{
    passport.authenticate('local', { //chọn phương thức check là local => npm install passport-local
        failureRedirect: 'user/login', //điều hướng khi xác thực không đúng
        successRedirect: 'user/login/loginOK' //điều hướng khi xác thực đúng
    })(req, res, next);
};

