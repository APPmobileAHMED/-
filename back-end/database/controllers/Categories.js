const db=require("../sequelize/index.js")
module.exports={
addCategories:(req,res)=>{
    db.categories.create({
        name:req.body.name,
        specifiqueType:req.body.specifiqueType
    }).then((response)=>{
        res.send(response)
    })
    .catch((err)=>{
        res.send(err)
    })
},
getAllCategories:(req,res)=>{

    db.categories.findAll().then((response)=>{
        res.send(response)
    })
    .catch((err)=>res.send(err))
},
getallproductBycategoriesByname:(req,res)=>{
    db.products.findAll({
        include: [
          {
            model: db.categories,
            where: { name: req.params.name },
          },
        ],
      }).then((response)=>{
        res.send(response)
    })
    .catch((err)=>res.send(err))
},
getallproductBycategoriesBySpecifqueType:(req,res)=>{
    db.products.findAll({
        include: [
          {
            model: db.categories,
            where: { specifiqueType: req.params.specifiqueType ,name: req.params.name },
          },
        ],
      }).then((response)=>{
        res.send(response)
    })
    .catch((err)=>res.send(err))
},
    
}