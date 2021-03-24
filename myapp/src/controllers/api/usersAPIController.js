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
    },
    async addWishlist (req,res){
        try{
            // tengo que recibir el id del producto para crear la relacion en la base de datos
            const idUser = req.session.user.id
            const productId = req.params.id
            const user = await User.findByPk(idUser,{

            })
           
            await user.setProducts([idUser,productId])
            
            res.json({
                meta: {
                    state:'sucess',
                }
            })
            
            // const users = await User.findByPk()
            
        } catch (error){
            res.status(500).json({
                meta: {
                    status: 'error',
                },
                error: 'Error, the product cannot be added',
            })
        }
    },
    async removeWishlist (req,res) {
        try{
            console.log('remove ejecutado')

            await user.setProducts([])

             
        }   catch (error){
            res.status(500).json({
                meta: {
                    status: 'error',
                },
                error: 'Error, the product cant be delete' //cachate este ingles xD
            })
        }
    }
};
