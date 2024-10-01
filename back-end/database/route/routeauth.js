const router = require("express").Router();
const {register,login,updateprofile,getUser}=require("../controllers/auth.js")

router.get("/get/:id",getUser)
router.post("/register",register)
router.post("/login",login)
router.put("/edit/:id",updateprofile)


module.exports=router