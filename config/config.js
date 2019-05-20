const path = require('path');
const root = path.normalize(__dirname + '/..');

const mainConfig = {
    modelDir: root + '/models',
    controllerDir: root + '/controller',
};

module.exports = {
    MongoURI: 'mongodb+srv://luuphuc:luuphuc@hgbocluster-iirfd.mongodb.net/universityData?retryWrites=true'
};