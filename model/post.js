let mongoose = require("mongoose");
let Schema = mongoose.Schema

let PostSchema = {
    title : String,
    author: String,
    post_date : {
        type: Date,
        default: Date.now
    },
    post_data : String
}

module.exports=mongoose.model('posts', PostSchema)