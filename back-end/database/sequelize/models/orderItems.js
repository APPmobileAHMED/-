

  module.exports = (sequelize, DataTypes) => {
    const orderItems = sequelize.define("orderItems", {
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 1,
          },
          price: {
            type: DataTypes.FLOAT,
            allowNull: false,
          }
      
    });
    return orderItems;
  };
  