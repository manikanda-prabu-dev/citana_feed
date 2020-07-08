const express = require("express");
const Router = express();

//feed data
const feed = require("../model/Feed");
const comments =  require("../model/Comment")

Router.post("/post", (req, res) => {
  const feeds = new feed({
    post_message: req.body.post_message,
    comments: req.body.comments,
    user_id: req.body.user_id,
  });
  feeds.save(function (err, save) {
    if (err) {
      res.send("error on posting");
    } else {
      res.json({
        status: "success",
        data: save,
      });
    }
  });
});

Router.get("/getfeeds",(req,res)=>{

  feed.find({}, function(err, posts){
   if(!err){
    res.json({
      status: "success",
      data: posts,
    });
   }else{
    res.json({
      status: "failure",
      message: "No data found for this user",
    });
   }
    
  });
});

Router.post("/comment", (req, res) => {

  const comment = new comments({
    comment_message :req.body.comment_message ,
    post_id : req.body.post_id,
    user_name : req.body.user_name
  });
  res.json(comment)

  feed.findOneAndUpdate(
    { _id: req.body.post_id }, 
    { $push: { comments: comment  } },
   function (error, success) {
         if (error) {
             console.log(error);
         } else {
             console.log(success);
         }
     });

});



module.exports = Router;
