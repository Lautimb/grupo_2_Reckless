const helpers = require('../helpers/data-base-helper');
const db = require('../database/models')

module.exports = async function(req, res, next){
    if (!req.session.user && req.cookies.user){
        const allUser = await db.User.findAll()
        const userFound = allUser.find( user => user.id == req.cookies.user )
        req.session.user = userFound;
    }
    return next()
}