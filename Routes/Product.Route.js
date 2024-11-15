const mongoose = require("mongoose")
const createError = require("http-errors")
const Product = require("../Models/Product.Model")
module.exports = {
    getAllProducts: async (req, res, next) => {
        try {
            const getAllProducts = await Product.find({}, { "__v": 0 })
            res.send(getAllProducts)
        } catch (error) {
            console.log(error.message)
        }
    },
    insertNewProduct: async (req, res, next) => {
        try {
            const update = req.body
            const insertProdcut = new Product(update)
            const result = await insertProdcut.save()
            res.send(result)
        } catch (error) {
            console.log(error.message)
        }
    },
    GetASingleProduct: async (req, res, next) => {
        const id = req.params.id
        try {
            const result = await Product.findById(id)
            if (!result) {
                throw createError(404, "Product Not found")
            }
            res.send(result)
        } catch (error) {
            console.log(error.message)
            if(error instanceof mongoose.CastError){
                return next(createError(400, "invalid Product id"))
            }
            next(error)
        }
    },
    UpdateASingleProduct: async (req, res, next) => {
        try {
            const id = req.params.id
            const update = req.body
            const options = { new: true }
            const result = await Product.findByIdAndUpdate(id, update, options)
            if (!result) {
                throw createError(404, "Product Not found")
            }
            res.send(result)
        } catch (error) {
            console.log(error.message)
            if (error instanceof mongoose.CastError) {
                return next(createError(400, "invalid Product id"))
            }
            next(error)
        }
    },
    DeleteASingleProduct: async (req, res, next) => {
        const id = (req.params.id)
        try {
            const result = await Product.findByIdAndDelete(id)
            if (!result) {
                throw createError(404, "Product Not found")
            }
            res.send(result)
        } catch (error) {
            console.log(error.message)
            if (error instanceof mongoose.CastError) {
                return next(createError(400, "invalid Product id"))
            }
            next(error)
        }
    }
}