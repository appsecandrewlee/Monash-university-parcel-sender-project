
//this is sender model

const mongoose = require('mongoose')

const Senderschema = mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        auto: true
      },
      //change the string to an object id
      name: {
        type: String, 
        validate: {
          validator: function (nameRes){
            console.log(nameRes)
            return nameRes.length >= 3;
          },
          message: "lol please have a real name"
        },
        required: true
      },
      parcelArr: [{
        type: mongoose.Schema.ObjectId,
        ref: 'parcel' //???
      }]

});

module.exports = mongoose.model('Sender',Senderschema);
