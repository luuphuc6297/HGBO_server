const router = require('express').Router();
const mongoose = require('mongoose');
const paginate = require('mongoose-paginate');

let send = require('../send');
let Major = mongoose.model('Major');

router.use('/insert', require('./insert'));

router.get('/', async (req, res, next) =>{
    let major = await Major.find({}).exec();
    return send.success(res,'HANDLING GET REQUEST TO /major', major);
});

router.get('/:majorId', (req, res, next) =>{
    const id = req.params.majorId;
    Major.paginate({uni: id})
        .then(response =>{
            return send.success(res , 'HANDING GET REQUEST TO /major/uni', response);
        })
        // .then(doc =>{
        //     console.log((doc));
        //     if (doc) {
        //         res.status(200).json({
        //             massage: "GET SUCCESSFUL"
        //         })
        //     }else {
        //         res.status(404).json({})
        //     }
        // })
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
        mjs: req.body.mjs
    });
    major.save()
        .then(result => {
        console.log(result);
    })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
    res.status(201).json({
        message: "POST SUCCESS",
        createdMajor: Major
    });
});
router.delete('/:majorId', (req,res,next)=>{
    res.status(200).json({
        message:"DELETE SUCCESSFUL"
    })
});

module.exports = router;