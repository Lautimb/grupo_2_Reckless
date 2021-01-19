const dataBaseHelper = require('../helpers/data-base-helper');
const bcrypt = require('bcryptjs');
const {validationResult} = require('express-validator');
const moment = require('moment');
const db = require('../database/models');

module.exports = {
    index: (req, res) =>{
        res.render('users/index');
    },
    register: (req,res)=>{
        res.render('users/register')
    },
    createUser: async (req, res) =>{
        // const errors = validationResult(req);

        // if (!errors.isEmpty()) {
        //     return res.render ('users/register', {
        //         errors: errors.mapped(),
        //         old: req.body
        //     })
        // }
        // const passwordHashed = bcrypt.hashSync(req.body.password, 10); 
        // const newUser = {
        //     id: dataBaseHelper.generateId('users-data.json'),
        //     firstName: req.body.firstName,
        //     lastName: req.body.lastName,
        //     personalId: req.body.personalId,
        //     email: req.body.email,
        //     password: passwordHashed,
        //     birthday: moment(req.body.year + '-' + req.body.month + '-' + req.body.day).format('L')
        // }
        // const allUsers = dataBaseHelper.getAllDataBase('users-data.json');
        // const usersToSave = [...allUsers, newUser]
        // dataBaseHelper.writeNewDataBase(usersToSave, 'users-data.json');
        const passwordHashed = bcrypt.hashSync(req.body.password, 10);
        
      
        await db.User.create({
            first_name: req.body.firstName,
            last_name: req.body.lastName,
            email: req.body.email,
            password: passwordHashed,
            birthday: moment(req.body.year + '-' + req.body.month + '-' + req.body.day).format('L')
            
            // BUSINESS DATA

            // manager_first_name: req.body.managerFirstName,
            // manager_last_name: req.body.managerLastName,
            // company: req.body.businessName,
            // phone_number: req.body.phoneNumber,

        })

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

    processLogin: async (req, res) => {
        const errors = validationResult(req);
        const users = await db.User.findAll()

        if(!errors.isEmpty()){
            return res.render('users/requireLogin', {
                errors: errors.mapped(),
                email: req.body.email
            })
        }

        const userFound = users.find( user => user.email == req.body.email)
        req.session.user = userFound
      
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
    },
    edit: async (req, res) => {
        const id = req.params.id;
        const user = await db.User.findByPk(id)
        const birthday = moment(user.birthday);
        
        res.render('users/edit', { 
            user,
            birthday
        });
    },
    update: async (req, res) => {
        const passwordHashed = bcrypt.hashSync(req.body.password, 10);

        await db.User.update(
            {
                first_name: req.body.firstName,
                last_name: req.body.lastName,
                email: req.body.email,
                password: passwordHashed,
                birthday: moment(req.body.year + '-' + req.body.month + '-' + req.body.day).format('L')
            },
            {
                where: { id: req.params.id}
            }
        );

        res.redirect('/users/profile')
    }
    
};
