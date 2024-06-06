const express = require('express')
const ProductModel = require('../model/ProductModel')
const AdminRouter = express.Router()
const multer = require('multer')
const path = require('path')
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


AdminRouter.post('/addProduct', async (req, res) => {
    try {
        const { name, brand, category, price, offer, images } = req.body

        const data = {
            name: name
            , brand: brand
            , category: category
            , price: price
            , offer: offer
            , images: images
        }
        const details=await ProductModel(data).save()
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