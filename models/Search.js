const mongoose = require('mongoose');

let searchSchema = mongoose.Schema({
    key: {type: String, trim: true, index: true},
    times: {type: Number, index: true},
    date: {type: Date}
});
searchSchema.method.JSONor = function () {
    return {
        key: this.key,
        times: this.times,
        date: this.date
    }
};
module.exports = mongoose.model('Search', searchSchema);