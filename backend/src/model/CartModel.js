const mongoose =require('mongoose');
const connectionString= process.env.connectionString;
mongoose.connect(connectionString)
const Schema= mongoose.Schema
require('dotenv').config
const CartSchema = new Schema({
    userId:{type:String},
    cart:[{
        productId:{type:String},
       
        count: { type: Number, default: 1 },
    }],  
})
const CartModel =mongoose.model('CartTb',CartSchema)
module.exports=CartModel    