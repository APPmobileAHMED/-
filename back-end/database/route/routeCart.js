const router = require("express").Router();
const {addtocart,allitemscart, deleteItems,deleteAllItems,updateCart}=require("../controllers/cart")


router.get("/cartitems/:idd",allitemscart)
router.post("/addtocart/:id",addtocart)
router.delete("/deleteitems/:idd",deleteItems)
router.delete("/deleteAllitems/:idd",deleteAllItems)
router.put("/updatequantity/:idd",updateCart)


module.exports=router