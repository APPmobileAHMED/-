const db=require("../sequelize/index.js")
module.exports={

addTofavor:(req,res)=>{

db.wishlist.create({
    userId:req.params.id,
    productId:req.body.productId
})
.then((response)=>res.send(response))
.catch((err)=>res.send(err))
} ,

getFavoritProduct:(req,res)=>{

    db.wishlist.findAll({where:{userId:req.params.id}, include: {
        model: db.products, // تأكد من أن اسم النموذج المستخدم صحيح
        attributes: ['name', 'img1', 'length','width','price','stock'], // اختر الأعمدة التي تريدها من جدول المستخدمين
    }})
    .then((response)=>res.send(response))
    .catch((error)=>res.send(error))

},

deleteFavoritProduct:(req,res)=>{
    db.wishlist.destroy({where:{productId:req.params.id}})
    .then((response)=>res.sendStatus(201))
    .catch((error)=>res.sendStatus(404))
}
    
}