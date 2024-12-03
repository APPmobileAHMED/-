const router = require("express").Router();
const {payments}=require("../controllers/payment")


router.post("/buy",payments)



module.exports=router