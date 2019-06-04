const mongoose = require('mongoose');
const panginate = require('mongoose-paginate');

const send = require('../routes/send');
let Major = mongoose.model('Major');

exports.Maj_get_all = async (req, res, next) => {
    let page = parseInt(req.query.page);
    let limit = parseInt(req.query.limit);

    Major.paginate({}, {page: page, limit: limit})
        .then(doc => {
            return send.success(res, 'HANDLING GET REQUEST TO /major', doc);
        })
        .catch(err => {
            return send.fail(res, "SOME THING WRONG", err)
        });
};

exports.Major_get_id_and_year = (req, res, next) => {
    const id = req.param('majorId');
    const idy = req.param('majorYear');
    if (idy) {
        Major.findOne({uni: id, year: idy})
            .then(response => {
                return send.success(res, "GET MAJOR AND YEAR SUCCESSFUL", response)
            })
            .catch(err => {
                return send.fail(errors, "FAIL SOME THING", err)
            })
    } else {
        Major.find({uni: id})
            .then(response => {
                return send.success(res, "GET MAJOR AND YEAR SUCCESSFUL", response)
            })
            .catch(err => {
                return send.fail(errors, "FAIL SOME THING", err)
            })
    }
};
exports.Major_get_majorCode = (req, res, next) =>{
    const code = req.param('majorCode');
    console.log('majorCode');
    Major.find({mjs: {$elemMatch: {code: code}}})
        .then(response => {
            return send.success(res, 'HANDLING GET REQUEST TO /major/majorCode', response);
        })
        .catch(err => {
            return send.error(errors, "SOME THING WRONG", err);
        });
};
exports.Maj_post = (req, res, next) => {
    const major = new Major({
        uni: req.body.uni,
        year: req.body.year,
        fee: req.body.fee,
        mjs: req.body.mjs
    });
    Major.findOne({year: major.year})
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
exports.Maj_delete = (req, res, next) => {
    const id = req.param('majorId');
    Major.remove({_id: id})
        .then(result => {
            return send.success(res, "DELETE SUCCESSFUL", result)
        })
        .catch(err => {
            return send.error(res, "SOME THING WRONG", err)
        })
};