module.exports = (sequelize, dataTypes)=>{
    
    const alias = "Product";

    const cols = {
        id:{
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true 
        },
        name:{
            type: dataTypes.STRING
        },
        price:{
            type: dataTypes.DECIMAL
        },
        wholesale_price: {
            type: dataTypes.DECIMAL
        },
        discount: {
            type: dataTypes.SMALLINT
        },
        art: {
            type: dataTypes.STRING  //CHEQUEAR
        },

    }

    const config = {
        tableName: "products",
        timestamps: true
    }

    const Product = sequelize.define(alias, cols, config)

    Product.associate = (models)=>{
        Product.belongsToMany(models.Type, {
            as: "types",
            through: "product_type",
            foreignKey: "product_id",
            otherKey: "type_id",
            timestamps: true
        })
        Product.belongsToMany(models.Color, {
            as: "colors",
            through: "product_color",
            foreignKey: "product_id",
            otherKey: "color_id",
            timestamps: true
        })
        Product.belongsToMany(models.Image, {
            as: "images",
            through: "product_image",
            foreignKey: "product_id",
            otherKey: "image_id",
            timestamps: true
        })
        Product.belongsToMany(models.Size, {
            as: "sizes",
            through: "product_size",
            foreignKey: "product_id",
            otherKey: "size_id",
            timestamps: true
        })
        Product.hasMany(models.Stock,{
            as: "stocks",
            foreignKey: "product_id"
        })

        Product.belongToMany(models.User,{
            as:"users",
            through:"wishlists",
            foreignKey: "product_id",
            otherKey:"user_id",
            timestamps: true

        })
        
    }
    return Product;

}
