const router = require("express").Router();
const {getcommentsForThisProduct,addComments,deleteComment}=require("../controllers/review")


router.get("/getall/:idd",getcommentsForThisProduct)


router.post("/add/:idd",addComments)
router.delete("/delete/:id",deleteComment)


module.exports=router