const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
    _id: {type: mongoose.Schema.Types.ObjectId},
    name: {type: String, index: true, require: true},
    email: {type: String, trim: true, require: true,
        validate:{
            validator: validator.isEmail
        }},
    password: {type: String, trim: true, index: true},
});

module.exports = mongoose.model('User', userSchema);
