module.exports = (req, res, next) => {
    const userLog = res.locals.userLog
   
    if(userLog.user_type_id == 1 || userLog.user_type_id == 2){
        return next()
    }
    return res.redirect('/')
}