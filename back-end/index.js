const express = require("express");
const cors = require("cors");
const PORT = 8080;
const app = express();
 require("./database/sequelize/index.js");

 const routeregister=require("./database/route/routeauth.js")
 const routeLogin=require("./database/route/routeauth.js")
 const routeUpdateProfile=require("./database/route/routeauth.js")
app.use(express.json());
app.use(cors());


app.use("/api",routeregister)
app.use("/api",routeLogin)
app.use("/api",routeUpdateProfile)

app.get("/", (req, res) => {
  res.send("Hello from the server!");
});

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});
