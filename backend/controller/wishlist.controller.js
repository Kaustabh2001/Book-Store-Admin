const express = require('express');
const crypto = require('crypto')
const path = require('path');
const cors=require("cors");
const moment = require('moment');
const bodyParser = require('body-parser');
const Sequelize = require('sequelize');
const sequelize = require('../config/dbconfig');
const Wishlist = require('../models/wishlist')
const { request } = require('http');

const port = process.env.PORT || 3306;
const app = express();
app.use(cors());
app.use(express.json());


//insert into wishlist
app.post('/addwishlist',async(req,res)=>{
    return await Wishlist.create({
        _id:crypto.randomUUID(),
        Book_id:req.body.Book_id,
        Customer_id:req.body.Customer_id,
    }).then(function(Wishlist){
        if(Wishlist){
            res.send(Wishlist)
        }else {
            res.status(400).send('Error in inserting new record')
        }
    });
});

//delete from wishlist
app.post('/deletewishlist', async(req, res)=>{
    Wishlist.findByPk(_id=req.body.id).then(function(Wishlist){
      return Wishlist.destroy();
    }).then(function(){
        if(Wishlist){
            res.send("done")
        } else {
            res.status(400).send('Error in deleting record')
        }
    })
  });


app.listen(port , ()=>{
    console.log(`app running on port ${port}`);
})