const Sequelize = require('sequelize')
const sequelize = require('../config/dbconfig')
const Stat= sequelize.define('Stats',{
    Date:{   
        type:Sequelize.DATE, 
        allowNull:false, 
        primaryKey:true
    }, 
    Cost_Volume:{
        type:Sequelize.DECIMAL(10,2),
    },
    Sales_Volume:{
        type:Sequelize.DECIMAL(10,2),
    },
    New_Users:{
        type:Sequelize.INTEGER,
        allowNull:true
    },
    Books_Sold:{
        type:Sequelize.INTEGER,
        allowNull:true
    }
},
{
    freezeTableName:true,
    timestamps:false
})
module.exports = Stat