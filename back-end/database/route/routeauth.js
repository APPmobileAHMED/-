const router = require("express").Router();
const {register,login,updateprofile,getUser,deleteuser}=require("../controllers/auth.js")

router.get("/get/:id",getUser)
router.post("/register",register)
router.post("/login",login)
router.put("/edit/:id",updateprofile)
router.delete("/delete/:email",deleteuser)

module.exports=router