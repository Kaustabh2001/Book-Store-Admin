const express = require('express');
const crypto = require('crypto')
const path = require('path');
const cors=require("cors");
const moment = require('moment');
const bodyParser = require('body-parser');
const Sequelize = require('sequelize');
const sequelize = require('../config/dbconfig');
const OrderDetails = require('../models/orderDetail')
const { request } = require('http');

const port = process.env.PORT || 3306;
const app = express();
app.use(cors());
app.use(express.json());


//insert details of the order
app.post('/addorderdetails',async(req,res)=>{
    return await OrderDetails.create({
        _id:crypto.randomUUID(),
        Order_id:req.body.Order_id,
        Book_id:req.body.Book_id,
        No_Of_Pieces:req.body.No_Of_Pieces,
        Cost:req.body.Cost,
    }).then(function(OrderDetails){
        if(OrderDetails){
            res.send(OrderDetails)
        }else {
            res.status(400).send('Error in inserting new record')
        }
    });
});

//delete book
app.post('/deleteorderdetails', async(req, res)=>{
    OrderDetails.findByPk(_id=req.body.id).then(function(OrderDetails){
      return OrderDetails.destroy();
    }).then(function(){
        if(OrderDetails){
            res.send("done")
        } else {
            res.status(400).send('Error in deleting record')
        }
    })
  });


//display all books
app.post("/viewallorderdetails", async (req, res) => {
    try {
      const books = await Book.findAll();
      return res.status(200).send(books);
    } catch (error) {
      return res.status(500).send(error);
    }
  });

app.listen(port , ()=>{
    console.log(`app running on port ${port}`);
})