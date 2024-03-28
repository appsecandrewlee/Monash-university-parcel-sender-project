
//this is parcel model.

const mongoose = require("mongoose")

let parcelSchema = mongoose.Schema({

  
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    auto: true
  },
  //change the string to an object id
  sender: {
   type: mongoose.Schema.Types.ObjectId,
   ref: "Sender"
  }, 

  address:{
    type: String,
    validate:{
      validator: function (aAddress){
        return aAddress.length >= 3;
      },
      message: "lol have a real address"
    },
    required: true
  },

  weight:{
    type: Number,
    validate: {
      validator: function (aNum){
        return aNum > 0;
      },
      message: "thats not a number"
    }
  }, 
  fragile:{
    
    type: String,
    required: true
  }

});

module.exports = mongoose.model('parcel', parcelSchema);


//I have the structure here (schema)

