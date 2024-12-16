


const router = require("express").Router();
const {paymentWalletFlouci,verify}=require("../controllers/paymentWalletFlouci")




router.post("/buy",paymentWalletFlouci)   
router.get("/buy/:id",verify)



module.exports=router