const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');

let majorUpdateSchema = new mongoose.Schema({
    uni: {type: String, unique: true, index: true},
    // mjs: [{
    //     code: {type: String, unique: true},
    //     name: {type: String},
    //     group: {type: String},
    //     point: [{
    //         year: {type: Number}
    //     }],
    //     note: {type: String}
    // }]
    // nameVN: {type: String, index: true},
    // logo: String,
    // description: [],
    mjs: []
});

majorUpdateSchema.method.JSONor = function () {
    return {
        uni: this.uni,
        // nameVN: this.nameVN,
        // logo: this.logo,
        mjs: this.mjs
    }
};

majorUpdateSchema.plugin(mongoosePaginate);
mongoose.model('MajorUpdate', majorUpdateSchema);
