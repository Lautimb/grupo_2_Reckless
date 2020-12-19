module.exports = (req, res, next) => {

    if(!res.locals.userLog.admin){
       return res.redirect('/')
    }

    next();
}