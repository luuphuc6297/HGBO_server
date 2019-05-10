const mongoose = require('mongoose');
const validator = require('validator');
const userSchema = mongoose.Schema({
    // userName: {type: String, unique: true, index: true},
    email: {type: String, unique: true, index: true, trim: true ,
        validator: {
            validator: validator.isEmail,
            message: '{VALUE} is not a valid email',
            isAsync: false
        }},
    password: {type: String, require: true, trim: true },
});

userSchema.method.JSONor = function(){
    return {
        email: this.email,
        password: this.password
    }
};
module.exports =  mongoose.model('User', userSchema);