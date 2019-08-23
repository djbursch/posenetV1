var express = require('express');
var fs = require('fs');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var schema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
        name: {type: String},
        price: {type: Number},
        pictureTag: {type: String} 
});

var Pictures = mongoose.model('pictures', schema);


module.exports = Pictures;
