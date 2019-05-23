const mongoose = require('mongoose');
const data = require('./config/config');
mongoose.connect(data.MongoURI, {useNewUrlParser: true});
// const panginate = require('mongoose-paginate');
//
// const send = require('../routes/send');

require('./models/Major');

let Major = mongoose.model('Major');


(async ()=>{
    console.log("Demo");
    const majorYearly = await Major.find({"uni": "QSC"}, {"mjs": {$elemMatch: {code: "7480103"}}}, function (err, majors) {
        if (err) {
            console.log(err);
        } else {
            majors.forEach((major) => {
                console.log(major);

            });
            return;
        }

    });
    // console.log("Major", majorYearly);
})();