const Sequelize = require('sequelize')
const sequelize = require('../config/dbconfig')
const Order = require('../models/order')
const Book = require('../models/book')
const OrderDetail = sequelize.define('Order_Details',{
    _id:{   
        type: Sequelize.DataTypes.UUID,
        defaultValue: Sequelize.UUIDV1,
        allowNull:false, 
        primaryKey:true
    }, 
    Order_id:{
        type: Sequelize.DataTypes.UUID,
        defaultValue: Sequelize.UUIDV1,
        references:{
            model: 'Orders',
            key: '_id',
        }
    },
    Book_id:{
        type: Sequelize.DataTypes.UUID,
        defaultValue: Sequelize.UUIDV1,
        allowNull:false, 
        references: {
            model: 'Books', 
            key: '_id', 
         }
    },
    No_Of_Pieces:{
        type:Sequelize.INTEGER,
        allowNull:true
    },
    Cost:{
        type:Sequelize.INTEGER,
        allowNull:true
    }
},
{
    freezeTableName:true,
    timestamps:false
})
Book.hasMany(OrderDetail);
OrderDetail.belongsTo(Book);
Order.hasMany(OrderDetail);
OrderDetail.belongsTo(Order);

module.exports = OrderDetail