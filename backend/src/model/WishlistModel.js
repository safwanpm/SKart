const mongoose =require('mongoose');
const connectionString= process.env.connectionString;
mongoose.connect(connectionString)
const Schema= mongoose.Schema
require('dotenv').config
const WishlistSchema = new Schema({
    userId:{type:String},
    wishlist:[{
        productId:{type:String},
        productname:{type:String},
        count: { type: Number, default: 1 },
    }],  
})
const WishlistModel =mongoose.model('WhishlistTB',WishlistSchema)
module.exports= WishlistModel