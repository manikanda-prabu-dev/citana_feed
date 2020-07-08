const express = require('express');
const config = require('./config/config');
const body = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');


//express webserver
const app = express();

//MONGODb connection
const DBURI = require("./config/config").DATABASE.MONGODB ;
mongoose.connect(DBURI , ({useNewUrlParser : true , useUnifiedTopology : true ,  useCreateIndex: true})).then(() => console.log("MONGODB connected")).catch((err) => console.log("MONGODB not connected"));

//cors
app.use(cors());


//bodyparser
app.use(express.urlencoded({extended : true}));
app.use(body.json());

//Main Router
app.get('/', (req, res) => {
    res.sendStatus(200);
});

//Router
app.use("/admin" , require('./Router/admin'));
app.use("/user" , require("./Router/user"));
app.use("/feed" , require('./Router/feed'));


app.listen(config.PORT , (err)=>{
  console.log("server stated @ " + `${config.HOST}:${config.PORT}`);
  console.log("developed by " + `${config.DEV}`);
})