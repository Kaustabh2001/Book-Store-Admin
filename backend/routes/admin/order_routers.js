const express = require('express');
const sequelize = require('../../config/dbconfig');
const Books = require("../../models/book");
const Order_Details = require("../../models/orderDetail");
const Users = require("../../models/user")
const Orders = require("../../models/order")
const {message, status} = require("../../config/messages");

const order_router = express.Router();

const allOrders = async (req, res) => {
    try{
        const query = `
            SELECT 
                o._id,
                u.UserName AS Customer_Name,
                o.Status,
                o.Date,
                od.Book_Id,
                b.Name AS Book_Name,
                od.No_Of_Pieces,
                od.Cost,
                o.Cost AS Total_Cost,
                o.Street,
                o.City,
                o.State,
                o.Country,
                o.Pincode
            FROM Orders o
            INNER JOIN Order_Details od ON o._id = od.Order_Id
            INNER JOIN Books b ON od.Book_Id = b._id
            INNER JOIN Users u ON o.Customer_Id = u._id
            ORDER BY o.Date
            LIMIT 100;
        `;
        const orderDetails = await sequelize.query(query, { type: sequelize.QueryTypes.SELECT });
        const groupedOrderDetails = orderDetails.reduce((acc, curr) => {
            const { _id, Customer_Name, Status, Date, Book_Id, Book_Name, No_Of_Pieces, Cost, Total_Cost, Street, City, State, Country, Pincode } = curr;
            if (!acc[_id]) {
                acc[_id] = { _id, Customer_Name, Status, Date, Order_Details: [], Total_Cost, Street, City, State, Country, Pincode };
            }
            acc[_id].Order_Details.push({ Book_Name, No_Of_Pieces, Cost });
            return acc;
        }, {});

        // Convert groupedOrderDetails object to an array of order objects
        const result = Object.values(groupedOrderDetails);
        res.status(status.ok).send({
            message: message.ok,
            payload: result
        });
    }
    catch (error){
        console.log(error)
        res.status(status.badRequest).json({
            message:message.error,
            payload: error
        });
    }
}

const topOrders = async (req, res) => {
    try {
        const query = `
            SELECT o._id, u.UserName AS Customer_Name, o.Cost, u.Email
            FROM Orders o
            JOIN Users u ON o.Customer_Id = u._id
            ORDER BY o.Cost DESC
            LIMIT 10;
        `;
        const topExpensiveOrders = await sequelize.query(query, {
            type: sequelize.QueryTypes.SELECT
        });
        res.status(status.ok).send({
            message: message.ok,
            payload: topExpensiveOrders
        });
    } catch (error) {
        console.log(error)
        res.status(status.badRequest).json({
            message:message.error,
            payload: error
        });
    }
}

order_router.get('/', allOrders);
order_router.get('/topOrders', topOrders);

module.exports = order_router;

