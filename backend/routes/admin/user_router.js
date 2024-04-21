const express = require('express');
const sequelize = require('../../config/dbconfig');
const Books = require("../../models/book");
const Order_Details = require("../../models/orderDetail");
const Users = require("../../models/user")
const Orders = require("../../models/order")
const {message, status} = require("../../config/messages");

const user_router = express.Router();

const getUsers = async (req, res) => {
    try{
        const allUsers = await Users.findAll({
            attributes: { exclude: ['Password'] }
        });
        res.status(status.ok).json({
            message : message.ok,
            payload : allUsers
        });
    }
    catch (error){
        res.status(status.badRequest).json({
            message:message.error,
            payload: error
        });
    }
}

const getSingleUser = async (req, res) => {
    try{
        const userId = req.params.id;         

        const last10OrderDetailsQuery = `
            SELECT od.*, o.Cost, o.Street, o.City, o.State, o.Country, o.Pincode, b.Name, o.Date
            FROM Order_Details od
            JOIN Orders o ON od.Order_Id = o._id
            JOIN Books b ON od.Book_Id = b._id
            WHERE o.Customer_Id = :userId
            ORDER BY o.Date DESC
            LIMIT 10
        `;
        const last10OrderDetails = await sequelize.query(last10OrderDetailsQuery, {
            replacements: { userId },
            type: sequelize.QueryTypes.SELECT
        });

        //console.log(last10OrderDetails)
        const formatDate = (dateString) => {
            const date = new Date(dateString);
            const day = String(date.getDate()).padStart(2, '0');
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const year = date.getFullYear();
            return `${day}/${month}/${year}`;
          };
        // Format the response
        const formattedOrderDetails = last10OrderDetails.map(orderDetail => ({
        Name: orderDetail.Name,
        numberOfPieces: orderDetail.No_Of_Pieces,
        orderId: orderDetail.Order_Id,
        address: 
            orderDetail.Street+", "+
            orderDetail.City+", "+
            orderDetail.State+", "+
            orderDetail.Country+", "+
            orderDetail.Pincode
        ,
        cost: orderDetail.Cost,
        date: formatDate(orderDetail.Date)
        }));

        const overallBookCountQuery = `
            SELECT SUM(No_Of_Pieces) AS overallBookCount
            FROM Order_Details od
            JOIN Orders o ON od.Order_Id = o._id
            WHERE o.Customer_Id = :userId
        `;
        const overallBookCountResult = await sequelize.query(overallBookCountQuery, {
            replacements: { userId },
            type: sequelize.QueryTypes.SELECT
        });

        const overallBookCount = overallBookCountResult[0]?.overallBookCount ?? 0;
      
        const totalSpentQuery = `
            SELECT SUM(Cost) AS totalSpent
            FROM Orders
            WHERE Customer_Id = :userId
        `;
        const totalSpentResult = await sequelize.query(totalSpentQuery, {
            replacements: { userId },
            type: sequelize.QueryTypes.SELECT
        });
        const totalSpent = totalSpentResult[0]?.totalSpent ?? 0;

        const userDetailsQuery = `SELECT _id, Username, Email, Date FROM Users WHERE _id= :userId`;
        const userDetails = await sequelize.query(userDetailsQuery, {
            replacements: {userId},
            type: sequelize.QueryTypes.SELECT
        });

        console.log(userDetails)

        const calculateBooksSoldPerDay = (orders, startDate) => {
            const booksSoldPerDay = {};
            const sortedOrders = orders.sort((a, b) => a.Date.getTime() - b.Date.getTime());
            const currentDate = new Date();
            const result = [];
            let c=0;
            
            for (let date = new Date(startDate); date <= currentDate; date.setDate(date.getDate() + 1)) {
              const dateKey = date.toISOString().split('T')[0];
              booksSoldPerDay[dateKey] = 0;
          
              sortedOrders.forEach((order) => {
                if (order.Date.toISOString().split('T')[0] === dateKey) {
                  booksSoldPerDay[dateKey] += order.No_Of_Pieces;
                }
              });
              
              result.push({
                name: c++,
                value: booksSoldPerDay[dateKey]
              });
            }
          
            //console.log(booksSoldPerDay);
            return result;
          };
        console.log(overallBookCount);
        res.status(status.ok).json({
            message:message.ok,
            payload: {
                id: userId,
                title: userDetails[0].UserName,
                img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTUW0u5Eiiy3oM6wcpeEE6sXCzlh8G-tX1_Iw&usqp=CAU',
                info: {...userDetails[0],
                        "Total Books Bought": overallBookCount,
                        "Total Amount Spent": totalSpent},
                chart: {
                    dataKeys: [
                        { name: "value", color: "#82ca9d" }
                    ],
                    data: calculateBooksSoldPerDay(last10OrderDetails, userDetails[0].Date)
                },
                activities: formattedOrderDetails,
                
            }
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

user_router.get('/getUsers', getUsers);
user_router.get('/getUsers/:id', getSingleUser);

module.exports = user_router;