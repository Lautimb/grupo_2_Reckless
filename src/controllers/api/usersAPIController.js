const { User } = require('../../database/models');
module.exports = {
    async list (req, res) {
        try{
            const users = await User.findAll()
            
            users.forEach( user => {
                return user.setDataValue('detail',`http://localhost:3300/api/users/${user.id}`)
            })
            
            res.json({
                meta:{
                    state:'success',
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
                    state:'success',
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
            const idUser = req.session.user.id
            const idProduct = parseInt(req.body.productId)
            const user = await User.findByPk(idUser)
            await user.addProducts(idProduct)
            
            res.json({
                meta: {
                    state:'success'
                }              
            })
                        
        } catch (error){
            res.status(500).json({
                meta: {
                    status: 'error',
                },
                error: 'Error, the product cannot be added',
            })
        }
    },
    async removeWishlist (req,res){
        try{            
            const idUser = req.session.user.id
            const idProduct = parseInt(req.body.productId)
            const user = await User.findByPk(idUser)
            await user.removeProducts(idProduct)
            

            res.json({
                meta: {
                    state:'remove success'
                }
            })
            
            
        } catch (error){
            res.status(500).json({
                meta: {
                    status: 'error',
                },
                error: 'Error, the product cannot be deleted',
            })
        }
    },
    async log (req,res){
        try{            
            const userLog = req.session.user ? true : false
           
            res.json({
                meta: {
                    state:'response success'
                },
                userLog   
            })
            
        } catch (error){
            res.status(500).json({
                meta: {
                    status: 'error',
                },
                error: 'Error, the product cannot be deleted',
            })
        }
    }

};
