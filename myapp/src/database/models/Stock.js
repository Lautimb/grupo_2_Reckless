module.exports = (sequelize, dataTypes)=>{
    
    const alias = "Stock";

    const cols = {
        id:{
            type: dataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            autoIncrement: true 
        },
         qty:{
            type: dataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            defaultValue: "0"
        },
        product_id: {
            type: dataTypes.INTEGER.UNSIGNED
        },
        color_id: {
            type: dataTypes.INTEGER.UNSIGNED
        },
        size_id:{
            type: dataTypes.INTEGER.UNSIGNED
        }

    }
    
    const Stock = sequelize.define(alias, cols)
    
    Stock.associate = (models) =>{
        Stock.belongsTo(models.Product, {
            as: "products",
            foreignKey: "product_id",
            timestamps: true
        })
        Stock.belongsTo(models.Color,{
            as:"colors",
            foreignKey:"color_id"
        })
        Stock.belongsTo(models.Size,{
            as:"sizes",
            foreignKey:"size_id"
        })
    }
    return Stock;

}