// for connecting to db and establishing server connection

const app = require('./app')
const mongoose = require("mongoose");
const port = process.env.PORT || 8080
require('dotenv/config');

 mongoose.connect("mongodb+srv://sathyananandhu1:aqL1cc3Yi0XDCWKU@cluster0.bd7fcm1.mongodb.net/Instaclone?retryWrites=true&w=majority",{ useNewUrlParser: true, useUnifiedTopology: true })
            .then(() => console.log("connected to Database"))
            .catch((err) => {console.log(err)});

            mongoose.connection.on("connected",()=>{
                console.log("congrats!!! mongodb connected successfully")
            })
            mongoose.connection.on("error",(err)=>{
                console.log("sorry mongodb not connected",err)
            })
            
app.listen(8080, () => console.log('Server running......'));


// db.mongoose.connect(db.url,{
//     useNewUrlParser:true,
//     useUnifiedTopology:true
// }).then(()=>{
//     console.log("connected to database")
// })
// .catch(err=>{
//     console.log("cannot connect to data base"+ err);
//     process.exit();
// })