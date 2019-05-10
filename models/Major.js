const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');

let majorSchema = new mongoose.Schema({
   uni: {type: String, unique: true, index: true},
   year: String,
   fee: String,
   mjs: []
});
majorSchema.method.JSONor = function () {
    return{
        uni: this.uni,
        year: this.year,
        mjs: this.mjs
    }
};
majorSchema.plugin(mongoosePaginate);
mongoose.model('Major', majorSchema);