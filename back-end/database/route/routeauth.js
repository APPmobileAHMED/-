const router = require("express").Router();
const {register,login,updateprofile}=require("../controllers/auth.js")


router.post("/register",register)
router.post("/login",login)
router.put("/edit/:id",updateprofile)


module.exports=router