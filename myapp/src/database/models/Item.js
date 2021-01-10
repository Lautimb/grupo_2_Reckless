module.exports = (sequelize, dataTypes)=>{
    
    const alias = "Item";

    const cols = {
        id:{
            type: dataTypes.INTEGER,
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
            type: dataTypes.DECIMAL
        },
        wholesale_price:{
            type: dataTypes.DECIMAL
        },
        discount:{
            type: dataTypes.INTEGER
        },
        qty:{
            type: dataTypes.INTEGER
        },
        item_subtotal:{
            type: dataTypes.DECIMAL
        },
        status:{
            type: dataTypes.TINYINT
        },
        user_id:{
            type: dataTypes.INTEGER
        },
        order_id:{
            type: dataTypes.INTEGER
        },
        product_id:{
            type: dataTypes.INTEGER
        }
    }

    const config = {
        tableName: "items",
        timestamps: true
    }

    const Order = sequelize.define(alias, cols, config)

  


}