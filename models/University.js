const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');

let universitySchema = new mongoose.Schema({
    code: {type: String, trim: true, unique: true, index: true},
    nameVN: {type: String, index: true},
    nameEN: {type: String, index: true},
    cateName: {type: String, index: true},
    type: {type: Number, index: true},
    logo: String,
    year: String,
    address: String,
    thumnaildefault: String,
    weblink: String,
    uni: {type: Boolean, index: true},
    description: [],
});
universitySchema.method.JSONor = function () {
    return {
        code: this.code,
        nameVN: this.nameVN,
        nameEN: this.nameEN,
        logo: this.logo,
        year: this.year,
        address: this.address,
        thumnaildefault: this.thumnaildefault,
        weblink: this.weblink,
        uni: this.uni,
        description: this.description,
    }
};
universitySchema.plugin(mongoosePaginate);
module.exports = mongoose.model('University', universitySchema);