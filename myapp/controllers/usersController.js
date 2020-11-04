const usersController = {
    index: (req, res) =>{
        res.render('users/index')
    },
    register: (req,res)=>{
        res.render('users/register')
    }
    
}

module.exports = usersController;
