const express = require('express')
const ProductModel = require('../model/ProductModel')
const CartModel = require('../model/CartModel')
const WishlistModel = require('../model/WishlistModel')
const RegisterModel = require('../model/RegisterModel')
const OrderModel = require('../model/OrderModel')
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



UserRouter.post('/addAddress', async (req, res) => {
  try {
    const {
      userId,
      name,
      state,
      city,
      pincode,
      phone,
      houseNo,
      street,
    } = req.body;

    const Details = {
      name,
      state,
      city,
      pincode,
      phone,
      houseNo,
      street,
    };

    const user = await RegisterModel.findById(userId);
    if (user) {
      user.address.push(Details);
      await user.save();
      return res.status(200).json({
        success: true,
        error: false,
        message: 'Address added successfully',
      });
    } else {
      return res.status(404).json({
        success: false,
        error: true,
        message: 'User not found',
      });
    }
  } catch (err) {
    return res.status(400).json({
      success: false,
      error: true,
      message: 'An error occurred while adding the address',
    });
  }
});

UserRouter.post('/deleteAddress/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;
    const addressId = req.body.addressId;
    console.log('userId', userId);
    console.log('id', addressId);

    const user = await RegisterModel.findOneAndUpdate(
      { _id: userId },
      { $pull: { address: { _id: addressId } } },
      { new: true }
    );

    if (user) {
      return res.status(200).json({
        success: true,
        error: false,
        message: 'Address deleted successfully',
        data: user
      });
    } else {
      return res.status(404).json({
        success: false,
        error: true,
        message: 'User not found'
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: true,
      message: 'An error occurred while deleting the address'
    });
  }
});

UserRouter.post('/viewAddress/:id', async (req, res) => {
  try {
    const id = req.params.id;

    const ProductDetails = await RegisterModel.findOne({ _id: id });
    if (ProductDetails) {
      return res.status(200).json({
        success: true,
        error: false,
        data: ProductDetails
      });
    }
  } catch (error) {
    return res.status(400).json({
      success: false,
      error: true,
      message: 'catch error'
    });
  }
});
UserRouter.post('/viewProfile/:id', async (req, res) => {
  try {
    const id = req.params.id;

    const ProductDetails = await RegisterModel.findOne({ _id: id });
    if (ProductDetails) {
      return res.status(200).json({
        success: true,
        error: false,
        data: ProductDetails
      });
    }
  } catch (error) {
    return res.status(400).json({
      success: false,
      error: true,
      message: 'catch error'
    });
  }
});


UserRouter.post('/ordered', async (req, res) => {
  try {
    const { userId, address, products } = req.body;

    console.log('Received address:', address);
    console.log('Received products:', products);

    // Create a new order instance
    const newOrder = new OrderModel({
      userId,
      address: [{
        name: address.name || '',
        phone: address.phone || '',
        pincode: address.pincode || '',
        state: address.state || '',
        city: address.city || '',
        houseNo: address.houseNo || '',
        streat: address.streat || ''
      }], // Address wrapped in an array with default empty strings

      products: products.map(product => ({
        productName: product.productData.name,       // Map product name from productData
        productId: product.productData._id,       // Map product name from productData
        productImage: product.productData.images[0], // Assuming the first image is used
        totalPrice: product.totalPrice || 0,         // Use totalPrice sent from frontend
        quantity: product.count || 1,                // Use count as quantity
      })),

      purchaseDate: new Date().toISOString(), // Store the current date and time as the purchase date
      status: 'Pending', // Default status
    });

    // Save the order to the database
    await newOrder.save();

    return res.status(200).json({
      success: true,
      error: false,
      message: 'Order placed successfully',
      order: newOrder,
    });
  } catch (err) {
    console.error('Error placing order:', err);
    return res.status(400).json({
      success: false,
      error: true,
      message: 'Failed to place order',
    });
  }
});










module.exports = UserRouter;
