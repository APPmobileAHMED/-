

module.exports = (sequelize, DataTypes) => {
    const Product = sequelize.define("product", {
      name:
      { type : DataTypes.STRING,
      allowNull : false },
      
  
      img1: {
        type: DataTypes.STRING,
        allowNull : false 
      },
      img2: {
        type: DataTypes.STRING,
        allowNull : false 
      },
      img3: {
        type: DataTypes.STRING,
        allowNull : false 
      },
      img4: {
        type: DataTypes.STRING,
        allowNull : false 
      },
  
      category:{
        type: DataTypes.STRING,
        allowNull : false 
      },
      price:{
        type: DataTypes.STRING,
        allowNull : false 
      },
      description:{
        type: DataTypes.STRING,
        allowNull : false 
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1
    },
      condition: DataTypes.STRING,
    });
    return Product;
  };
  