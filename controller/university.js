const mongoose = require('mongoose');
const paginate = require('mongoose-paginate');
const send = require('../routes/send');
let University = mongoose.model('University');
let Major = mongoose.model('Major');
let MajorUpdate = mongoose.model('MajorUpdate');
let Search = mongoose.model('Search');

exports.Uni_get_all = (req, res, next) => {
    let page = parseInt(req.query.page);
    let limit = parseInt(req.query.limit);

    University.paginate({}, {page: page, limit: limit})
        .then(doc => {
            return send.success(res, 'HANDLING GET REQUEST TO /school', doc);
        })
        .catch(err => {
            return send.error(res, 'SOME THING WRONG', err)
        });
};
exports.Uni_get_id = (req, res, next) => {
    const id = req.param('unicode');
    University.find({code: id})
        .then(response => {
            return send.success(res, 'HANDLING GET REQUEST TO /school/code', response);
        })
        .catch(err => {
            return send.error(errors, "SOME THING WRONG", err);
        });
};

exports.Uni_get_name_uni = (req, res, next) => {
    let nameVN = req.params.name;

    Search.findOne({key: nameVN})
        .then(async (result) => {
            console.log(result);
            if (result == null) {
                const search = new Search({
                    key: nameVN,
                    times: 1,
                    date: new Date()
                });
                search.save();
            } else {
                await Search.updateOne({key: nameVN}, {$set: {"times": result.times + 1}})
            }
        });
    // nameVN = nameVN.replace('-', ' ');
    University.find({$text: {$search: `\"${nameVN}\"`}})
        .then((result) => {
            res.status(201).json(result)
                .catch(err => {
                    res.status(500).json({error: err})
                });
        })
};

// exports.Uni_get_name_uni = (req, res, next) =>{
//     let nameVN = req.params.name;
//     University.find([
//         {
//             $text:{$search: `\"${nameVN}\"`}
//         },
//         {
//             $count: [{$text:{$search: `\"${nameVN}\"`}}]
//         },
//         {
//             $save: {key: `\"${nameVN}\"`}
//         },
//         {
//             $insert:{key: $save, time: $count}
//         }
//     ])
// };
exports.Uni_post = (req, res, next) => {
    const university = new University({
        code: req.body.code,
        nameVN: req.body.nameVN,
        nameEN: req.body.nameEN,
        logo: req.body.logo,
        year: req.body.year,
        address: req.body.address,
        weblink: req.body.weblink,
        uni: req.body.uni
    });
    University.findOne({code: university.code})
        .then(response => {
            if (response) {
                return send.fail(res, 'EXIST CODE')
            } else {
                university.save()
                    .then(result => {
                        return send.success(res, 'CREATE SUCCESSFUL', result)
                    })
                    .catch(err => {
                        return send.error(res, 'SOME THING WRONG', err)
                    })
            }
        })
        .catch(err => {
            return send.success(res, "SOME THING WRONG", err)
        });
};

exports.Uni_hot_key = (req, res, next) => {
    Search.find().sort({times: -1}).limit(5)
        .then(result => {
            console.log(result);
            return res.status(201).json(result)
        })
        .catch(err => {
            res.status(500).json({errors: err})
        })
};

exports.Uni_delete = (req, res, next) => {
    const id = req.param('universityId');
    University.remove({_id: id})
        .then(() => {
            res.status(201).json({
                message: "DELETE SUCCESSFUL",
            })
                .catch(err => {
                    res.status(500).json({error: err})
                });
        })
};


//Get uni Major follow Uni for web
exports.Uni_get_name_uni_major = (req, res, next) => {
    const code = req.param('universityId');
    const year = req.param('majorYear');

    University.aggregate([
        {
            $match: {code: code}
        },
        {
            $lookup:
                {
                    from: "majors",

                    pipeline: [
                        {$match: {uni: code, year: year}},
                    ],
                    as: "Major_info"
                }
        },
    ]).exec((err, result) => {
        if (err) {
            console.log(err);
            return send.fail(res, "FAIL SOME THING", err)
        } else {
            console.log(result);
            return send.success(res, "SUCCESSFUL", result)
        }
    })
};

// Get uni Major follow Uni for app
exports.Uni_get_name_uni_majorUpdate = (req, res, next) => {
    const code = req.param('universityId');
    University.aggregate([
        {
            $lookup:
                {
                    from: "majorupdates", //Collection to join
                    localField: "code", //Field from the input documents
                    foreignField: "uni", //Field from the documents of the "from" collection
                    as: "Maj_of_Uni"
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