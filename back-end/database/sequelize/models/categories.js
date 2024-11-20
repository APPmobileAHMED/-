

module.exports = (sequelize, DataTypes) => {
    const Categories = sequelize.define("Categories", {
      name:{ 
          type: DataTypes.ENUM('نوافذ','أبواب','لوازم المطبخ','أبواب حديدية كبيرة'),
          allowNull: false,
         },

      specifiqueType:{ type: DataTypes.ENUM('خشب', 'حديدية','ألومنيوم'),
        allowNull: true,},
    });
    return Categories;
  };
  