const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');

let groupMajorSchema = new mongoose.Schema ({
    name: {type: String, unique: true, index: true},
    major: []
});
groupMajorSchema.method.JSONor = function () {
    return {
        name: this.name,
        major: this.major
    }
};
groupMajorSchema.plugin(mongoosePaginate);
mongoose.model('GroupMajor', groupMajorSchema);