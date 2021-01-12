module.exports = (sequelize, dataTypes)=>{
    
    const alias = "Product";

    const cols = {
        id:{
            type: dataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            autoIncrement: true 
        },
        name:{
            type: dataTypes.STRING,
            allowNull: false
        },
        description:{
            type: dataTypes.STRING,
            allowNull: false
        },
        price:{
            type: dataTypes.DECIMAL(10,2).UNSIGNED,
            allowNull: false
        },
        wholesale_price: {
            type: dataTypes.DECIMAL(10,2).UNSIGNED,
            allowNull: false
        },
        discount: {
            type: dataTypes.SMALLINT.UNSIGNED,
            defaultValue: "0"
        },
        art: {
            type: dataTypes.STRING(50),
            allowNull: false
        }
    }
    
    const Product = sequelize.define(alias, cols)

    Product.associate = (models)=>{
        Product.belongsToMany(models.Type, {
            as: "types",
            through: "product_type",
            foreignKey: "product_id",
            otherKey: "type_id",
            timestamps: true
        });
        Product.belongsToMany(models.Color, {
            as: "colors",
            through: "product_color",
            foreignKey: "product_id",
            otherKey: "color_id",
            timestamps: true
        });
        Product.belongsToMany(models.Image, {
            as: "images",
            through: "product_image",
            foreignKey: "product_id",
            otherKey: "image_id",
            timestamps: true
        });
        Product.belongsToMany(models.Size, {
            as: "sizes",
            through: "product_size",
            foreignKey: "product_id",
            otherKey: "size_id",
            timestamps: true
        });
        Product.hasMany(models.Stock,{
            as: "stocks",
            foreignKey: "product_id",
            timestamps: true
        });

        Product.belongsToMany(models.User,{
            as:"users",
            through:"wishlists",
            foreignKey: "product_id",
            otherKey:"user_id",
            timestamps: true
        });
        
    }
    return Product;

}
