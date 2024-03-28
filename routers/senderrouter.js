
//this is sender router

const mongoose = require('mongoose');

const ObjectId = mongoose.Types.ObjectId;
const Parcel = require('../models/parcel.js')
const Sender = require('../models/sender.js'); //


module.exports = {
getAll: function (req,res){
    //    Sender.findOneAndUpdate({_id: ObjectId(req.body._id)},req.body,function(err,sender){

        Sender.find({name:req.params.name})
        .populate('parcelArr')
        .exec(function (err,sender){
            if (err) return res.json(err);
            if (!sender) return res.status(404).json();
    
            res.json(sender);

    });

}, //ok 

createOne: function (req,res){
    let avalue = req.body; 
    avalue._id = new mongoose.Types.ObjectId();

    let BSender = new Sender(avalue)
    BSender.save(function(err){
        console.log("Create successfully");

        //if (err) return res.status(400).json(err);

        res.json(BSender);
    });
    
},
getOne: function (req,res){
    Sender.findOne({name:req.params.name})
    .populate('parcel')
    .exec(function (err,sender){
        console.log(sender)
        if (err) return res.json(err);
        if (!sender) return res.status(404).json();

        res.json(sender);
    });//

},
updateOne: function(req,res){
    Sender.findOneAndUpdate({_id: ObjectId(req.body._id)},req.body,function(err,sender){
       // console.log(_id);
        if (err) return res.status(400).json(err);
        if (!sender) return res.status(404).json();

        res.json(sender);

    });

},
deleteOne: function(req,res){
    Sender.findOneAndRemove({_id:ObjectId(req.body._id)},req.body, function(err,sender){
        if (err) return res.status(400).json(err);
       // console.log(_id);
        if (!sender)
        console.log("deleted Successfully")
        res.json();
    });
},//deleteOne is the same logic as updateOne

addParcel: function(req,res){
    //step 1: check if the sender exists
    let pParcel = new Parcel(req.body.parcelArr)
    Sender.findOne({_id: ObjectId(req.body._id)},function(err,sender){
        if (err) return res.status(400).json(err);
        if (!sender) return res.status(404).json();
        pParcel.sender = sender;

        //step 2: create the parcel and save it to the database 
    
            pParcel.save(function(err,parcel){
                if (err) return res.status(400).json(err);
            sender.parcelArr.push(pParcel);
            sender.save(function (err,result) {
                if (err) return res.status(400).json(err);
                res.json(parcel);
            //if (err) return res.status(400).json(err);
            //res is the last line 
            });
            //if (err) return res.status(400).json(err);
        });
        
    //step 3: to add the parcel to the sender's list of parcel and save 
    
});

}}

