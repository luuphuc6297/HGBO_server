const mongoose = require('mongoose');
const router = require('express').Router();
let send = require('../send');
let University = mongoose.model('University');

router.use('/insert', require('./insert'));

router.get('/', (req, res, next) => {
    let page = parseInt (req.query.page);
    let limit = parseInt(req.query.limit);

    University.paginate({page: page, limit: limit})
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
});
router.post('/',(req, res,next)=>{
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
    University.paginate({code: university.code})
        .then(response => {
            console.log(response);
            if (response.total > 0){
                res.status(201).json({
                     message: "EXIST CODE"
                 })
            }
            else {university.save()
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
            }
        })
        .catch(err =>{
            console.log(err);
            res.status(500).json({error: err})
    });
});
// router.patch('/:universityId', (req, res, next) =>{
//     const id = req.params.universityId;
//     const updateOps ={};
//     for (const ops of req.body){
//         updateOps[ops.propName] = ops.value;
//     }
//     University.update({code: id}, {$set: updateOps })
//         .exec()
//         .then(result =>{
//             res.status(200).json({
//                 message: 'UNIVERSITY UPDATED',
//                 request:{
//                     type: 'GET',
//                     url: 'http://localhost:3009/school' + id
//                 }
//             })
//         })
//         .catch(err =>{
//             res.status(500).json({error: err});
//         })
// });
router.delete('/:universityId', (req, res, next) =>{
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
});
module.exports = router;