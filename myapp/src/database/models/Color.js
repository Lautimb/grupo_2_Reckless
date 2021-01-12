module.exports = (sequelize, DataTypes)=>{
    
    const alias = "Color";

    const cols = {
        id:{
            type: DataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            autoIncrement: true 
        },
        title:{
            type: DataTypes.STRING,
            allowNull: false
        },
        hexadecimal: {
            type: DataTypes.STRING,
            allowNull: false
        }

    };

    const Color = sequelize.define(alias, cols)
    
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