let express = require("express");
let app = express();
let path = require("path");
let morgan = require("morgan");
app.use(morgan('tiny'));
app.use("/assets",express.static('images')); //image
app.use(express.static('css'));
app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html'); 
app.use("/css",express.static(path.join(__dirname,"node_modules/bootstrap/dist/css")))
app.use("/js",express.static(path.join(__dirname,"node_modules/bootstrap/dist/js")))

db = [];
//const MongoClient = mongodb.MongoClient;
//const mongodb = require('mongodb');
//const url = 'mongodb://localhost:27017/';


/* Week 6 Lab Task */

// MONGOOSE **********************************************
//Step 1: Import the Library
var mongoose = require('mongoose'); 

//Step 2: Reference the Parcel Schema
const Parcel = require('./models/parcel');
//Step 3: Create the URL 
const url = 'mongodb://localhost:27017/Week7'


mongoose.connect(url, function(err){
if (err == null) {
    console.log("connected successfully")
}
});

app.listen(8082);


/*app.get('/',function(req,res){
    res.sendFile(path.join(__dirname,"views/index.html"));
});


// CREATE NEW PARCEL *************************************************
app.get('/newparcels',function(req,res){
    res.sendFile(path.join(__dirname,"views/newparcels.html"));
});  

app.post('/newparcels',function(req,res){

    let no1 = req.body.sender; //check for the user input 
    let no2 = parseInt(req.body.weight);
    let no3 = req.body.address;
    let no4 = req.body.fragile;                 

    let parcel1 = new Parcel({
        sender: no1,
        weight: no2,
        address: no3,
        fragile: no4,
    });

    parcel1.save(function(err){
        if (err){
            console.log(err);
            console.log("lol can't save");
        }
    });
    
});

// DELETE PARCEL *************************************************
app.get('/deleteparcels',function(req,res){
    res.sendFile(path.join(__dirname,"views/deleteparcels.html"));
});  

//parcel.deleteone(_id:mongoose.Types.objectId"()
app.post('/deletedparcels',function(req,res){

    let Avalue = req.body.value; //gets the value from the textbox
    if (req.body.type == "id"){

        Parcel.deleteOne({_id: Avalue}, function(err) {
            if (err){
                console.log("Error");
            }
            else{
                console.log("Deletion id Successful");
            }
        });//deleteonefunction for 

    } else if(req.body.type == "sender"){
        
        Parcel.deleteMany({sender: Avalue},function(err){
            if(err){
                console.log("Error");
            }
            else{
                console.log("Deletion sender Successful!");
            }
        });

    }else if (req.body.type == "weight"){

        Parcel.deleteMany({weight: Avalue},function(err){
            if (err){
                console.log("Error")
            }else{
                console.log("deleted weight successful!")
            }
        });
    }


});

// UPDATE PARCELS *************************************************
app.get('/updateparcels',function(req,res){
    res.render('updateparcels.html', {db: db});

});

app.post('/updatedparcels',function(req,res){
    let Avalue = req.body.id;

    let no1 = req.body.sender; //check for the user input 
    let no2 = parseInt(req.body.weight);
    let no3 = req.body.address;
    let no4 = req.body.fragile;     
    
    Parcel.findByIdAndUpdate(Avalue,{sender:no1,weight:no2,address:no3,fragile:no4},function(err){
            if(err){
                console.log("Update Error")
            }else{
                console.log("Updated Successfully!")
            }
    });
});

// LIST PARCEL *************************************************
app.get('/listparcels',function(req,res){
    Parcel.find({},function(err,docs){
        if(err){
            console.log("Listing error");
        }
        else{
            res.render('listparcels.html', {db:docs});
        }
        
    })
});

app.post('/listparcels',function(req,res){
    
    Parcel.find({},function(err,docs){
    if(err){
        console.log("Listing error");
    }
    else{
        res.render('listparcels.html', {db:docs});
    }
    
}) 
//res.sendFile(path.join(__dirname,"views/listparcels.html"))  
});

// DISPLAY BY SENDER *************************************************

app.get('/Senderfiltrate',function(req,res){
    res.render('Senderfiltrate.html', {db: db});
});
   
app.post('/displayedbysender',function(req,res){
    let no1 = req.body.senderfilt; 

    Parcel.find({sender:no1},function(err,docs){
        if(err){
            console.log("sender is wrong")
        }else{
            res.render('listparcels.html',{db:docs})
        }
});

});


// DISPLAY BY WEIGHT *************************************************
app.get('/Weightfiltrate',function(req,res){
    res.render('Weightfiltrate.html', {db: db});
});


app.post('/displayedbyweight',function(req,res){
    
    let min = req.body.senderweightmin; 
    let max = req.body.senderweightmax;
    Parcel.where('weight').gte(min).lte(max).exec(function(err,docs){
        if(err){
            console.log("sender is wrong")
        }else{
            res.render('listparcels.html',{db:docs})
        }
});
});

/* app.get('/*',function(req,res){
    res.sendFile(path.join(__dirname,"views/404.html"))
    }); */ 


/* WEEK 7 TASK */

const parcelrouter = require("./routers/parcelrouter");
const senderrouter = require("./routers/senderrouter");


//get
app.get('/sender/:name',senderrouter.getAll);
//create
app.post('/sender',senderrouter.createOne); 
//delete 
app.delete('/sender/',senderrouter.deleteOne);
//update
app.put('/sender/parcel', senderrouter.addParcel);
//this is all sender

//this is parcel 
app.get('/parcel',parcelrouter.getallbyAddress);

app.put('/update',parcelrouter.UpdateParcelAddressID);