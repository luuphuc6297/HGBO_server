const mongoose = require('mongoose');
const panginate = require('mongoose-paginate');

const send = require('../routes/send');
let Major = mongoose.model('Major');

exports.Maj_get_all = async (req, res, next) =>{
    let page = parseInt (req.query.page);
    let limit = parseInt(req.query.limit);

    Major.paginate({page: page, limit: limit})
        .then(doc =>{
            return send.success(res,'HANDLING GET REQUEST TO /major', doc);
        })
        .catch(err =>{
            return send.error(res, "SOME THING WRONG", err)
        });
};
exports.Maj_get_id = (req, res, next) =>{
    const id = req.params.majorId;
    Major.findOne({uni: id})
        .then(response =>{
            return send.success(res , 'HANDING GET REQUEST TO /major/uni', response);
        })
        .catch(err =>{
            return send.error(res, "SOME THING WRONG", err);
        });
};

exports.Maj_post = (req, res, next) =>{
    const major = new Major({
        uni: req.body.uni,
        year: req.body.year,
        fee: req.body.fee,
        mjs: req.body.mjs
    });
    Major.findOne({year: major.year})
        .then(respone => {
            if(respone){
                return send.fail(res, "EXIST YEAR UPDATE", respone);
            }
            else {
                major.save()
                    .then(result =>{
                        return send.success(res, "CREATE MAJOR SUCCESSFUL", result)
                    })
                    .catch(err =>{
                        return send.error(res, "WRONG SOMETHING", err)
                    })
            }
        })
        .catch(err => {
            return send.error(res, "FAIL SOME THING", err)});
};

exports.Maj_delete =(req, res, next)=>{
    const id = req.params.majorId
    Major.remove({_id: id})
        .then(result =>{
            return send.success(res, "DELETE SUCCESSFUL", result)
        })
        .catch(err =>{
            return send.error(res, "SOME THING WRONG", err)
        })
};