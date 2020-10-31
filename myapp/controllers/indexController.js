const indexController = {
    index: (req,res) =>{
        res.render('index');
    },
    contact: (req,res) =>{
        res.render('contact');
    },
    lookbook: (req,res) =>{
        res.render('lookbook');
    },
    social: (req,res) =>{
        res.render('social');
    }
    
}

module.exports = indexController;