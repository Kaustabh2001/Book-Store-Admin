const express = require('express');
const sequelize = require('../../config/dbconfig');
const Books = require("../../models/book");
const Order_Details = require("../../models/orderDetail");
const Users = require("../../models/user")
const Orders = require("../../models/order")
const {message, status} = require("../../config/messages");

const book_router = express.Router();

const getBooks = async (req, res) => {
    try{
        const allBooks = await Books.findAll();
        console.log(allBooks);
        return res.status(status.ok).json({
            message : message.ok,
            payload : allBooks
        });
    }
    catch (err){
        //console.log(err)
        res.status(status.badRequest).json({
            message:message.error
        })
    }
}

const getSingleBook = async (req, res) => {
    try {
        const bookId = req.params.id;

        // Fetching last 10 orders for the book
        const last10OrdersQuery = `
            SELECT od.*, o.*, u.Username
            FROM Order_Details od
            JOIN Orders o ON od.Order_Id = o._id
            JOIN Users u ON o.Customer_id = u._id
            WHERE od.Book_id = :bookId
            ORDER BY o.Date DESC
            LIMIT 10
        `;
        const last10Orders = await sequelize.query(last10OrdersQuery, {
            replacements: { bookId },
            type: sequelize.QueryTypes.SELECT
        });

        // Fetching overall sold count for the book
        const overallSoldCountQuery = `
            SELECT SUM(No_Of_Pieces) AS overallSoldCount
            FROM Order_Details
            WHERE Book_id = :bookId
        `;
        const overallSoldCountResult = await sequelize.query(overallSoldCountQuery, {
            replacements: { bookId },
            type: sequelize.QueryTypes.SELECT
        });
        const overallSoldCount = overallSoldCountResult[0].overallSoldCount;

        // Fetching overall sales volume for the book
        const overallSalesVolumeQuery = `
            SELECT SUM(Cost) AS overallSalesVolume
            FROM Order_Details
            WHERE Book_id = :bookId
        `;
        const overallSalesVolumeResult = await sequelize.query(overallSalesVolumeQuery, {
            replacements: { bookId },
            type: sequelize.QueryTypes.SELECT
        });
        const overallSalesVolume = overallSalesVolumeResult[0].overallSalesVolume;

        const bookDetailsQuery = `SELECT * FROM Books WHERE _id = :bookId`;
        const bookDetails = await sequelize.query(bookDetailsQuery, {
            replacements: { bookId },
            type: sequelize.QueryTypes.SELECT
        });

        console.log(bookDetails);

        // Formatting the orders
        const formattedOrders = last10Orders.map(order => ({
            Name: order.Username,
            date: order.Date,
            address: order.Street+", "+order.City+", "+order.State+", "+order.Country+", "+order.Pincode,
            orderId: order._id,
            numberOfPieces: order.No_Of_Pieces,
            cost: order.Cost
        }));

        const customisedOrderData = (orders) => {
            const orderData = {};
            // Initialize orderData with 0 for each date from Jan 1, 2024, to present
            const currentDate = new Date();
            const presentDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());
            const janFirst2024 = new Date(2024, 0, 1);
            for (let date = janFirst2024; date <= presentDate; date.setDate(date.getDate() + 1)) {
                const formattedDate = date.toISOString().substring(0, 10);
                orderData[formattedDate] = 0;
            }
            // Update orderData with actual number of pieces sold for each date
            orders.forEach(order => {
                const { date, numberOfPieces } = order;
                const formattedDate = date.toISOString().substring(0, 10);
                orderData[formattedDate] += numberOfPieces;
            });
            // Convert orderData to an array of objects with name and value properties
            return Object.entries(orderData).map(([name, value]) => ({ name, value }));
        };

        // Sending the response
        return res.status(status.ok).json({
            message: message.ok,
            payload: {
                id: bookId,
                img: bookDetails[0].Cover_Image,
                title: bookDetails[0].Name,
                info: {
                    ...bookDetails[0],
                    "Total Units Sold":overallSoldCount,
                    "Total Sales":overallSalesVolume
                },
                chart: {
                    dataKeys: [
                        { name: "value", color: "#82ca9d" }
                    ],
                    data: customisedOrderData(formattedOrders)
                },
                activities: formattedOrders
            }            
        });
    } catch (error) {
        console.log(error);
        return res.status(status.badRequest).json({
            message: message.error,
            payload: error
        });
    }
}


const createBook = async (req, res) => {
    try{
        console.log(req.body);
        const bookData = {
            ISBN: req.body.ISBN,
            Name: req.body.Name,
            Cover_Image: req.body.Cover_Image,
            Selling_cost: req.body.Selling_cost,
            Available_pieces: req.body.Available_pieces,
            Author: req.body.Author,
            Publisher: req.body.Publisher,
            Year_of_Publication: req.body.Year_of_Publication,
            Purchase_Cost: req.body.Purchase_Cost,
            Genre: req.body.Genre,
            Rating: req.body.Rating || 0
        };
        console.log(bookData);
        const newBook = await Books.create(bookData);   
        console.log(newBook);
        return res.status(status.ok).send({
            message : message.ok
        })
    }
    catch (err){
        console.log(err)
        res.status(status.badRequest).send({
            message:message.error,
            payload:err
        })
    }
}

const updateBook = async (req, res) => { 
    try {   
        const ISBN = req.body.ISBN; 
        const bookData = {
            ISBN: req.body.ISBN,
            Name: req.body.Name,
            Cover_Image: req.body.Cover_Image,
            Selling_cost: req.body.Selling_cost,
            Available_pieces: req.body.Available_pieces,
            Author: req.body.Author,
            Publisher: req.body.Publisher,
            Year_of_Publication: req.body.Year_of_Publication,
            Purchase_Cost: req.body.Purchase_Cost
        };  
        const result = await Books.update(bookData, {
            where: { ISBN: ISBN } // Update the entry with the given id
        });     
        console.log(result);      
        const updatedBook = await Books.findByPk(id);      
        return res.status(status.ok).send({
            message : message.ok,
            payload : updatedBook
        })
    } 
    catch (error) {      
        res.status(status.badRequest).json({
            message:message.error,
            payload:error
        })
    }
}

const getBooksByGenre = async (req, res) => {
    try {
        const query = `
            SELECT b.Genre, SUM(od.No_Of_Pieces) AS BooksSold
            FROM Books b
            INNER JOIN Order_Details od ON b._id = od.Book_Id
            INNER JOIN Orders o ON od.Order_Id = o._id
            GROUP BY b.Genre;
        `;
        const results = await sequelize.query(query,{
            type: sequelize.QueryTypes.SELECT
        });
        return res.status(status.ok).send({
            message:message.ok,
            payload: results
        });
    }
    catch (error) {      
        res.status(status.badRequest).json({
            message:message.error,
            payload:error
        })
    }
}

const deleteBook = async (req, res) => {
    try{
        const book_id = req.query.id;
        const deleteBookQuery = `UPDATE Books
        SET Deleted = TRUE
        WHERE _id = :book_id`;
        const deleteBook = await sequelize.query(deleteBookQuery,{
            type: sequelize.QueryTypes.UPDATE,
            replacements: {book_id}
        });
        return res.status(status.ok).send({
            message:message.ok,
        });
    }
    catch (error) {      
        res.status(status.badRequest).json({
            message:message.error,
            payload:error
        })
    }
}

book_router.patch('/update', updateBook);
book_router.post('/create', createBook);
book_router.get('/getBooks', getBooks);
book_router.get('/getBooks/:id',getSingleBook);
book_router.get('/getBooksByGenre', getBooksByGenre);
book_router.delete('/delete', deleteBook);

module.exports = book_router