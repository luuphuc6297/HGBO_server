const router = require('express').Router();
const mongoose = require('mongoose');
const paginate = require('mongoose-paginate');

let send = require('../send');
let Major = mongoose.model('Major');

router.use('/insert', require('./insert'));

router.get('/', async (req, res, next) =>{
    let page = parseInt (req.query.page);
    let limit = parseInt(req.query.limit);

    Major.paginate({page: page, limit: limit}).exec()
        .then(doc =>{
            return send.success(res,'HANDLING GET REQUEST TO /major', doc);
        })
        .catch(err =>{
            console.log(err);
            res.status(500).json({error: err})
        });

});

router.get('/:majorId', (req, res, next) =>{
    const id = req.params.majorId;
    Major.paginate({uni: id})
        .then(response =>{
            return send.success(res , 'HANDING GET REQUEST TO /major/uni', response);
        })
        .catch(err =>{
            console.log(err);
            res.status(500).json({error: err});
        });
});
router.post('/',(req, res, next) =>{
    const major = new Major({
        _id: new mongoose.Types.ObjectId(),
        uni: req.body.uni,
        year: req.body.year,
        fee: req.body.fee,
        mjs: req.body.mjs
    });
    Major.paginate({uni: major.uni})
        .then(respone => {
        console.log(respone);
        if(respone.total >0){
            res.status(201).json({
                message: "EXIST CODE"
            })
        }
        else {major.save()
            .then(result =>{
                console.log(result);
                res.status(201).json({
                    message: "CREATED MAJOR",
                    createdMajor: Major
                })
            .catch(err =>{
                console.log(err);
                res.status(500).json({error: err})
                })
            })
        }
    })
    .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
        });
    });
});
router.delete('/majorId', (req, res, next)=>{
    const id = req.params.majorId
    Major.remove({_id: id})
        .then(result =>{
            console.log(result);
            res.status(201).json({
                message: "DELETE SUCCESSFUL"
            })
        })
        .catch(err =>{
            console.log(err);
            res.status(500).json({error: err})
        })
});
module.exports = router;