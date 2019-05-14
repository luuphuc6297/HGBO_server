const mongoose = require('mongoose');
const paginate = require('mongoose-paginate');
const send = require('../routes/send');
let University = mongoose.model('University');


exports.Uni_get_all = (req, res, next) => {
    let page = parseInt (req.query.page);
    let limit = parseInt(req.query.limit);

    University.paginate({page: page, limit: limit})
        .then(doc => {
            return  send.success(res, 'HANDLING GET REQUEST TO /school', doc);
        })
        .catch(err =>{
            return send.error(res, 'SOME THING WRONG', err)
        });
};

exports.Uni_get_id =  (req, res, next)=>{
    const id = req.params.universityId;
    University.find({code: id})
        .then(response => {
            return  send.success(res, 'HANDLING GET REQUEST TO /school/code', response);
        })
        .catch(err =>{
            return send.error(errors, "SOME THING WRONG", err);
        });
};
exports.Uni_get_name_uni = (req, res, next ) =>{
    let nameVN = req.params.name;
    nameVN = nameVN.replace('-', ' ');
    University.find({$text:{$search: `\"${nameVN}\"`}})
        .then((result) =>{
            res.status(201).json(result)
                .catch(err =>{
                    res.status(500).json({error: err})
                });
        })
};

exports.Uni_post = (req, res,next)=>{
    const university =  new University({
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
            if (response){
                return send.fail(res, 'EXIST CODE')
            }
            else {
                university.save()
                    .then(result => {
                        return send.success(res, 'CREATE SUCCESSFUL', result)
                    })
                    .catch(err => {
                        return send.error(res, 'SOME THING WRONG', err)
                    })
            }
        })
        .catch(err =>{
            return send.success(res, "SOME THING WRONG", err)
        });
};
exports.Uni_delete = (req, res, next) =>{
    const id = req.params.universityId;
    University.remove({_id: id})
        .then(() =>{
            res.status(201).json({
                message:"DELETE SUCCESSFUL",
            })
        .catch(err =>{
        res.status(500).json({error: err})
             });
        })
};



