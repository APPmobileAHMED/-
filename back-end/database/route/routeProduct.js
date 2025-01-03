const router = require("express").Router();
const {addProduct,getproductFindeStock,getoneproduct,removeProduct,getallProductByUser}=require("../controllers/Product.js")


router.get("/finstock",getproductFindeStock)
router.get("/:id",getoneproduct)
router.get("/ourProduct/:idd",getallProductByUser)

router.post("/add",addProduct)

router.delete("/:id",removeProduct)

module.exports=router