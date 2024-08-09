const mongoose = require('mongoose')
const connectionString= process.env.connectionString
mongoose.connect(connectionString)
const Schema =mongoose.Schema
require ('dotenv').config
const SliderSchema = new Schema({

    name:{type :String},
    category:{type :String},
    brand:{type :String},
    name:{type :String},
    description:{type :String},
    price:{type :Number},
    offer:{type :Number},
    image:{type:String}
})
const SliderModel= mongoose.model('SliderTb',SliderSchema)
module.exports=SliderModel