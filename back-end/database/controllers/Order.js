const { where } = require("sequelize")
const { Op } = require("sequelize");
const db=require("../sequelize/index.js")
module.exports={

    getOrdersBySeller: async (req, res) => {
        try {
      
          const orders = await db.orders.findAll({
            include: [
              {
                model: db.orderitems, 
                include: [
                  {
                    model: db.products, 
                    where: { userId: req.params.sellerId }, 
                  },
                ],
              },
              {
                model: db.users, 
                attributes: ['id', 'firstname','lastname','phoneNumber','photoDeprofile','location', 'email'], 
              },
            ],
          });
      
          const allOrder = orders.filter(item => item.orderItems.length > 0);

          if (!allOrder.length) {
            return res.status(404).json({ message: 'No orders found for this seller.' });
          }
      
          res.status(200).json(allOrder);
        } catch (error) {
          console.error(error);
          res.status(500).json({ message: 'Error fetching orders for this seller.' });
        }
      },


      getOrederItemsByseller: async (req, res) => {
        try {
          
          const orderItem = await db.orderitems.findAll({
            where: { orderId: req.params.idd }, 
            include: [
              {
                model: db.products, 
                where: { userId: req.params.sellerId },
                attributes: ['id', 'name', 'price',"img1","width","length","userId"], 
              },
            ],
          });
    
          if (!orderItem) {
            return res.status(404).json({ message: 'Order item not found or product does not belong to this seller.' });
          }
    
          res.status(200).json(orderItem);
        } catch (error) {
          console.error(error);
          res.status(500).json({ message: 'Error fetching order item for this seller.' });
        }
      },
      changeStatusOrder:(req,res)=>{
        db.orders.update({status:req.body.status},{where:{id:req.params.idd}})
        .then(result => {
          if (result[0] === 0) {
           
            return res.status(404).json({ message: 'order not found' });
          }
          res.status(200).json({ message: 'Order updated successfully' });
        })
        .catch(error => {
          console.error(error);
          res.status(500).json({ message: 'Error updating Order' });
        });
      }
      ,
 
deleteOrders:(req,res)=>{
      
    db.orders.destroy({where:{id:req.params.id}})
    .then((response)=>res.sendStatus(201))
   .catch((err)=>{res.json(err)})

  },
  


    }

