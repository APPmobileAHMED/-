const stripe = require('stripe')("sk_test_51PVa8kJY9AOOIdR7XsWd1RtDWzTwMDgan3A1cojDf6tGLRfHCVl7wbUctgKFDHTTo5rZnagwVTE5DltAlM8CI7wX00RzRwpT3X");
const db=require("../sequelize/index.js")



module.exports={


    payments: async (req, res) => {
        const t = await db.sequelize.transaction(); // Transaction باش نضمن العملية الكاملة تصير بدون مشاكل
        try {
          const { userId, cartItems, totalAmount } = req.body;
    
          // Step 1: إنشاء Payment Intent مع Stripe
          const paymentIntent = await stripe.paymentIntents.create({
            amount: Math.round(totalAmount * 100), // تحويل للمليمات
            currency: 'usd',
            payment_method_types: ['card'],
          });
    
          // Step 2: تسجيل البيانات في جدول "payment"
         
    
          // Step 3: إنشاء Order جديد
          const order = await db.orders.create({
            totalAmount: totalAmount,
            userId: userId,
            status: 'pending', // الافتراضي
          }, { transaction: t });
    
          // Step 4: تسجيل OrderItems لكل منتج في السلة
          for (const item of cartItems) {
            await db.orderitems.create({
              orderId: order.id,
              productId: item.productId,
              quantity: item.quantity,
              price: item.product.price,
            }, { transaction: t });
          }
    
          const payment = await db.payment.create({
            totalAmount: totalAmount,
            username: req.body.username, // مفترض نجيبها من البيانات اللي جيت من الـ request
            userId: userId,
            orderId:order.id
          }, { transaction: t });
          // إذا وصلنا هنا، نأكد العملية
          await t.commit();
    
          // Step 5: إرسال الـ clientSecret باش نكمل عملية الدفع
          res.send({
            clientSecret: paymentIntent.client_secret,
            message: "Payment, order, and order items created successfully!",
          });
        } catch (error) {
          // إلغاء العملية في حالة وجود خطأ
          await t.rollback();
          res.status(400).send({
            error: {
              message: error.message,
            },
          });
        }
      },
      
 
deletePayment:(req,res)=>{
      
    db.payment.destroy({where:{id:req.params.id}})
    .then((response)=>res.sendStatus(201))
   .catch((err)=>{res.json(err)})

  }
  ,
  deleteOrderItmes:(req,res)=>{
      
    db.orderitems.destroy({where:{id:req.params.id}})
    .then((response)=>res.sendStatus(201))
   .catch((err)=>{res.json(err)})

  }
    
}