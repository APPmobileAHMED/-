

const router = require("express").Router();
const {addTofavor,getFavoritProduct,deleteFavoritProduct}=require("../controllers/wishlist")




router.get("/get/:id",getFavoritProduct)
router.post("/add/:id",addTofavor)
router.delete("/delete/:id",deleteFavoritProduct)



module.exports=router