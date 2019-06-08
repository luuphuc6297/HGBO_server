const mongoose = require('mongoose');
const panginate = require('mongoose-paginate');

const send = require('../routes/send');
let GroupMajor = mongoose.model('GroupMajor');

exports.GroupMajor_get_all = async (req, res, next) => {
    let page = parseInt(req.query.page);
    let limit = parseInt(req.query.limit);

    GroupMajor.paginate({}, {page: page, limit: limit})
        .then(doc => {
            return send.success(res, 'GET GROUP MAJOR ALL SUCCESS', doc)
        })
        .catch(err => {
            return send.fail(res, 'SOME THING WRONG', err)
        })
};
exports.GroupMajor_get_code_major = (req, res, next) => {
    const code = req.query.majorCode;
    GroupMajor.aggregate([
        {
            $lookup:
                {
                    from: 'majors',
                    localField: "code",
                    foreignField: "code",
                    as: "Group_and_Major"
                },
        },
        {
            $match: {code: code}
        }
    ]).exec((err, result) => {
        if (err) {
            console.log(err);
            return send.fail(error, "FAIL SOME THING", err);
        } else {
            console.log(result);
            return send.success(res, "SUCCESSFUL", result);
        }
    })
};

exports.GroupMajor_post = (req, res, next) => {
    const groupMajor = new GroupMajor({
        name: req.body.name,
        major: req.body.major,
    });

    GroupMajor.findOne({name: groupMajor.name})
        .then(response => {
            if (response) {
                return send.fail(res, "EXIST YEAR UPDATE", response);
            } else {
                groupMajor.save()
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

exports.GroupMajor_delete = (req, res, next) => {
    const id = req.param('groupMajorId');
    GroupMajor.remove({_id: id})
        .then(result => {
            return send.success(res, "DELETE SUCCESSFUL", result)
        })
        .catch(err => {
            return send.error(res, "SOME THING WRONG", err)
        })
};