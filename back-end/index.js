
const express = require("express");
const cors = require("cors");
const session =require('express-session')
const passport=require("passport")
require('dotenv').config()
const PORT = 8080;
const app = express();

 require("./database/sequelize/index.js");
 
 const routeruser=require("./database/route/routeauth.js")
 const routercategories=require("./database/route/routeCategories.js")
 const routerproduct=require("./database/route/routeProduct.js")
 const routercart=require("./database/route/routeCart.js")
 const routerreview=require("./database/route/routeReview.js")

 const routerPayment=require("./database/route/routePayment.js")
  const routerPassport=require("./database/route/routePassport.js")
app.use(express.json());
app.use(cors());

app.use(session({ secret: 'process.env.SECRET', resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());



app.use("/api",routeruser)
app.use("/api/category",routercategories)
app.use("/api/product",routerproduct)
app.use("/api/cart",routercart)
app.use("/api/review",routerreview)

app.use("/api/payment",routerPayment)
app.use("/",routerPassport)



app.get("/", (req, res) => {
  res.send("Hello from the server!");
});

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});
