module.exports = (sequelize, dataTypes)=>{
    
    const alias = "User";

    const cols = {
        id:{
            type: dataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            autoIncrement: true 
        },
        first_name:{
            type: dataTypes.STRING(50),
            allowNull: false
        },
        last_name:{
            type: dataTypes.STRING(50),
            allowNull: false
        },
        email:{
            type: dataTypes.STRING(50),
            allowNull: false,
            unique: true
        },
        password:{
            type: dataTypes.STRING,
            allowNull: false
        },
        birthday:{
            type: dataTypes.DATE,
            allowNull: false
        },

        user_type_id:{
            type: dataTypes.INTEGER.UNSIGNED
        },
        
        // BUSINESS DATA
        
        
        company:{
            type: dataTypes.STRING(50)
        },
        phone_number: {
            type: dataTypes.STRING(50)
        },
    }

    const User = sequelize.define(alias, cols)

    User.associate = (models) =>{

        User.belongsToMany(models.Product,{
            as:"products",
            through: "wishlists",
            foreignKey: "user_id",
            otherKey:"product_id",
            timestamps: true
        })

        User.belongsTo(models.UserType,{
            as:"user_types",
            foreignKey:"user_type_id",
            timestamps: true
        })

        User.hasMany(models.Item, {
            as: "items",
            foreignKey: "user_id",
            timestamps: true
        });

        User.hasMany(models.Order, {
            as: "orders",
            foreignKey: "user_id",
            timestamps: true
        });
    }

    return User;
}