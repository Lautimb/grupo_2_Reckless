const {body} = require('express-validator');
const dataBaseHelper = require('../helpers/data-base-helper');
const path = require('path');
const bcrypt = require('bcryptjs');
const moment = require('moment');

module.exports = {
    register: [

        body('email')
            .notEmpty()
                .withMessage('Please fill the email')
                .bail()
            .isEmail()
                .withMessage('Please select a vaild e-mail address')
                .bail()
            .custom((value, {req})=>{
                const users = dataBaseHelper.getAllDataBase('users-data.json');
                const userFound = users.find(user => user.email == value);

                return !userFound;
            })
                .withMessage('The selected email is already in use'),

        body('password')
            .notEmpty()
                .withMessage('Please fill the password')
                .bail()
            .isLength({min: 6})
                .withMessage('The password must have at least 6 characters')
                .bail()
            .custom((value, {req})=>{
                if(req.body.retype){
                    return value == req.body.retype
                }
                return true
            })
                .withMessage('These passwords are not the same'),

        body('retype')
            .notEmpty()
                .withMessage('Please retype your password')
                .bail(),

        body('birthday')
            .custom((value, {req}) => {
                const month = req.body.month
                const day = req.body.day
                const year = req.body.year
                const date = moment(year + '-' + month + '-' + day);
                console.log(date);
                return date.isValid();
                
            })
                .withMessage('Select a valid date')
    ],
    login: [
        body('email')
            .notEmpty()
                .withMessage('Please fill the email')
                .bail()
            .isEmail()
                .withMessage('Please select a vaild e-mail address')
                .bail()
            .custom((value, {req})=>{
                const users = dataBaseHelper.getAllDataBase('users-data.json');
                const userFound = users.find(user => user.email == value);
                return bcrypt.compareSync(req.body.password, userFound.password);
            })
                .withMessage('Wrong e-mail or password')
    ],
    products: [
        body('images')
            .notEmpty()
                .withMessage('Please, select at least one product images')
                .bail()
            .custom((value, {req})=>{

                if(req.files){

                    const ext = path.extname(req.files.originalname)
                    const acceptedExt = ['.jpg','.png','.jpeg','.webp']
                    return acceptedExt.includes(ext)

                    }
                    return false;
                 })
                .withMessage('Please select a valid image format')
    ]
}