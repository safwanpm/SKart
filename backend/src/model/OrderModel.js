const mongoose= require('mongoose')
const connectionString = process.env.connectionString
mongoose.connect(connectionString)
require('dotenv').config
const Schema=mongoose.Schema
const OrderSchema = new Schema({
    userId:{type:String},
    address:[{
        name: {
            type: String,
        },
       
        phone: {
            type: String,
        },
        pincode: {
            type: String,
        },
        state: {
            type: String,
        },
        city: {
            type: String,
        },
        houseNo: {
            type: String,   
        },
        streat: {
            type: String,
        },

    }],
    totalPrice:{
        type:Number
    },
    products:[
        {
        productName:{
            type:String,
        },
        productId:{
            type:String,
        },
        productImage:{
            type:String
        },
      
        quantity:{
            type:Number
        }
    }],
    purchaseDate:{
        type:String
    },
    status:{
        type:String
    },


    
})
const OrderModel =mongoose.model('OrderTb',OrderSchema)
module.exports=OrderModel   