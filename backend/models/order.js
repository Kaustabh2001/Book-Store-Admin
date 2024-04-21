const Sequelize = require('sequelize')
const sequelize = require('../config/dbconfig')
const Users = require('../models/user')  
const Order = sequelize.define('Orders',{
    _id:{   
        type: Sequelize.DataTypes.UUID,
        defaultValue: Sequelize.UUIDV1,
        allowNull:false, 
        primaryKey:true
    },  
    Customer_id:{
        type: Sequelize.DataTypes.UUID,
        defaultValue: Sequelize.UUIDV1, 
         allowNull:false,
         references: {
            model: 'Users', 
            key: '_id', 
         }
    },
    Cost:{
        type:Sequelize.DECIMAL(10,2),
        allowNull:true
    },
    Street:{
        type:Sequelize.STRING,
        allowNull:true
    },
    City:{
        type:Sequelize.STRING,
        allowNull:true
    },
    State:{
        type:Sequelize.STRING,
        allowNull:true
    },
    Country:{
        type:Sequelize.STRING,
        allowNull:true
    },
    Pincode:{
        type:Sequelize.INTEGER,
        allowNull:false
    },
    Date:{
        type:Sequelize.DATE,
        allowNull:false
    },
    Status:{
        type:Sequelize.ENUM('processed','shipped','delivered','cancelled'),
        allowNull:true
    },
    Cart:{
        type:Sequelize.TINYINT(1),
        allowNull:true
    }
},
{
    freezeTableName:true,
    timestamps:false
})

Users.hasMany(Order)
Order.belongsTo(Users)
module.exports = Order