module.exports= (sequelize, DataTypes) => {
    const admin = sequelize.define("admin", {
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
          },
          email: {
            type: DataTypes.STRING,
            allowNull: false,
          },
          password: {
            type: DataTypes.STRING,
            allowNull: false,
          },
          role: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: "admin",
          },  
    });
    return admin;
  };