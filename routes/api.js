const express = require ('express');
const router = express.Router();
const Img = require('../models/pictures');
const multer = require('multer');
const mongoose = require('mongoose');

const storage = multer.diskStorage({
        destination: function (req, file, cb) {
        cb(null, './upload/');
        },
        filename: function(req, file, cb){
        cb(null, new Date().toISOString() + file.originalname);
        }
});

const upload = multer({storage: storage});

//pictures from the db
router.get('/pictures', function(req, res, next){
        Img.find()
        .select("name price _id pictureTag")
        .exec()
        .then(docs => {
        const response = {
                count: docs.length,
                products: docs.map(doc => {
                return {
                        name: doc.name,
                        price: doc.price,
                        _id: doc._id,
                        pictureTag:doc.pictureTag,
                        request: {
                                type: "GET",
                                url: "100.25.75.187:3000/api/pictures/" + doc._id
                                }
                        };
                })};
        res.status(200).json(response);
        })
        .catch(err => {
                console.log(err);
                res.status(500).json({
                error: err
                });
                });
        });

// add a new picture to the db
router.post('/pictures', upload.single('productImage'), function(req, res, next){
        console.log(req.file);
        img = new Img({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price,
        pictureTag: req.file.path
        });
        img.save().then(result => {
        console.log(result);res.status(201).json({
         message: "Handling POST requests to /pictures",
         createdProduct: result
        });
        })
        .catch(err =>  { 
        console.log(err);
        res.status(500).json({
                error: err
});
});
});


// update a ninja in the db
router.put('/pictures/:id', function(req, res, next){
    Img.findByIdAndUpdate({_id: req.params.id}, req.body).then(function(){
        Img.findOne({_id: req.params.id}).then(function(pictures){
            res.send(pictures);
        });
    }).catch(next);
});
// delete a ninja from the db
router.delete('/pictures/:id', function(req, res, next){
    Img.findByIdAndRemove({_id: req.params.id}).then(function(pictures){
        res.send(pictures);
    }).catch(next);
});

module.exports = router;


