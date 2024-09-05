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
db.user=require("../sequelize/models/userModel.js")(sequelize, DataTypes)



sequelize.authenticate().then((res)=>{
  console.log("all good")
}).catch((err)=>{
  console.log(err)
})




// sequelize
//   .sync({ force: true })
//   .then(() => {
//     console.log("phrase table created successfully!");
//   })
//   .catch((error) => {
//     console.error("Unable to create table : ", error);
//   });


module.exports=db 