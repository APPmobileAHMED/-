const db=require("../sequelize/index.js")
const { Op } = require("sequelize");
module.exports={
searchByName:(req,res)=>{
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
searchBycategoriesBySpecifqueType:(req,res)=>{
    db.products.findAll({
        include: [
          {
            model: db.categories,
            where: { specifiqueType: req.params.specifiqueType},
          },
        ],
      }).then((response)=>{
        res.send(response)
    })
    .catch((err)=>res.send(err))
},

searchBycategoriesBySpecifqueTypeAndName:(req,res)=>{
    db.products.findAll({
        include: [
          {
            model: db.categories,
            where: { specifiqueType: req.params.specifiqueType,name:req.params.name},
          }
        ],
      }).then((response)=>{
        res.send(response)
    })
    .catch((err)=>res.send(err))
} ,

serachByMeasureAndName:(req,res)=>{
    db.products.findAll({where:{name:req.params.name,width:req.params.width,length:req.params.length}})
    .then((response)=>{
        res.send(response)
    })
    .catch((err)=>res.send(err))
},

searchBycategoriesBySpecifqueTypeAndMeasuresAndName: (req, res) => {
    db.products.findAll({
        include: [
            {
                model: db.categories,
                where: {
                    name: req.params.name,
                    specifiqueType: req.params.specifiqueType
                }
            }
        ],
        where: {
            length: req.params.length,
            width: req.params.width
        }
    })
    .then((response) => {
        res.send(response);
    })
    .catch((err) => res.send(err));
},
searchBycategoriesBySpecifqueTypeAndMeasures: (req, res) => {
  db.products.findAll({
      include: [
          {
              model: db.categories,
              where: {
                  specifiqueType: req.params.specifiqueType
              }
          }
      ],
      where: {
          length: req.params.length,
          width: req.params.width
      }
  })
  .then((response) => {
      res.send(response);
  })
  .catch((err) => res.send(err));
},


BarSearch: (req, res) => {
  db.products.findAll({
      where: {
          name: {
              [Op.like]: `${req.params.name}%`
          }
      }
  })
  .then((response) => {
      res.send(response);
  })
  .catch((err) => res.send(err));
},




    
}