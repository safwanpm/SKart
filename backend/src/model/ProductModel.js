const mongoose =require('mongoose')
const connectionString = process.env.connectionString
mongoose.connect(connectionString)
const Schema = mongoose.Schema
require('dotenv').config
const ProductSchema = new Schema({
    name:{type :String},
    category:{type :String},
    stock:{type :String},
    brand:{type :String},
    name:{type :String},
    description:{type :String},
    price:{type :Number},
    offer:{type :Number},
    images:{type:[String]}
    
})
const ProductModel= mongoose.model('ProductTb',ProductSchema)
module.exports=ProductModel