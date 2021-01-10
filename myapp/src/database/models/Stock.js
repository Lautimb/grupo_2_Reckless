module.exports = (sequelize, dataTypes)=>{
    
    const alias = "Stock";

    const cols = {
        id:{
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true 
        },
         qty:{
            type: dataTypes.INTEGER
        },
        product_id: {
            type: dataTypes.INTEGER
        },
        color_id: {
            type: dataTypes.INTEGER
        },
        size_id:{
            type: dataTypes.INTEGER
        }

    }

    const config = {
        tableName: "stocks",
        timestamps: true
    }

    const Stock = sequelize.define(alias, cols, config)
    
    Stock.associate = (models) =>{
        Stock.belongsTo(models.Product, {
            as: "products",
            foreignKey: "stock_id",
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