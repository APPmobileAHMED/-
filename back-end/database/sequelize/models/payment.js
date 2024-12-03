
  

module.exports = (sequelize, DataTypes) => {
    const payment = sequelize.define("payment", {
        totalAmount: {
            type: DataTypes.FLOAT,
            allowNull: false,
          },

          username: {
            type: DataTypes.STRING,
            allowNull: false,
          }
        
      
    });
    return payment ;
  };
  