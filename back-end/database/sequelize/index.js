// const config = require("./config.js");
const { Sequelize, DataTypes } = require("sequelize");


const sequelize = new Sequelize(
  "bi3wechri",
  "root",
  "root",
  {
    host: "localhost",
    dialect: "mysql",
  }
);

const db={}
db.sequelize=sequelize
db.users=require("../sequelize/models/userModel.js")(sequelize, DataTypes)
db.carts=require("../sequelize/models/cart.js")(sequelize, DataTypes)
db.cartitems=require("../sequelize/models/cartItem.js")(sequelize, DataTypes)
db.products=require("../sequelize/models/productModel.js")(sequelize, DataTypes)
db.categories=require("../sequelize/models/categories.js")(sequelize, DataTypes)
db.orders=require("../sequelize/models/orders.js")(sequelize, DataTypes)
db.orderitems=require("../sequelize/models/orderItems.js")(sequelize, DataTypes)
db.review=require("../sequelize/models/review.js")(sequelize, DataTypes)
db.payment=require("../sequelize/models/payment.js")(sequelize, DataTypes)

db.products.belongsTo(db.users, { foreignKey: 'userId' });
db.users.hasMany(db.products, { foreignKey: 'userId' });

db.cartitems.belongsTo(db.carts, { foreignKey: 'cartId' });
db.carts.hasMany(db.cartitems, { foreignKey: 'cartId' });


db.cartitems.belongsTo(db.products, { foreignKey: 'productId' });
db.products.hasMany(db.cartitems, { foreignKey: 'productId' });

db.orders.belongsTo(db.users, { foreignKey: 'userId' });
db.users.hasMany(db.orders, { foreignKey: 'userId' });

db.orderitems.belongsTo(db.orders, { foreignKey: 'orderId' });
db.orders.hasMany(db.orderitems, { foreignKey: 'orderId' });

db.orderitems.belongsTo(db.products, { foreignKey: 'productId' });
db.products.hasMany(db.orderitems, { foreignKey: 'productId' });

db.categories.hasMany(db.products, { foreignKey: 'categoryId' });
db.products.belongsTo(db.categories, { foreignKey: 'categoryId' });

db.carts.belongsTo(db.users, { foreignKey: 'userId' }); 
db.users.hasMany(db.carts, { foreignKey: 'userId' });   

db.review.belongsTo(db.users, { foreignKey: 'userId' }); 
db.users.hasMany(db.review, { foreignKey: 'userId' });  

db.review.belongsTo(db.products, { foreignKey: 'productId' }); 
db.products.hasMany(db.review, { foreignKey: 'productId' });  

db.orders.hasOne(db.payment, { foreignKey: 'orderId' });
db.payment.belongsTo(db.orders, { foreignKey: 'orderId' });

db.payment.belongsTo(db.users, { foreignKey: 'userId' });
db.users.hasMany(db.payment, { foreignKey: 'userId' });

sequelize.authenticate().then((res)=>{
  console.log("all good")
}).catch((err)=>{
  console.log(err)
})




// sequelize
//   .sync({ alter: true })  // `alter: true` بدل `force: true`
//   .then(() => {
//     console.log("Tables synchronized successfully without losing data!");
//   })
//   .catch((error) => {
//     console.error("Unable to synchronize tables: ", error);
//   });


module.exports=db 