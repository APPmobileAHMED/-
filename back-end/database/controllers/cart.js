const db=require("../sequelize/index.js")
module.exports={

 addtocart : (req, res) => {
        const userId = req.params.id; 
        
        db.carts.findOne({ where: { userId } })
          .then(cart => {
            if (!cart) {
              return db.carts.create({ userId });
            }
            return cart;
          })
          .then(cart => {
           
            db.products.findByPk(req.body.productId)
              .then(product => {
                if (!product) {
                  return res.status(404).json({ message: 'Produit non trouvé' });
                }
      
                db.cartitems.findOne({ where: { cartId: cart.id, productId:req.body.productId } })
                  .then(cartItem => {
                    if (cartItem) {
                      
                      return db.cartitems.update({ quantity: cartItem.quantity + req.body.quantity });
                    } else {
                      
                      return db.cartitems.create({
                        cartId: cart.id,
                        productId:req.body.productId,
                        quantity:req.body.quantity,
                      });
                    }
                  })
                  .then(() => {
                    res.status(200).json({ message: 'Produit ajouté au panier avec succès' });
                  })
                  .catch(error => {
                    console.error(error);
                    res.status(500).json({ message: 'Erreur lors de l\'ajout au panier' });
                  });
              })
              .catch(error => {
                console.error(error);
                res.status(500).json({ message: 'Erreur lors de la vérification du produit' });
              });
          })
          .catch(error => {
            console.error(error);
            res.status(500).json({ message: 'Erreur lors de la création ou de la récupération du panier' });
          });
      },

      allitemscart: (req, res) => {
        db.carts.findOne({ where: { userId: req.params.idd } })
            .then((cart) => {
                if (!cart) {
                    return res.json("هذا المستخدم ليس لديه سلة");
                } else {
                    db.cartitems.findAll({ where: { cartId: cart.id } })
                        .then((allitems) => {
                            if (!allitems || allitems.length === 0) {
                               res.send(error);
                            }
    
                            const itemsWithProducts = [];
                            allitems.map(item => {
                                db.products.findByPk(item.productId)
                                    .then(product => {
                                        
                                        itemsWithProducts.push({
                                            id: item.id, 
                                            cartId: item.cartId,
                                            productId: item.productId,
                                            quantity: item.quantity,
                                            product: product 
                                        });
    
                                        
                                        if (itemsWithProducts.length === allitems.length) {
                                            res.send(itemsWithProducts);
                                        }
                                    })
                                    .catch(err => {
                                        res.send(err); 
                                    });
                            });
                        })
                        .catch((err) => {
                            res.send(err); 
                        });
                }
            })
            .catch((err) => res.send(err)); 
        },
    deleteItems:(req,res)=>{
      db.carts.findOne({where:{userId:req.params.idd}}).then((cart)=>{
        if(!cart){
           res.json("this user dosent have a cart")
        }else{
          db.cartitems.destroy({where:{cartId:cart.id,productId:req.body.productId}}).then(()=>{
            res.send("this product is deleted")
          
          }).catch((err)=>res.send(err))
        }
      }).catch((err)=>res.json(err))
    }       
    
}