const express = require('express')
const ProductModel = require('../model/ProductModel')
const AdminRouter = express.Router()
const multer = require('multer')
const path = require('path')
const SliderModel = require('../model/SliderModel')
const RegisterModel = require('../model/RegisterModel')
const OrderModel = require('../model/OrderModel')
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const destinationPath = path.join('../frontend/public/uploads');
        cb(null, destinationPath);
    },
    filename: function (req, file, cb) {
        const uniqueFileName = `${file.originalname}`;
        cb(null, uniqueFileName);
    }
});

const upload = multer({ storage: storage })


AdminRouter.post('/upload-images', upload.array('files', 6), (req, res) => {
    res.status(200).json({
        message: "images added"
    })
})
AdminRouter.post('/upload-slider', upload.single('image'), (req, res) => {
    res.status(200).json({
        message: "image added"
    })
})


AdminRouter.post('/addProduct', async (req, res) => {
    try {
        const { name, stock, brand, category, description, price, offer, images } = req.body

        const data = {
            name: name
            , brand: brand
            , category: category
            , price: price
            , offer: offer
            , images: images
            , description: description
            , stock:stock

        }
        const details = await ProductModel(data).save()
        if (details) {
            return res.status(200).json({
                success: true,
                error: false,
                message: "Product added"
            })
        }
    }
    catch (error) {
        return res.status(400).json({
            success: true,
            error: false,
            message: "can't add catch error"
        })
    }
})
AdminRouter.get('/viewSlider', async (req, res) => {
    try {
        const AllProducts = await SliderModel.find()
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
AdminRouter.get('/viewUsers', async (req, res) => {
    try {
        const AllProducts = await RegisterModel.find()
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
AdminRouter.get('/viewOrders', async (req, res) => {
    try {
        const AllOrders = await OrderModel.find()
        if (AllOrders) {
            return res.status(200).json({
                success: true,
                error: false,
                data: AllOrders
            })
        }
    }
    catch (error) {

    }

})
AdminRouter.get('/deleteProduct/:productId', async (req, res) => {
    try {
        const productId= req.params.productId
        const Products = await ProductModel.findByIdAndDelete({_id:productId})
        if (Products) {
            return res.status(200).json({
                success: true,
                error: false,
                message:"deleted"
            })
        }
    }
    catch (error) {
        return res.status(400).json({
            success: false,
            error: true,
            message:"catch error"
        })
    }

})

AdminRouter.post('/addSliderProduct', async (req, res) => {
    try {
        const { name, brand, description, category, price, offer, image } = req.body
        console.log(req.body,);
        const data = {
            name: name
            , brand: brand
            , description: description
            , category: category
            , price: price
            , offer: offer
            , image: image
        }
        const details = await SliderModel(data).save()
        if (details) {
            return res.status(200).json({
                success: true,
                error: false,
                message: "Product added"
            })
        }
    }
    catch (error) {
        return res.status(400).json({
            success: true,
            error: false,
            message: "can't add catch error"
        })
    }
})


module.exports = AdminRouter