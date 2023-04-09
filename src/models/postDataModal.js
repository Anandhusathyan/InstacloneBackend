const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
    file:{type: String},
    name:{ type: String } ,
    location: { type: String } ,
    description: { type: String } ,
    // PostImage:
    // {
    //     data: Buffer,
    //     contentType: String
    // },
    order:{type:Date},
    date: { type: String, default: new Date().toLocaleDateString(
        'en-gb',
        {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
          timeZone: 'utc'
        }
    )  }
})


const PostModel = mongoose.model('posts',postSchema);
// PostModel.createCollection();

module.exports = PostModel;