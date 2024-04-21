const express = require('express');
const crypto = require('crypto')
const path = require('path');
const cors=require("cors");
const moment = require('moment');
const bodyParser = require('body-parser');
const Sequelize = require('sequelize');
const sequelize = require('../config/dbconfig');
const Review = require('../models/review')
const { request } = require('http');

const port = process.env.PORT || 3306;
const app = express();
app.use(cors());
app.use(express.json());


//insert reviews
app.post('/addreview',async(req,res)=>{
    return await Review.create({
        _id:crypto.randomUUID(),
        Book_id:req.body.Book_id,
        Customer_id:req.body.Customer_id,
        Rating:req.body.Rating,
        Comment:req.body.Comment
    }).then(function(Review){
        if(Review){
            res.send(Review)
        }else {
            res.status(400).send('Error in inserting new record')
        }
    });
});

//delete review
app.post('/deletereview', async(req, res)=>{
    Review.findByPk(_id=req.body.id).then(function(Review){
      return Review.destroy();
    }).then(function(){
        if(Review){
            res.send("done")
        } else {
            res.status(400).send('Error in deleting record')
        }
    })
  });

//display all reviews
app.post("/viewallreview", async (req, res) => {
    try {
      const reviews = await Review.findAll();
      return res.status(200).send(reviews);
    } catch (error) {
      return res.status(500).send(error);
    }
  });
app.listen(port , ()=>{
    console.log(`app running on port ${port}`);
})