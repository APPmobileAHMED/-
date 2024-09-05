const bcrypt = require("bcryptjs");
const db = require("./database/sequelize/index.js");

(async () => {
  try {
    const pw = "admin";
    const hashedPassword = await bcrypt.hash(pw, 10);
    const admin = await db.admin.create({
      username: "admin",
      email :"admin@gmail.com",
      password: hashedPassword,
      role:"admin"

    });
    console.log("admin created:", admin);
  } catch (error) {
    console.error("error:", error);
  }
})();