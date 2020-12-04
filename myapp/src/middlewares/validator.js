const {body} = require('express-validator');
const dataBaseHelper = require('../helpers/data-base-helper');
const path = require('path');
const bcrypt = require('bcryptjs');
const moment = require('moment');

module.exports = {
    register: [
        body('email')
            .notEmpty()
                .withMessage('Please fill the email field')
                .bail()
            .isEmail()
                .withMessage('Please select a vaild email address')
                .bail()
            .custom((value, {req})=>{
                const users = dataBaseHelper.getAllDataBase('users-data.json');
                const usersFound = users.find(user => user.email == value);

                if(usersFound){
                    return false
                }else{
                    return true
                }
            })
                .withMessage('The selected email is already in use'),
        body('password')
            .notEmpty()
                .withMessage('Please fill the password field')
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
                .withMessage('Please fill the confirm password field')
                .bail()
            .custom((value, {req}) => {
            }),
        body('month')
            .notEmpty()
                .withMessage('Please fill the month field')
            .custom((value, {req}) => {
                const month = req.body.month
                const day = req.body.day
                const year = req.body.year
                // if (month == 01 || 03 || 05 || 07 || 08 || 10 || 12 && day <= 31){
                //     return true
                // }else if (month == 04 || 06 || 09 || 11 && day <= 30){
                //     return true
                // }else if (month == 02 && day <= 28){
                //     return true
                // }else if(year%4 == 0 && day == 29 && month == 02){
                //     return true
                // }else{
                //     return false
                // }

                const date = moment(year + '-' + month + '-' + day);
                console.log(date);
                return date.isValid();
                
            })
                .withMessage('Select a valid date')
    ]
}