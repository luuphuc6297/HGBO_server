const mongoose = require('mongoose');
const panginate = require('mongoose-paginate');

const send = require('../routes/send');
let MajorUpdate = mongoose.model('MajorUpdate');

exports.MajorUpdate_get_all = function (req, res ,next) {
    let page = parseInt(req.query.page);
    let limit = parseInt(req.query.limit);

    MajorUpdate.paginate({}, {page:page , limit: limit})
        .then(doc =>{
            return send.success(res, 'HANDLING GET REQUEST TO /major', doc)
        })
        .catch(err =>{
            return send.error(res, "SOME THING WRONG", err)
        });
};
exports.MajorUpdate_get_id= function (req, res, next) {
    const id = req.param('majorUpdateId');
    MajorUpdate.find({code: id})
        .then(response => {
            return  send.success(res, 'HANDLING GET REQUEST TO /majorUpdateId/', response);
        })
        .catch(err =>{
            return send.error(errors, "SOME THING WRONG", err);
        });
};

exports.MajorUpdate_post = (req, res, next) =>{
    const major = new MajorUpdate({
        uni: req.body.uni,
        mjs: req.body.mjs
    });
    MajorUpdate.findOne({id: major.uni})
        .then(response => {
            if(response){
                return send.fail(res, "EXIST YEAR UPDATE", response);
            }
            else {
                major.save()
                    .then(result =>{
                        return send.success(res, "CREATE MAJOR SUCCESSFUL", result)
                    })
                    .catch(err =>{
                        return send.error(res, "SOME THING WRONG", err)
                    })
            }
        })
        .catch(err => {
            return send.error(res, "FAIL SOME THING", err)});
};
exports.MajorUpdate_delete =(req, res, next)=>{
    const id = req.param('majorUpdateId');
    MajorUpdate.remove({_id: id})
        .then(result =>{
            return send.success(res, "DELETE SUCCESSFUL", result)
        })
        .catch(err =>{
            return send.error(res, "SOME THING WRONG", err)
        })
};