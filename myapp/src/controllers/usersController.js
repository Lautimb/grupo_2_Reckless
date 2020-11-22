const usersHelper = require('../helpers/users-helper');
const bcrypt = require('bcryptjs');
const { generateId } = require('../helpers/users-helper');


const usersController = {
    index: (req, res) =>{
        res.render('users/index')
    },
    register: (req,res)=>{
        res.render('users/register')
    },
    createUser: (req, res) =>{
        const passwordHashed = bcrypt.hashSync(req.body.password, 10); 
        const newUser = {
            id: usersHelper.generateId(),
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            personalId: req.body.personalId,
            email: req.body.email,
            password: passwordHashed,
            birthday: [req.body.month, req.body.day, req.body.year],
            address: req.body.address,
            city: req.body.city,
            country: req.body.country,
            postalZipCode: req.body.postalZipCode,
            phone: req.body.phone
        }
        const allUsers = usersHelper.getAllUsers();
        console.log(allUsers);
        const usersToSave = [...allUsers, newUser]
        usersHelper.writeUserData(usersToSave);

        res.redirect('/users/register')
    },

    createBusinessUser: (req, res) => {
        const passwordHashed = bcrypt.hashSync(req.body.businessAccountPassword, 10); 
        const newBusinessUser = {
            id: usersHelper.generateBusinessId(),
            businessName: req.body.businessName,
            managerName: req.body.managerName,
            managerLastName: req.body.managerLastName,
            managerPhone: req.body.managerPhone,
            website: req.body.website,
            businessId: req.body.businessId,
            businessEmail: req.body.businessEmail,
            businessAccountPassword: passwordHashed,
            tradingSince: [req.body.month, req.body.day, req.body.year],
            businessAddress: req.body.businessAddress,
            businessCity: req.body.businessCity,
            businessCountry: req.body.businessCountry,
            businessPostalZipCode: req.body.businessPostalZipCode,
            businessPhone: req.body.businessPhone
        }
        const allBusinessUsers = usersHelper.getAllBusinessUsers();
        const businessUsersToSave = [...allBusinessUsers, newBusinessUser]
        usersHelper.writeBusinessUserData(businessUsersToSave);

        res.redirect('/users/register');
    }

    

    
}

module.exports = usersController;
