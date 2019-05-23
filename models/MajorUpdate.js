const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');

let majorUpdateSchema = new mongoose.Schema({
    uni: {type: String, unique: true, index: true},
    mjs: []
});

majorUpdateSchema.method.JSONor = function () {
    return {
        uni: this.uni,
        mjs: this.mjs
    }
};

majorUpdateSchema.plugin(mongoosePaginate);
mongoose.model('MajorUpdate', majorUpdateSchema);
