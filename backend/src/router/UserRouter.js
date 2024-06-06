const express = require('express')
const ProductModel = require('../model/ProductModel')
const CartModel = require('../model/CartModel')
const WishlistModel = require('../model/WishlistModel')
const UserRouter = express.Router()

UserRouter.get('/viewAllProducts', async (req, res) => {
  try {
    const AllProducts = await ProductModel.find()
    if (AllProducts) {
      return res.status(200).json({
        success: true,
        error: false,
        data: AllProducts
      })
    }
  }
  catch (error) {

  }

})

UserRouter.get('/viewProduct/:id', async (req, res) => {
  try {
    const id = req.params.id
    const ProductDetails = await ProductModel.findOne({ _id: id })
    if (ProductDetails) {
      return res.status(200).json({
        success: true,
        error: false,
        data: ProductDetails
      })
    }
  }
  catch (error) {
    return res.status(400).json({
      success: false,
      error: true,
      message: 'catch error'
    })
  }

})



// UserRouter.get('/viewCart/:id', async (req, res) => {
//     try {
//         const id = req.body.id
//         const Details = await CartModel.find({ id: id })
//         if (Details) {
//             return res.status(400).json({
//                 success: true,
//                 error: false,
//                 data: Details
//             })
//         }
//     }
//     catch {
//         return res.status(400).json({
//             success: false,
//             error: true,
//             message: 'catch error'
//         })
//     }
// })




module.exports = UserRouter;
