const router = require("express").Router();
const {getOrdersBySeller,getOrederItemsByseller,changeStatusOrder}=require("../controllers/Order")

router.get("/get/:sellerId",getOrdersBySeller)
router.get("/getOrderItems/:idd/:sellerId",getOrederItemsByseller)
router.patch("/changeStatus/:idd",changeStatusOrder)

module.exports=router