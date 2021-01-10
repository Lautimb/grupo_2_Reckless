module.exports = (sequelize, dataTypes)=>{
    
    const alias = "UserType";

    const cols = {
        id:{
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true 
        },
        title:{
            type: dataTypes.STRING
        }

    }

    const config = {
        tableName: "user_types",
        timestamps: true
    }

    const UserType = sequelize.define(alias, cols, config)
    
    UserType.associate = (models) =>{
        UserType.belongsTo(models.User, {
            as: "users",
            foreignKey: "user_type_id", 
            timestamps: true
        })
   
    }
    return UserType;

}