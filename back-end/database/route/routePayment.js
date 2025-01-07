const router = require("express").Router();
const {payments,deletePayment,deleteOrderItmes}=require("../controllers/payment")


router.post("/buy",payments)
router.delete("/delete/:id",deletePayment)
router.delete("/deleteOrderItems/:id",deleteOrderItmes)



module.exports=router