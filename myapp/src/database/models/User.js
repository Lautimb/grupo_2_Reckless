module.exports = (sequelize, dataTypes)=>{
    
    const alias = "User";

    const cols = {
        id:{
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true 
        },
        first_name:{
            type: dataTypes.STRING
        },
        last_name:{
            type: dataTypes.STRING
        },
        email:{
            type: dataTypes.STRING
        },
        password:{
            type: dataTypes.STRING
        },
        birthday:{
            type: dataTypes.DATE
        },

        // BUSINESS DATA
        
        manager_first_name : {
            type: dataTypes.STRING
        },
        manager_last_name :{
            type: dataTypes.STRING
        },
        company:{
            type: dataTypes.STRING
        },
        phone_number: {
            type: dataTypes.INTEGER
        },
        user_type_id:{
            type: dataTypes.INTEGER
        }
    }

    const config = {
        tableName: "users",
        timestamps: true
    }

    const User = sequelize.define(alias, cols, config)

    User.associate = (models) =>{
        User.belongToMany(models.Product,{
            as:"products",
            through: "wishlists",
            foreignKey: "user_id",
            otherKey:"product_id",
            timestamps: true
        })
        User.belongTo(models.UserType,{
            as:"user_types",
            foreignKey:"user_type_id",
            timestamps: true
        })
    }

   
    
    return User;

}