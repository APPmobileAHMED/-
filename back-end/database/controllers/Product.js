const { where } = require("sequelize")
const { Op } = require("sequelize");
const db=require("../sequelize/index.js")
module.exports={
  addProduct: async (req, res) => {
    try {
      const category = await db.categories.findOne({
        where: {
          name: req.body.nameCategory,
          specifiqueType: req.body.specifiqueType,
        },
      });
  
      if (!category) {
        return res.status(404).send("Category not found");
      }
  
      
      const product = await db.products.create({
        name: req.body.name,
        img1: req.body.img1,
        img2: req.body.img2,
        img3: req.body.img3,
        img4: req.body.img4,
        width: req.body.width,
        length: req.body.length,
        price: req.body.price,
        stock: req.body.stock,
        categoryId: category.id, 
        userId: req.body.userId,
      });
  
      return res.status(201).json(product);
    } catch (err) {
      console.error(err);
      return res.status(500).send("Server error");
    }
  },
    
      getproductFindeStock: (req, res) => {
        db.products
          .findAll({
            where: {
              stock: { [Op.lt]: 10 }, 
            },
          })
          .then((product) => {
            if (product) {
              res.json(product);
            } else {
              res.status(404).send("Product not found or stock not less than 10");
            }
          })
          .catch((err) => {
            console.error(err);
            res.status(500).send("Error retrieving product");
          });
      },

      getoneproduct:(req,res)=>{

      db.products.findByPk(req.params.id)
      .then(result => {
          if (result) {
              res.send(result)
          } else {
              res.send('No element found.');
          }
      })
      .catch(error => {
          res.send(error);
      });

      },


      removeProduct:(req,res)=>{
      
        db.products.destroy({where:{id:req.params.id}})
        .then((response)=>res.json(response))
       .catch((err)=>{res.json(err)})

      },
      getallProductByUser: (req, res) => {
        db.products
          .findAll({
            where: {userId:req.params.idd},
          })
          .then((product) => {
            if (product) {
              res.json(product);
            } else {
              res.status(404).send("Product not found ");
            }
          })
          .catch((err) => {
            console.error(err);
            res.status(500).send("Error retrieving product");
          });
      },






    }

