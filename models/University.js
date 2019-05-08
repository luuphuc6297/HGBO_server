const  mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');

let universitySchema = new mongoose.Schema({
    // _id: mongoose.Schema.Types.ObjectId,
    code: {type: String, index: true},
    nameVN: {type: String, index: true},
    nameEN: {type: String, index: true},
    logo: String,
    year: String,
    address: String,
    weblink: String,
    uni: {type: Boolean , index: true},
    description: [],
});
universitySchema.method.JSONor = function(){
    return {
        // _id: this._id,
        code: this.code,
        nameVN: this.nameVN,
        nameEN: this.nameEN,
        logo: this.logo,
        year: this.year,
        address: this.address,
        weblink: this.weblink,
        uni: this.uni,
        description: this.description,
    }
};
universitySchema.plugin(mongoosePaginate);
mongoose.model('University', universitySchema);