module.exports = (sequelize, dataTypes)=>{
    
    const alias = "Image";

    const cols = {
        id:{
            type: dataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            autoIncrement: true
        },
        filename:{
            type: dataTypes.STRING
        }

    }
    
    const Image = sequelize.define(alias, cols)
    
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