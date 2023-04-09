const postRoute = require('express').Router()

const dotenv = require('dotenv');
dotenv.config();

const PostModel = require('../models/postDataModal')
const bodyParser = require('body-parser')
postRoute.use(bodyParser.json())

var cloudinary = require('cloudinary').v2;
cloudinary.config({ 
    cloud_name: "dtyutg5l9",
    api_key: "374292617957578", 
    api_secret:"syelnfcVWVDt1DalOVDxWlmnmuc",
    secure: true
  });

const cors = require("cors");
postRoute.use(cors());


// // for storing files
const multer = require("multer")
// const upload = multer({storage:multer.diskStorage({
// })})
const ownStorage = multer.diskStorage({
    destination: (req,file,cb) => {
        cb(null,  "local_folder/files" );
    },
    filename: (req,file,cb) => {
        cb(null, file.originalname)
    }
})
const upload = multer({storage:ownStorage})

postRoute.get('/PostView', async (req,res) => {
    try{
        let found = await PostModel.find().sort({order:-1});
        res.json(found)
    } catch(err) {
        res.json({
            result : "failure"
        })
    }
})
postRoute.post('/PostData',upload.single('imageData1'), async (req,res) => {
    console.log(req.body,req.file,1,req.file.path)
    try{
        console.log('before');
        const uploadedImage = await cloudinary.uploader.upload(req.file.path,{
            upload_preset: 'images'
        })
        // const uploadedImage = await cloudinary.uploader.upload(req.body.imagefile)
        // const upload = await cloudinary.v2.upload1.upload(req.file.path);
        console.log(uploadedImage);
        
        let obj = {
            file: uploadedImage.secure_url,
            // file: uploadedImage.url,
            name : req.body.author1,
            description : req.body.description1,
            location : req.body.location1,
            order: Date.now()
        }
        console.log(obj,2)
        console.log('AFTER')

        await PostModel.create(obj)
        .then(res => console.log(res))
        .catch(err => console.log(err))

        res.status(200).json({
            result : "success",
            frontEndMessage : req.body,
            addedData : obj

        })
    } catch(err) {
        res.status(400).json({
            result : "failure",
            message: err.message
        })
    }
})

module.exports = postRoute;
