const { User } = require('../../database/models');

module.exports = {
    async index (req, res) {
        const user = await User.findAll({
            attributes: ['email']
        });

        res.json(user)
    }
    
};
