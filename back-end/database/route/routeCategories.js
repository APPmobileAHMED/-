const router = require("express").Router();
const {addCategories,getAllCategories,getallproductBycategoriesByname,getallproductBycategoriesBySpecifqueType}=require("../controllers/Categories")

router.get("/showall",getAllCategories)
router.get("/:name",getallproductBycategoriesByname)
router.get("/:name/:specifiqueType",getallproductBycategoriesBySpecifqueType)
router.post("/add",addCategories)



module.exports=router