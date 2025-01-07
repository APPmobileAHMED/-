const router = require("express").Router();
const {getOrdersBySeller,getOrederItemsByseller,changeStatusOrder,deleteOrders}=require("../controllers/Order")

router.get("/get/:sellerId",getOrdersBySeller)
router.get("/getOrderItems/:idd/:sellerId",getOrederItemsByseller)
router.patch("/changeStatus/:idd",changeStatusOrder)
router.delete("/delete/:id",deleteOrders)

module.exports=router