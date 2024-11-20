module.exports = (sequelize, DataTypes) => {
    const Review = sequelize.define("Review", {
     
      comment: {
        type: DataTypes.TEXT,
        allowNull: false
      },
    
      
    });
  
    return Review;
  };