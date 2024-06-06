const express = require('express');
const ProductModel = require('../model/ProductModel');
const CartModel = require('../model/CartModel');
const WishlistModel = require('../model/WishlistModel');
const CartRouter = express.Router()


CartRouter.get('/viewCart/:id', async (req, res) => {
    try {
        const userId = req.params.id;
        const cartDetails = await CartModel.findOne({ userId: userId });

        if (cartDetails) {
            const productDetails = await Promise.all(cartDetails.cart.map(async (item) => {
                const product = await ProductModel.findById(item.productId);
                return {
                    productId: item.productId,
                    productname: product ? product.name : null,
                    count: item.count,
                    productData: product
                };
            }));

            return res.status(200).json({
                success: true,
                error: false,
                data: productDetails
            });
        } else {
            return res.status(404).json({
                success: false,
                error: true,
                message: 'Cart not found'
            });
        }
    } catch (error) {
        console.error('Error fetching cart details:', error);
        return res.status(500).json({
            success: false,
            error: true,
            message: 'Internal Server Error'
        });
    }
});

CartRouter.post('/addCart', async (req, res) => {
    try {
        const { userId, productId, productname } = req.body;

        const userCart = await CartModel.findOne({ userId: userId });

        if (userCart) {
            const existingProduct = userCart.cart.find(item => item.productId === productId);
            if (existingProduct) {
                existingProduct.count += 1;
            } else {
                userCart.cart.push({ productId, productname, count: 1 });
            }
            await userCart.save();
            return res.status(200).json({
                success: true,
                error: false,
                message: 'added '
            });
        }
        else {

            const newCart = new CartModel({
                userId: userId,
                cart: [{ productId, productname, count: 1 }],
            });
            await newCart.save();
            return res.status(200).json({
                success: true,
                error: false,
                message: 'added to cart'
            });
        }
    } catch (error) {
        console.error('Error adding product to cart:', error);
        return res.status(400).json({
            success: false,
            error: true,
            message: 'Catch error'
        });
    }
});
CartRouter.post('/addWishlist', async (req, res) => {
    try {
        const { userId, productId, productname } = req.body;

        const userWishlist = await WishlistModel.findOne({ userId: userId });

        if (userWishlist) {
            const existingProduct = userWishlist.wishlist.find(item => item.productId === productId);
            if (existingProduct) {
                existingProduct.count += 1;
            } else {
                userWishlist.wishlist.push({ productId, productname, count: 1 });
            }
            await userWishlist.save();
            return res.status(200).json({
                success: true,
                error: false,
                message: 'added '
            });
        }
        else {

            const newWishlist = new WishlistModel({
                userId: userId,
                wishlist: [{ productId, productname, count: 1 }],
            });
            await newWishlist.save();
            return res.status(200).json({
                success: true,
                error: false,
                message: 'added to wishlist'
            });
        }
    } catch (error) {
        console.error('Error adding product to wishlist:', error);
        return res.status(400).json({
            success: false,
            error: true,
            message: 'Catch error'
        });
    }
});




CartRouter.post('/increment', async (req, res) => {
    try {
        const { userId, productId } = req.body;

        const userCart = await CartModel.findOne({ userId: userId });

        if (userCart) {
            const existingProduct = userCart.cart.find(item => item.productId.toString() === productId);
            if (existingProduct) {
                existingProduct.count += 1;
                await userCart.save(); // Save the updated document
                return res.status(200).json({
                    success: true,
                    error: false,
                    message: 'Product quantity incremented',
                    data: existingProduct
                });
            } else {
                return res.status(404).json({
                    success: false,
                    error: true,
                    message: 'Product not found in cart'
                });
            }
        } else {
            return res.status(404).json({
                success: false,
                error: true,
                message: 'Cart not found'
            });
        }
    } catch (error) {
        console.error('Error incrementing product quantity:', error);
        return res.status(500).json({
            success: false,
            error: true,
            message: 'Internal Server Error'
        });
    }
});


CartRouter.post('/decrement', async (req, res) => {
    try {
        const { userId, productId } = req.body;

        const userCart = await CartModel.findOne({ userId: userId });

        if (userCart) {
            const existingProduct = userCart.cart.find(item => item.productId.toString() === productId);
            if (existingProduct) {
                // Ensure count doesn't go below 1
                existingProduct.count = Math.max(existingProduct.count - 1, 1);
                await userCart.save(); // Save the updated document
                return res.status(200).json({
                    success: true,
                    error: false,
                    message: 'Product quantity decremented',
                    data: existingProduct
                });
            } else {
                return res.status(404).json({
                    success: false,
                    error: true,
                    message: 'Product not found in cart'
                });
            }
        } else {
            return res.status(404).json({
                success: false,
                error: true,
                message: 'Cart not found'
            });
        }
    } catch (error) {
        console.error('Error decrementing product quantity:', error);
        return res.status(500).json({
            success: false,
            error: true,
            message: 'Internal Server Error'
        });
    }
});

CartRouter.post('/delete', async (req, res) => {
    try {
        const { userId, productId } = req.body;

        const userCart = await CartModel.findOne({ userId: userId });

        if (userCart) {
            const index = userCart.cart.findIndex(item => item.productId.toString() === productId);
            if (index !== -1) {
                userCart.cart.splice(index, 1); // Remove the item from the cart array
                await userCart.save(); // Save the updated document
                return res.status(200).json({
                    success: true,
                    error: false,
                    message: 'Product deleted from cart'
                });
            } else {
                return res.status(404).json({
                    success: false,
                    error: true,
                    message: 'Product not found in cart'
                });
            }
        } else {
            return res.status(404).json({
                success: false,
                error: true,
                message: 'Cart not found'
            });
        }
    } catch (error) {
        console.error('Error deleting product from cart:', error);
        return res.status(500).json({
            success: false,
            error: true,
            message: 'Internal Server Error'
        });
    }
});


module.exports = CartRouter