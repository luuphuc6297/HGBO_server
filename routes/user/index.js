const express = require('express');
const router = express.Router();
const passport = require('passport');
const mongoose = require('mongoose');

const UserController = require('../../controller/user');

router.get('/login', UserController.Login_user);

router.get('/loginOK' ,UserController.Login_successful);

router.get('/secret', UserController.Secret_user);

router.post('/login',UserController.Post_user);

module.exports = router;