const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');
const moment = require('moment');
const { User } = require('../database/models');

module.exports = {
    index (req, res) {
        res.render('users/index');
    },

    register (req,res) {
        res.render('users/register');
    },

    async createUser (req, res) {
        const errors = validationResult(req);

        if(!errors.isEmpty()){
            return res.render('users/register', {
                errors: errors.mapped(),
                old: req.body
            });
        }
        let { firstName, lastName, email, password, year, month, day, managerFirstName, managerLastName, businessName, phoneNumber } = req.body;
        
        password = bcrypt.hashSync(req.body.password, 10);

        await User.create({
            first_name: firstName,
            last_name: lastName,
            email: email,
            password: password,
            birthday: moment(year + '-' + month + '-' + day ).format('l'),
            
            // BUSINESS DATA

            // company: businessName,
            // phone_number: phoneNumber,

        });

        res.redirect('/users/login');
    },

    requireLogin (req, res) {
        res.render('users/requireLogin');
    },

    async processLogin (req, res) {
        const errors = validationResult(req);
        let { email } = req.body;

        if(!errors.isEmpty()){
            return res.render('users/requireLogin', {
                errors: errors.mapped(),
                email: email
            });
        }

        const userFound = await User.findOne({
            where: {
                email: email
            }
        });

        req.session.user = userFound;
      
        if (req.body.remember){
            res.cookie('user', userFound.id, {maxAge: 1000 * 60 * 60 * 24 * 365})
        } 
    
        return res.redirect ('/');
    },

    async edit (req, res) {
        const id = req.params.id;
        const user = await User.findByPk(id)
        const birthday = moment(user.birthday);
        
        res.render('users/edit', { 
            user,
            birthday
        });
    },

    async update (req, res) {

        let { firstName, lastName, email, password, year, month, day, managerFirstName, managerLastName, businessName, phoneNumber } = req.body;

        password = bcrypt.hashSync(password, 10);

        await db.User.update(
            {
                first_name: firstName,
                last_name: lastName,
                email: email,
                password: password,
                birthday: moment(year + '-' + month + '-' + day).format('L')

                // BUSINESS DATA

                // manager_first_name: managerFirstName,
                // manager_last_name: managerLastName,
                // company: businessName,
                // phone_number: phoneNumber,
            },
            {
                where: { id: req.params.id}
            }
        );

        res.redirect('/users/profile')
    },

    logout (req, res) {
        req.session.destroy(()=> {
            req.session = null
            res.cookie('user', null, {maxAge: -1})
            return res.redirect('/')
        })
    },
    
};
