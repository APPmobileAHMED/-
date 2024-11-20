

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
      length: { // طول
        type: DataTypes.FLOAT,
        allowNull: false,
        comment: "طول المنتج",
    },
    width: { // عرض
        type: DataTypes.FLOAT,
        allowNull: false,
        comment: "عرض المنتج",
    },
      price: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      stock: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
    
            
    });
    return Product;
  };
  