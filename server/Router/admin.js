const express = require('express');
const bcrypt = require('bcryptjs');


const Router = express();

//Admin Model
const Admin = require("../model/Admin");

Router.post("/login" , (req ,res,next)=>{
    console.log(req.body); 
    const {email , password} = req.body
    Admin.findOne({email : email}).then(user =>{
        if(user){
           bcrypt.compare(password , user.password ,(err , isMatch)=>{
               if(!isMatch){
                   res.json({
                       code : 401,
                       status:"error",
                       message : "Incorrect Password",
                       data : err
                   });
               }else{
                    res.json({
                        code : 200,
                        status:"success",
                        message : "Logged in successfully",
                        data:user
                    });
               }
           })
        }else{
             res.json({
                 code : 404,
                 status:"error",
                 message : "User does not exist"
             });;
        }
    })
});

Router.post("/register" , (req ,res,next)=>{
  console.log(req.body);
  const {name , email , password} = req.body ;
  var role = "user"
  let error = [];
  if(!name || !email || !password){
      error.push({msg : "please fill all the details"})
      res.json("please fill all the details");
    }
  if(error.length > 0){
       res.json();
  }else{
      Admin.findOne({email : email}).then(user =>{
          if(!user){
    const SaveAdmin = new Admin({
                name,
                email,
                password,
                role
            });
            bcrypt.genSalt(10 , (err ,salt)=>{
                bcrypt.hash(SaveAdmin.password , salt , (err , hash)=>{
                    SaveAdmin.password = hash ;
                    SaveAdmin.save(function(err , save){
                        if(err){
                            res.json({
                                code : 404,
                                message : "Unable to create account."
                            });
                        }
                         res.json({
                             code : 201,
                             message : "Account has been created successfully.",
                             value : SaveAdmin
                         });
                    })
                });
            });
          }else{
             res.json({
                 code : 409,
                 message : "You are already registered."
             });
          }
      })
      
        
  }
});

Router.post("/register/admin/:id" , (req ,res,next)=>{
    if(req.params.id == 1234){
        const {name , email , password} = req.body ;
        var role = "admin"
        let error = [];
        if(!name || !email || !password){
            error.push({msg : "please fill all the details"})
            res.json("please fill all the details");
          }
        if(password.length <= 8){
          error.push({msg : "password should be greater than eigth"})
            res.json({
                code : 8888,
                message : "password should be greater than eigth"
            });
        }
        if(error.length > 0){
             res.json();
        }else{
              const SaveAdmin = new Admin({
                  name,
                  email,
                  password,
                  role
              });
              bcrypt.genSalt(10 , (err ,salt)=>{
                  bcrypt.hash(SaveAdmin.password , salt , (err , hash)=>{
                      SaveAdmin.password = hash ;
                      SaveAdmin.save(function(err , save){
                          if(err){
                              res.status(204).json({
                                  message : String("not created")
                              });
                          }
                           res.json({
                               message : "created",
                               value : SaveAdmin
                           });
                      })
                  });
              });
        }
    }else{
         res.json({
             message : "invalid password"
         });
    }
    
   
  });







module.exports = Router ;