module.exports = (req, res, next) => {
    res.locals.userLog = false;
    console.log("SESSION", req.session.user)
    if (!req.session.user) {
        return next();
    }

    res.locals.userLog = req.session.user;

   
    return next();
};