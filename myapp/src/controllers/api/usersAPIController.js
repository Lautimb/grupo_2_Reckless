const { User } = require('../../database/models');


module.exports = {
    async list (req, res) {
        try{
            const users = await User.findAll({
                attributes: ['email', 'last_name','first_name']
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
