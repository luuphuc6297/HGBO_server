const mongoose = require('mongoose');
const panginate = require('mongoose-paginate');

const send = require('../routes/send');
const MajorUpdate = mongoose.model('MajorUpdate');
const University = mongoose.model('University')

exports.MajorUpdate_get_all = function (req, res, next) {
    let page = parseInt(req.query.page);
    let limit = parseInt(req.query.limit);

    MajorUpdate.paginate({}, { page: page, limit: limit })
        .then(doc => {
            return send.success(res, 'HANDLING GET REQUEST TO /major', doc)
        })
        .catch(err => {
            return send.error(res, "SOME THING WRONG", err)
        });
};
// exports.MajorUpdate_get_id = function (req, res, next) {
//     const code = req.query.majorUpdateId;
//     MajorUpdate.find({ mjs: { $elemMatch: { code: code } } })
//         .then(response => {
//             for(i = 0; i < mjs.length; i++) {
//                 var mj = majors[i];
//                 delete mj.point;
//                 delete mj.group;
//                 delete mj.note;
//             }
//             return send.success(res, 'HANDLING GET REQUEST TO /majorUpdateId/', response);
//         })
//         .catch(err => {
//             return send.error(errors, "SOME THING WRONG", err);
//         });
// };

exports.MajorUpdate_get_University_follow_majorCode = function(req, res, next) {

    const codeM = req.query.majorUpdateId;
    const code = req.query.code;

    MajorUpdate.find({ mjs: { $elemMatch: { code: codeM }}}).then(
        result => {
            for (var i = 0; i < result.length; i++){
                var majors = result[i].mjs;
                for (var j = 0; j < majors.length; j++){
                    var mj = majors[j];
                    delete mj.point;
                    delete mj.group;
                    delete mj.note;
                }
            }
            return send.success(res, "Remove field successful", result);
        } 
    )
    University.find({},{"code": code}, (err, data) => {
        const update = {
            name: data.nameVN,
            logo: data.logo,
            address: data.address,
            thumbnail: data.thumnaildefault,
            description: data.description
        }
    MajorUpdate.findOneAndUpdate(
        {"uni": data.code}, 
        {$set: update}, 
        {new: true}, 
        (err, dataNew) => {
            return send.success(res, "Update successful", dataNew);
        })
    })
}

exports.MajorUpdate_Update_logo_fromUni = (req, res, next) =>{
    const code = req.query.code;

    University.findOne({"code": code}, (err, data) => {
        const update = {
            name: data.nameVN,
            logo: data.logo,
            address: data.address,
            thumbnail: data.thumnaildefault,
            description: data.description
        }
    MajorUpdate.findOneAndUpdate(
        {"uni": data.code}, 
        {$set: update}, 
        {new: true}, 
        (err, dataNew) => {
            return send.success(res, "Update successful", dataNew);
        })
    })
}

exports.MajorUpdate_get_avg_major = (req, res, next) => {
    const code = req.query.code;

    MajorUpdate.findOne({uni: code}).then(
        result => {
            var majors = result.mjs
            console.log(result.mjs)
            var response = [];
            for (var i = 0; i < majors.length; i++){
                var mj = majors[i];
                var sum = 0;
                var count = 0;
                var avg = 0;
                for (var j = 0; j < mj.point.length; j++){
                    for (var key in mj.point[j]){
                        var p = parseFloat(mj.point[j][key])
                        if (!isNaN(p)){
                            sum += p;
                            count++;
                        }
                    }
                }
                avg = count == 0 ? 0 : sum/count;
                mj["avg"] = avg;
                delete mj.point;
                delete mj.group;
                delete mj.note;
                response.push(mj);
            }
            response.sort(function (a, b){
                if (a.avg < b.avg){
                    return 1;
                }
                else {
                    return -1;
                }
            })
            return send.success(res, "Get AVG SUCCESSFUL", response);
        }
    )
};



exports.MajorUpdate_post = (req, res, next) => {
    const major = new MajorUpdate({
        uni: req.body.uni,
        mjs: req.body.mjs
    });
    MajorUpdate.findOne({ id: major.uni })
        .then(response => {
            if (response) {
                return send.fail(res, "EXIST YEAR UPDATE", response);
            } else {
                major.save()
                    .then(result => {
                        return send.success(res, "CREATE MAJOR SUCCESSFUL", result)
                    })
                    .catch(err => {
                        return send.error(res, "SOME THING WRONG", err)
                    })
            }
        })
        .catch(err => {
            return send.error(res, "FAIL SOME THING", err)
        });
};

exports.MajorUpdate_delete = (req, res, next) => {
    const id = req.param('majorUpdateId');
    MajorUpdate.remove({ _id: id })
        .then(result => {
            return send.success(res, "DELETE SUCCESSFUL", result)
        })
        .catch(err => {
            return send.error(res, "SOME THING WRONG", err)
        })
};

