module.exports = (sequelize, dataTypes)=>{
    
    const alias = "Color";

    const cols = {
        id:{
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true 
        },
        title:{
            type: dataTypes.STRING
        },
        hexagecimal: {
            type: dataTypes.STRING
        }

    }

    const config = {
        tableName: "colors",
        timestamps: true
    }

    const Color = sequelize.define(alias, cols, config)
    
    Color.associate = (models) =>{
        Color.belongsToMany(models.Product, {
            as: "products",
            through: "product_color",
            foreignKey: "color_id",
            otherKey: "product_id",
            timestamps: true
        })
        Color.hasMany(models.Stock, {
            as: "stocks",
            foreignKey: "color_id",
            timestamps: true
        })
    }
    return Color;

}