const router = require("express").Router();
const {register,login,updateprofile,getUser,deleteuser,sendMail,getUserByEmail}=require("../controllers/auth.js")
router.get("/getEmail/:email",getUserByEmail)
router.get("/get/:id",getUser)

router.post("/register",register)
router.post("/login",login)
router.post("/forgetPassword",sendMail)
router.put("/edit/:id",updateprofile)
router.delete("/delete/:email",deleteuser)

module.exports=router