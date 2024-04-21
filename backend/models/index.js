const Sequelize = require('sequelize')
const sequelize = require('../config/dbconfig')

const Review = require('../models/review')
const User = require('../models/user')
const Book = require('../models/book')
const Order = require('../models/order')
const OrderDetail = require('../models/orderDetail')
const Stat = require('../models/stat')
const WishList = require('../models/wishlist')

sequelize.sync({})   
