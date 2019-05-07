const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');

let majorSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
   uni: {type: String, index: true},
   year: String,
   mjs: []
});
majorSchema.method.JSONor = function () {
    return{
        _id: this._id,
        uni: this.uni,
        year: this.year,
        mjs: this.mjs
    }
};
majorSchema.plugin(mongoosePaginate);
mongoose.model('Major', majorSchema);