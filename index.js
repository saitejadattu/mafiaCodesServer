const express = require("express")
const mongoose = require("mongoose")
const app = express()
const createError = require("http-errors")
const Router = require("./Controllers/Product.Controller")
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

mongoose.connect("mongodb+srv://killer:IUs9tJz198I0Tzuy@cluster0.j1ccr.mongodb.net/secondTimePractice")
    .then(() => console.log("mongoDB connected"))
app.all("/test", (req, res, next) => {
    res.send(req.body)
})
app.use("/product", Router)
app.use((req, res, next) => {
    next(createError(404, "Not found"))
})
app.use((err, req, res, next) => {
    res.status(err.status || 500)
    res.send({
        status: err.status || 500,
        message: err.message
    })
})
app.listen(3000, () => console.log("server is running on http://localhost:3000"))