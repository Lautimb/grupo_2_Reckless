module.exports = (sequelize, dataTypes)=>{
    
    const alias = "Image";

    const cols = {
        id:{
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true 
        },
        filename:{
            type: dataTypes.STRING
        }

    }

    const config = {
        tableName: "images",
        timestamps: true
    }

    const Image = sequelize.define(alias, cols, config)
    
    Image.associate = (models) =>{
        Image.belongsToMany(models.Product, {
            as: "products",
            through: "product_image",
            foreignKey: "image_id",
            otherKey: "product_id",
            timestamps: true
        })
    }
    return Image;

}