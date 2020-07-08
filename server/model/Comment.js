const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
  id: {
   type: mongoose.Schema.Types.ObjectId,
    index: true,
    required: true,
    auto: true,
  },
  comment_message : {
     type: String,
     required : true
    },
    post_date : {
      type : Date,
      default : Date.now()
    },
    post_id : {
        type : String,
        required:true
      },    
    user_name:{
          type:String,
          required:true
      },
      reply : {
        type:Boolean,
        default:false,
        required:true
      }
});

const comment = mongoose.model("Comments" , CommentSchema);

module.exports = comment ;