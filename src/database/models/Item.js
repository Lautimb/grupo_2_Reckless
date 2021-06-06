module.exports = (sequelize, dataTypes)=>{
    
    const alias = "Item";

    const cols = {
        id:{
            type: dataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            autoIncrement: true 
        },
        name:{
            type: dataTypes.STRING
        },
        img:{
            type: dataTypes.STRING
        },
        price:{
            type: dataTypes.DECIMAL,
            allowNull: false
        },
        wholesale_price:{
            type: dataTypes.DECIMAL,
            allowNull: false
        },
        discount:{
            type: dataTypes.INTEGER.UNSIGNED,
            defaultValue: '0'
        },
        qty:{
            type: dataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            defaultValue: '0'
        },
        item_subtotal:{
            type: dataTypes.DECIMAL(10, 2)
        },
        user_id:{
            type: dataTypes.INTEGER.UNSIGNED
        },
        order_id:{
            type: dataTypes.INTEGER.UNSIGNED
        }
    }

    const Item = sequelize.define(alias, cols)

    Item.associate = (models) => {

        Item.belongsTo(models.Order, {
            as: "orders",
            foreignKey: "order_id",
            timestamps: true
        });

        Item.belongsTo(models.User, {
            as: "userss",
            foreignKey: "user_id",
            timestamps: true
        });
    }
  
    return Item;
}