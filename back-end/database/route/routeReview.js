const router = require("express").Router();
const {getcommentsForThisProduct,addComments}=require("../controllers/review")


router.get("/getall/:idd",getcommentsForThisProduct)


router.post("/add/:idd",addComments)



module.exports=router