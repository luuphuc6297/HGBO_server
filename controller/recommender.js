const mongoose = require('mongoose');
const send = require('../routes/send');
const Major = mongoose.model('Major');
const University = mongoose.model('University');

exports.Recommender = (req, res, next) => {
    var uni = req.query.code;
    var response = [];
    var uniMajor = Major.findOne({ year: "2018", "uni": uni }).then(
        university => {
            var major = Major.find({ year: "2018" }).then(
                result => {
                    // console.log(result)
                    for (var i = 0; i < result.length; i++) {
                        var count = 0;
                        if (result[i].uni == university.uni) {
                            continue;
                        }
                        for (var j = 0; j < result[i].mjs.length; j++) {
                            for (var k = 0; k < university.mjs.length; k++) {
                                if (university.mjs[k].code == result[i].mjs[j].code) {
                                    count++;
                                }
                            }
                        };
                        var obj = {
                            uni: result[i].uni,
                            count: count
                        };
                        response.push(obj);
                    };
                    // console.log(response)
                    response.sort((a, b) => {
                        if (a.count > b.count) {
                            return -1;
                        }
                        if (a.count < b.count) {
                            return 1;
                        }
                        return 0;
                    })
                    // console.log(response)
                    promise = [];
                    for (x = 0; x < response.length; x++) {
                        unicode = response[x].uni;
                        promise.push(University.find({ code: unicode }));
                    }
                    promise = promise.splice(0, 5)
                    Promise.all(promise).then(results => send.success(res, 'Get Recommender successful', results));
                }
            )
        }
    )
}

