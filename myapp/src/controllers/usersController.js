const dataBaseHelper = require('../helpers/data-base-helper');
const bcrypt = require('bcryptjs');

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
            id: dataBaseHelper.generateId('users-data-copy.json'),
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
        const allUsers = dataBaseHelper.getAllDataBase('users-data-copy.json');
        const usersToSave = [...allUsers, newUser]
        dataBaseHelper.writeNewDataBase(usersToSave, 'users-data-copy.json');

        res.redirect('/users/register')
    },

    createBusinessUser: (req, res) => {
        const passwordHashed = bcrypt.hashSync(req.body.businessAccountPassword, 10); 
        const newBUser = {
            id: dataBaseHelper.generateId('business-users-data-copy.json'),
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
        const allBUsers = dataBaseHelper.getAllDataBase('business-users-data-copy.json');
        const usersBToSave = [...allBUsers, newBUser]
        dataBaseHelper.writeNewDataBase(usersBToSave, 'business-users-data-copy.json');

        res.redirect('/users/register');
    }

    

    
}

module.exports = usersController;
