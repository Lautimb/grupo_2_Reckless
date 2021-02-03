const db = require('../database/models')
module.exports =  (req, res, next)=> {
    
    if (!req.session.user && req.cookies.user){
        db.User.findByPk(req.cookies.user).then((user)=> {
            req.session.user = user
            return next()
        })
    }else{
        return next()
    }
}