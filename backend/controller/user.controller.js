const express = require('express');
const crypto = require('crypto')
const path = require('path');
const cors=require("cors");
const moment = require('moment');
const bodyParser = require('body-parser');
const Sequelize = require('sequelize');
const sequelize = require('../config/dbconfig');
const User = require('../models/user')
const { request } = require('http');

const port = process.env.PORT || 3306;
const app = express();
app.use(cors());
app.use(express.json());


//insert user
app.post('/adduser',async(req,res)=>{
    return await User.create({
        _id:crypto.randomUUID(),
        Username:req.body.Username,
        Email:req.body.Email,
        Password:req.body.Password,
        Date: moment().format('YYYY:MM:DD'),
        Role:req.body.Role,
    }).then(function(User){
        if(User){
            res.send(User)
        }else {
            res.status(400).send('Error in inserting new record')
        }
    });
});

//delete user
app.post('/deleteuser', async(req, res)=>{
    User.findByPk(_id=req.body.id).then(function(user){
      return user.destroy();
    }).then(function(){
        if(User){
            res.send("done")
        } else {
            res.status(400).send('Error in deleting record')
        }
    })
  });


  //display all users
app.post("/viewallusers", async (req, res) => {
    try {
      const users = await User.findAll();
      return res.status(200).send(users);
    } catch (error) {
      return res.status(500).send(error);
    }
  });


app.listen(port , ()=>{
    console.log(`app running on port ${port}`);
})