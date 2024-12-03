const router = require("express").Router();
const {addtocart,allitemscart, deleteItems}=require("../controllers/cart")


router.get("/cartitems/:idd",allitemscart)
router.post("/addtocart/:id",addtocart)
router.delete("/deleteitems/:idd",deleteItems)




module.exports=router