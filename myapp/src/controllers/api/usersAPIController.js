const { User } = require('../../database/models');

module.exports = {
    async list (req, res) {
        try{
            const users = await User.findAll({
                attributes: {exclude: ['password','user_type_id']}
            })
            
            users.forEach( user => {
                return user.setDataValue('detail',`http://localhost:3300/api/users/${user.id}`)
            })
            
            res.json({
                meta:{
                    state:'sucess',
                    count: users.length
                },
                users
            })
        } catch (error) {
            res.status(500).json({
                meta: {
                    status: 'error',
                },
                error: 'Users not found',
            })
        }
    },

    async detail (req,res){
        try{
            const id = req.params.id
            const user = await User.findByPk(id,{
                attributes: {exclude: ['password','user_type_id']}
            })
            res.json({
                meta:{
                    state:'sucess',
                    count: user.length
                },
                user
            })

        } catch (error) {
            res.status(500).json({
                meta: {
                    status: 'error',
                },
                error: 'User not found',
            })
        }
    }
};
