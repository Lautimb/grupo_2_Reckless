module.exports = (sequelize, dataTypes)=>{
    
    const alias = "Type";

    const cols = {
        id:{
            type: dataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            autoIncrement: true 
        },
        title:{
            type: dataTypes.STRING(50),
            allowNull: false
        }

    }

    const Type = sequelize.define(alias, cols)
    
    Type.associate = (models) =>{
        Type.belongsToMany(models.Product, {
            as: "products",
            through: "product_type",
            foreignKey: "type_id",
            otherKey: "product_id",
            timestamps: true
        })
   
    }
    return Type;

}