const express = require("express")
const Router = express.Router()

const ProductRoute = require("../Routes/Product.Route")
Router.get("/", ProductRoute.getAllProducts)
Router.post("/", ProductRoute.insertNewProduct)
Router.get("/:id", ProductRoute.GetASingleProduct)
Router.patch("/:id", ProductRoute.UpdateASingleProduct)
Router.delete("/:id", ProductRoute.DeleteASingleProduct)
module.exports = Router