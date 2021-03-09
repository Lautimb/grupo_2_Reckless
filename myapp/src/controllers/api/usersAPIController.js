const { User } = require('../../database/models');


module.exports = {
    async list (req, res) {
        try{
            const users = await User.findAll({
                attributes: ['id','first_name','last_name','email']
            })
            
            users.forEach( user => {
                return user.setDataValue('detail',`http://localhost:3300/api/users/${user.id}`)
            })

            // meta
            res.json({
                meta: {
                    status: 'success',
                    count: users.length
                },
                data: {
                    users,
                }
            })
        } catch(error) {
            res.status(500).json({
                meta: {
                    status: 'error',
                },
                error: 'User not found',
            })
        }
    }
};
