const dataBaseHelper = require('../helpers/data-base-helper');
const bcrypt = require('bcryptjs');
const {validationResult} = require('express-validator');
const moment = require('moment');

module.exports = {
    index: (req, res) =>{
        res.render('users/index');
    },
    register: (req,res)=>{
        res.render('users/register')
    },
    createUser: (req, res) =>{
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.render ('users/register', {
                errors: errors.mapped(),
                old: req.body
            })
        }
        const passwordHashed = bcrypt.hashSync(req.body.password, 10); 
        const newUser = {
            id: dataBaseHelper.generateId('users-data.json'),
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            personalId: req.body.personalId,
            email: req.body.email,
            password: passwordHashed,
            birthday: moment(req.body.year + '-' + req.body.month + '-' + req.body.day).format('L')
        }
        const allUsers = dataBaseHelper.getAllDataBase('users-data.json');
        const usersToSave = [...allUsers, newUser]
        dataBaseHelper.writeNewDataBase(usersToSave, 'users-data.json');

        res.redirect('/users/login')
    },

    createBusinessUser: (req, res) => {
        const passwordHashed = bcrypt.hashSync(req.body.businessAccountPassword, 10); 
        const newBUser = {
            id: dataBaseHelper.generateId('business-users-data.json'),
            businessName: req.body.businessName,
            managerName: req.body.managerName,
            managerLastName: req.body.managerLastName,
            managerPhone: req.body.managerPhone,
            website: req.body.website,
            businessId: req.body.businessId,
            businessEmail: req.body.businessEmail,
            businessAccountPassword: passwordHashed,
            tradingSince: moment(req.body.year + '-' + req.body.month + '-' + req.body.day).format('L'),
            businessAddress: req.body.businessAddress,
            businessCity: req.body.businessCity,
            businessCountry: req.body.businessCountry,
            businessPostalZipCode: req.body.businessPostalZipCode,
            businessPhone: req.body.businessPhone
        }
        const allBUsers = dataBaseHelper.getAllDataBase('business-users-data.json');
        const usersBToSave = [...allBUsers, newBUser]
        dataBaseHelper.writeNewDataBase(usersBToSave, 'business-users-data.json');

        res.redirect('/users/register');
    },

    requireLogin: (req, res) => {
        res.render('users/requireLogin');
    },

    processLogin: (req, res) => {
        const errors = validationResult(req);
       
        if(!errors.isEmpty()){
            return res.render('users/requireLogin', {
                errors: errors.mapped(),
                email: req.body.email
            })
        }
        const allUsers = dataBaseHelper.getAllDataBase('users-data.json');
        const userFound = allUsers.find(user => user.email == req.body.email)
        req.session.user = userFound;
        
        if (req.body.remember){
            res.cookie('user', userFound.id, {maxAge: 1000 * 60 * 60 * 24 * 365})
        } 
    
        return res.redirect ('/');
    },
    logout: (req, res) => {
        req.session.destroy(()=> {
            req.session = null
            res.cookie('user', null, {maxAge: -1})
            return res.redirect('/')
        })
    }
    
};
