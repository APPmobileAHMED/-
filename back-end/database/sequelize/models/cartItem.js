
  module.exports = (sequelize, DataTypes) => {
    const cartItems = sequelize.define("cartItems", {
    
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 1,
          }
          
    });
    return cartItems;
  };
  