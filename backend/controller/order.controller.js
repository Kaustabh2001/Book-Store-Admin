const express = require('express');
const crypto = require('crypto')
const path = require('path');
const cors=require("cors");
const moment = require('moment');
const bodyParser = require('body-parser');
const Sequelize = require('sequelize');
const sequelize = require('../config/dbconfig');
const Order = require('../models/order')
const { request } = require('http');

const port = process.env.PORT || 3306;
const app = express();
app.use(cors());
app.use(express.json());


//insert order
app.post('/addorder',async(req,res)=>{
    return await Order.create({
        _id:crypto.randomUUID(),
        Customer_id:req.body.Customer_id,
        Cost:req.body.Cost,
        Street:req.body.Street,
        City: req.body.City,
        State:req.body.State,
        Country:req.body.Country,
        Pincode:req.body.Pincode,
        Date:moment().format('YYYY:MM:DD'),
        Status:req.body.Status,
        Cart:req.body.Cart
    }).then(function(Order){
        if(Order){
            res.send(Order)
        }else {
            res.status(400).send('Error in inserting new record')
        }
    });
});

//delete order
app.post('/deleteorder', async(req, res)=>{
    Order.findByPk(_id=req.body.id).then(function(order){
      return order.destroy();
    }).then(function(){
        if(Order){
            res.send("done")
        } else {
            res.status(400).send('Error in deleting record')
        }
    })
  });

//display all orders
//display all books
app.post("/viewallorder", async (req, res) => {
    try {
      const orders = await Order.findAll();
      return res.status(200).send(orders);
    } catch (error) {
      return res.status(500).send(error);
    }
  });
app.listen(port , ()=>{
    console.log(`app running on port ${port}`);
})