


const router = require("express").Router();
const {paymentWalletFlouci,verify,savePayment}=require("../controllers/paymentWalletFlouci")




 
router.get("/buy/:id",verify)
router.post("/buy",paymentWalletFlouci)  
router.post("/save",savePayment)





module.exports=router