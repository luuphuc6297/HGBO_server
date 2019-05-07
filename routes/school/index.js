const mongoose = require('mongoose');
const router = require('express').Router();
let send = require('../send');
let University = mongoose.model('University');

router.use('/insert', require('./insert'));

router.get('/', (req, res, next) => {
    // let page = parseInt (req.query.page);
    // let limit = parseInt(req.query.limit);

    University.find({})
        .then(doc => {
        return  send.success(res, 'HANDLING GET REQUEST TO /school', doc);
    })
        .catch(err =>{
            console.log(err);
            res.status(500).json({error: err});
        });
});

router.get('/:universityId', (req, res, next)=>{
    const id = req.params.universityId;
    University.paginate({code: id})
        .then(response => {
            return  send.success(res, 'HANDLING GET REQUEST TO /school/code', response);
        })
        .catch(err =>{
            console.log(err);
            res.status(500).json({error: err});
        });
    // University.findById(id)
    //     .exec()
    //     .then(doc=>{
    //            console.log(doc);
    //            if (doc){
    //                res.status(200).json(doc);
    //            }else {
    //                res.status(404).json({message: "Not Found"});
    //            }
    //         })
    //     .catch(err => {
    //             console.log(err);
    //             res.status(500).json({error: err});
    //         });
});
router.post('/',(req, res, next)=>{
        const university = new University ({
            _id: new mongoose.Schema.Types.ObjectId(),
            code: req.body.code,
            nameVN: req.body.nameVN,
            nameEN: req.body.nameEN,
            logo: req.body.logo,
            year: req.body.year,
            address: req.body.address,
            weblink: req.body.weblink,
            uni: req.body.uni
        });
        university.save()
        .then(result =>{
            console.log(result);
            res.status(201).json({
                message:"CREATED UNIVERSITY",
                createUniversity: University
        })
        .catch(err =>{
            console.log(err);
            res.status(500).json({error: err})
        });
    })
});
router.patch('/:universityId', (req, res, next) =>{
    const id = req.params.universityId;
    const updateOps ={};
    for (const ops of req.body){
        updateOps[ops.propName] = ops.value;
    }
    University.update({code: id}, {$set: updateOps })
        .exec()
        .then(result =>{
            res.status(200).json({
                message: 'UNIVERSITY UPDATED',
                request:{
                    type: 'GET',
                    url: 'http://localhost:3009/school' + id
                }
            })
        })
        .catch(err =>{
            res.status(500).json({error: err});
        })
});
router.delete('/:universityId', (req, res, next) =>{
    const id = req.params.universityId;
    University.remove({code: id})
        .exec()
        .then( res =>{
            res.status(200).json(result =>{
                console.log(result);
            });
        })
        .catch(err =>{
            res.status(500).json({error: err});
        })
});

module.exports = router;