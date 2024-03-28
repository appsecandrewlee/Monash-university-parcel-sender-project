
//this is parcel router

const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');

const Parcel = require('../models/parcel.js'); //
const Sender  = require('../models/sender.js');

module.exports = {
getallbyAddress: function(req,res){
Parcel.find({ 'address': req.query.address},function(err,parcel){
    if (err){
        return res.status(400).json(err);
    } else {
        res.json(parcel);
    }

})

},
UpdateParcelAddressID:function(req,res){
    //Sender.findOne({_id: ObjectId(req.body._id)},function(err,sender){

Parcel.findByIdAndUpdate({_id: ObjectId(req.body._id)},{'address': req.body.address},function(err,parcel){
    if (err){
        return res.status(400).json(err);
    } else {
        res.json(parcel);
    }

})

}};

