module.exports = (sequelize, dataTypes)=>{
    
    const alias = "Order";

    const cols = {
        id:{
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true 
        },
        order_number:{
            type: dataTypes.STRING
        },
        total_qty:{
            type: dataTypes.INTEGER
        },
        subtotal:{
            type: dataTypes.DECIMAL
        },
        promotion:{
            type: dataTypes.STRING
        },
        discount:{
            type: dataTypes.INTEGER
        },
        user_id:{
            type: dataTypes.INTEGER
        }
    }

    const config = {
        tableName: "orders",
        timestamps: true
    }

    const Order = sequelize.define(alias, cols, config)

}