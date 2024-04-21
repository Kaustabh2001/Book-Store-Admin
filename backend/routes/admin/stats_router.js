const express = require('express');
const sequelize = require('../../config/dbconfig');
const Stats = require("../../models/stat")
const Sequelize = require("sequelize");
const User = require("../../models/user")
const {message, status} = require("../../config/messages");
const { parse } = require('dotenv');

const stats_router = express.Router();

const get_all_stats = async (req, res) => {
    try{
        const presentDate = new Date();
        const priorDate = new Date(presentDate.setDate(presentDate.getDate() - 7));
        //console.log(priorDate+" "+presentDate)
        const startDate = new Date(req.query.start || priorDate); // Create new Date object from priorDate.getTime()
        const endDate = new Date(req.query.end || new Date());
        console.log("Start Date",startDate);
        console.log("End Date",endDate);
        const data = await Stats.findAll({
            where: {
              Date: {
                [Sequelize.Op.between]: [startDate, endDate]
              }
            }
        });
        //console.log(data)
        res.status(status.ok).send({ 
            message:message.ok, 
            payload:data
        })
    }
    catch(error){
        console.log(error);
        res.status(status.badRequest).send({
            message:message.error,
            payload: error
        })
    }
}

const get_book_stats = async (req, res) => {
    try{
        const numberOFBooksQuery = 'SELECT COUNT(_id) FROM Books';
        const numberOfBooksSoldQuery = 'SELECT COUNT(DISTINCT Book_id) FROM Order_Details';
        const numberOfBooks = await sequelize.query(numberOFBooksQuery, {
            type: sequelize.QueryTypes.select
        });
        const numberOfBooksSold = await sequelize.query(numberOfBooksSoldQuery, {
            type: sequelize.QueryTypes.select
        });
        const data = {
            color: "skyblue",
            icon: "/productIcon.svg",
            title: "Total Products",
            number: numberOfBooks[0][0]["COUNT(_id)"],
            dataKey: "products",
            percentage: parseFloat(numberOfBooksSold[0][0]["COUNT(DISTINCT Book_id)"]/numberOfBooks[0][0]["COUNT(_id)"]*100).toFixed(2),
            text: "Books sold till date"
        }
        return res.status(status.ok).send({
            message: message.ok,
            payload: data
        });
    }
    catch(error){
        console.log(error);
        res.status(status.badRequest).send({
            message:message.error,
            payload: error
        })
    }
}

const get_user_stats = async (req, res) => {
    try{
        const numberOFUsersQuery = 'SELECT COUNT(_id) FROM Users';
        const presentDate = new Date();
        const start = new Date(presentDate.setDate(presentDate.getDate() - 30));
        const end = new Date();
        const numberOfUsersInLastMonthQuery = `SELECT COUNT(_id) FROM Users WHERE Date BETWEEN :start AND :end`;
        const numberOfUsers = await sequelize.query(numberOFUsersQuery, {
            type: sequelize.QueryTypes.select
        });
        const numberOfUsersAddedLastMonth = await sequelize.query(numberOfUsersInLastMonthQuery, {
            type: sequelize.QueryTypes.select,
            replacements: {start, end}
        });
        const data = {
            color: "#8884d8",
            icon: "/userIcon.svg",
            title: "Total Users",
            number: numberOfUsers[0][0]["COUNT(_id)"],
            dataKey: "users",
            percentage: parseFloat(numberOfUsersAddedLastMonth[0][0]["COUNT(_id)"]/numberOfUsers[0][0]["COUNT(_id)"]*100).toFixed(2),
            text: "Users added this month"
        }
        return res.status(status.ok).send({
            message: message.ok,
            payload: data
        });
    }
    catch(error){
        console.log(error);
        res.status(status.badRequest).send({
            message:message.error,
            payload: error
        })
    }
}

const get_revenue_stats = async (req, res) => {
    try{
        const totalRevenueQuery = 'SELECT SUM(Sales_Volume)-SUM(Cost_Volume) as Profit FROM Stats';
        const presentDate_1 = new Date();
        const start = new Date(presentDate_1.setDate(presentDate_1.getDate() - 60));
        const presentDate_2 = new Date();
        const end = new Date(presentDate_2.setDate(presentDate_2.getDate() - 30));
        const presentDate = new Date();
        const revenueInLastToLastMonthQuery = `SELECT SUM(Sales_Volume)-SUM(Cost_Volume) as Profit FROM Stats WHERE Date BETWEEN :start AND :end`;
        const revenueInLastMonthQuery = `SELECT SUM(Sales_Volume)-SUM(Cost_Volume) as Profit FROM Stats WHERE Date BETWEEN :end AND :presentDate`;
        const totalRevenue = await sequelize.query(totalRevenueQuery, {
            type: sequelize.QueryTypes.select
        });
        const revenueInLastToLastMonth = await sequelize.query(revenueInLastToLastMonthQuery, {
            type: sequelize.QueryTypes.select,
            replacements: {start, end}
        });
        const revenueInLastMonth = await sequelize.query(revenueInLastMonthQuery, {
            type: sequelize.QueryTypes.select,
            replacements: {end, presentDate}
        });
        const data = {
            color: "teal",
            icon: "/revenueIcon.svg",
            title: "Total Revenue",
            number: totalRevenue[0][0]["Profit"],
            dataKey: "revenue",
            percentage: parseFloat(((revenueInLastMonth[0][0]["Profit"]-revenueInLastToLastMonth[0][0]["Profit"])/revenueInLastToLastMonth[0][0]["Profit"])*100).toFixed(2),
            text: "Increase in Revenue from last month"
        }
        return res.status(status.ok).send({
            message: message.ok,
            payload: data
        });
    }
    catch(error){
        console.log(error);
        res.status(status.badRequest).send({
            message:message.error,
            payload: error
        })
    }
}

const get_review_stats = async (req, res) => {
    try{
        const avgReviewQuery = 'SELECT AVG(Rating) as AVGRATING FROM Review';
        const avgReview = await sequelize.query(avgReviewQuery, {
            type: sequelize.QueryTypes.select
        });
        const distinctBooksReviewedQuery = 'SELECT COUNT(DISTINCT Book_id) FROM Review';
        const distinctBooksReviewed = await sequelize.query(distinctBooksReviewedQuery, {
            type: sequelize.QueryTypes.select
        });
        const data = {
            color: "success",
            icon: "/production.svg",
            title: "Average Review",
            number: avgReview[0][0]["AVGRATING"],
            dataKey: "review",
            percentage: parseFloat(distinctBooksReviewed[0][0]["COUNT(DISTINCT Book_id)"]/5000*100).toFixed(2),
            text: "Number of Books Reviewed"
        }
        return res.status(status.ok).send({
            message: message.ok,
            payload: data
        });
    }
    catch(error){
        console.log(error);
        res.status(status.badRequest).send({
            message:message.error,
            payload: error
        })
    }
}

const get_country_stats = async (req, res) => {
    try{
        const countryWiseOrdersQuery = 'SELECT COUNT(_id) as Count, Country FROM Orders GROUP BY Country';
        const countryWiseOrders = await sequelize.query(countryWiseOrdersQuery, {
            type: sequelize.QueryTypes.select
        });
        const convertData = (input) => {
            let result = [["Country", "Orders"]];
        
            input.forEach(item => {
                result.push([item.Country, item.Count * 100]);
            });
        
            return result;
        };
        return res.status(status.ok).send({
            message: message.ok,
            payload: convertData(countryWiseOrders[0])
        });
    }
    catch(error){
        console.log(error);
        res.status(status.badRequest).send({
            message:message.error,
            payload: error
        })
    }
}

stats_router.get("/", get_all_stats);
stats_router.get("/users", get_user_stats);
stats_router.get("/books", get_book_stats);
stats_router.get("/revenue", get_revenue_stats);
stats_router.get("/review", get_review_stats);
stats_router.get("/country", get_country_stats);


module.exports = stats_router;