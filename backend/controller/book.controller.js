const express = require('express');
const crypto = require('crypto')
const path = require('path');
const cors=require("cors");
const moment = require('moment');
const bodyParser = require('body-parser');
const Sequelize = require('sequelize');
const sequelize = require('../config/dbconfig');
const Book = require('../models/book')
const { request } = require('http');

const port = process.env.PORT || 3306;
const app = express();
app.use(cors());
app.use(express.json());


//insert books
app.post('/addbook',async(req,res)=>{
    return await Book.create({
        _id:crypto.randomUUID(),
        ISBN:req.body.ISBN,
        Name:req.body.Name,
        Cover_Image:req.body.Cover_Image,
        Selling_cost:req.body.Selling_cost,
        Available_pieces:req.body.Available_pieces,
        Author:req.body.Author,
        Publisher:req.body.Publisher,
        Year_of_Publication:req.body.Year_of_Publication,
        Purchase_Cost:req.body.Purchase_Cost,
        Genre:req.body.Genre,
        Rating:req.body.Rating
    }).then(function(Book){
        if(Book){
            res.send(Book)
        }else {
            res.status(400).send('Error in inserting new record')
        }
    });
});

//delete book
app.post('/deletebook', async(req, res)=>{
    Book.findByPk(_id=req.body.id).then(function(book){
      return book.destroy();
    }).then(function(){
        if(Book){
            res.send("done")
        } else {
            res.status(400).send('Error in deleting record')
        }
    })
  });


//display all books
app.post("/viewallbook", async (req, res) => {
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