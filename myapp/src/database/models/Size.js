module.exports = (sequelize, dataTypes)=>{
    
    const alias = "Size";

    const cols = {
        id:{
            type: dataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            autoIncrement: true 
        },
        title:{
            type: dataTypes.STRING(5),
            allowNull: false
        }

    }

    const Size = sequelize.define(alias, cols)
    
    Size.associate = (models) =>{
        Size.belongsToMany(models.Product, {
            as: "products",
            through: "product_sizes",
            foreignKey: "size_id",
            otherKey: "product_id",
            timestamps: true
        })
        Size.hasMany(models.Stock, {
            as:"stocks",
            foreignKey: "size_id",
            timestamps: true
        })
    }
    return Size;

}