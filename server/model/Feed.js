const mongoose = require('mongoose');

const FeedSchema = new mongoose.Schema({
    post_message : {
     type: String,
     required : true
    },
    post_date : {
      type : Date,
      default : Date.now()
    },
    user_id :{
        type:String
    },
    comments: {
        type: Array,
        required:true
    }
});

const feed = mongoose.model("feed" , FeedSchema);

module.exports = feed ;