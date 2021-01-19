const db = require('../database/models')
module.exports = (req,res,next) =>{
    res.locals.types = false;
    db.Type.findAll().then((result)=>{
        res.locals.types = result
        return next()

    })
    
}   