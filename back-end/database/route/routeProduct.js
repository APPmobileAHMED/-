const router = require("express").Router();
const {addProduct,getproductFindeStock,getoneproduct,removeProduct}=require("../controllers/Product.js")


router.get("/finstock",getproductFindeStock)
router.get("/:id",getoneproduct)

router.post("/add",addProduct)

router.delete("/:id",removeProduct)

module.exports=router