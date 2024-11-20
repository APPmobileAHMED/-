
  

module.exports = (sequelize, DataTypes) => {
    const order = sequelize.define("order", {
        totalAmount: {
            type: DataTypes.FLOAT,
            allowNull: false,
          },
          status: {
            type: DataTypes.STRING,
            defaultValue: 'pending',  // status like 'pending', 'shipped', 'delivered'
          }
      
    });
    return order;
  };
  