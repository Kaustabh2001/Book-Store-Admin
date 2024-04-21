const Sequelize = require('sequelize')
const sequelize = require('../config/dbconfig')
const User = require('../models/user')
const Book = require('../models/book')
const Wishlist= sequelize.define('Wishlist',{
    _id:{   
        type:Sequelize.DATE, 
        allowNull:false, 
        primaryKey:true
    }, 
    Book_id:{
        type: Sequelize.DataTypes.UUID,
        defaultValue: Sequelize.UUIDV1,
        references:{
            model: 'Books',
            key: '_id',
        }
    },
    Customer_id:{
        type: Sequelize.DataTypes.UUID,
        defaultValue: Sequelize.UUIDV1,
        references: {
            model: 'Users', 
            key: '_id', 
         }
    },
},
{
    freezeTableName:true,
    timestamps:false
});

Book.hasMany(Wishlist);
Wishlist.belongsTo(Book);
User.hasMany(Wishlist);
Wishlist.belongsTo(User);

module.exports = Wishlist