const { Type } = require('../database/models')
module.exports = (req,res,next) =>{
    res.locals.types = false;
    Type.findAll().then((types)=>{
        res.locals.types = types
        return next()

    });
    
};