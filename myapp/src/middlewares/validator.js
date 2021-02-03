const { body } = require('express-validator');
const { User } = require('../database/models')

const path = require('path');
const bcrypt = require('bcryptjs');
const moment = require('moment');

module.exports = {
    register: [
        body('firstName')
            .notEmpty()
                .withMessage('Please fill the name')
                .bail()
            .custom((value)=> value.trim().length >= 2 )                
                .withMessage('The name must have at least 2 characters'),
        body('lastName')
            .notEmpty()
                .withMessage('Please fill the last name'),
        body('email')
            .notEmpty()
                .withMessage('Please fill the email')
                .bail()
            .isEmail()
                .withMessage('Please select a valid e-mail address')
                .bail()
            .custom((value) => {
                return User.findOne({
                    where: {
                        email: value
                    }
                })
                .then(user => {
                    if(user){
                        return Promise.reject('Email not available');
                    }
                });
            }),             
        body('password')
            .notEmpty()
                .withMessage('Please fill the password')
                .bail()
            .isLength({min: 8})
                .withMessage('The password must have at least 8 characters')
                .bail()
            .custom((value, {req})=>{
                let { retype } = req.body;
                if(retype){
                    return value == retype
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
                let { year, month, day } = req.body;
                const date = moment(year + '-' + month+ '-' + day);
               
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
                .withMessage('Please select a valid e-mail address')
                .bail()
            .custom((value, { req }) => {
                return User.findOne({
                    where: {
                        email: value
                    }
                })
                .then(user => {
                    const { password } = req.body;
                    if(!user || !bcrypt.compareSync(password, user.password)){
                        return Promise.reject('Wrong email or password');
                    }
                });
            })
                .bail(),
        body('password')
            .notEmpty()
                .withMessage('Please fill the password')
                .bail()
    ],

    products: [
        body('images')
            .custom((value ,{req})=>{
                if(req.method == 'PUT'){
                    return true
                }
                return req.files.length != 0
            })
                .withMessage('Please select a file')
                .bail()
        .custom((value, {req})=>{
            const acceptedExt = ['.jpg','.webp','.jpeg','.png','.gif']
            const files = req.files;  
            const fileWrong = files.find(file => {

                if(!acceptedExt.includes(path.extname(file.originalname))){
                    return file
                } 
            })
            return !fileWrong
        })  
                .withMessage('Invalid extension')
                .bail(),
        body('name')
            .notEmpty()
                .withMessage("Fill product's name")
            .isLength({min: 5})
                .withMessage("Product's name must have at least 5 characters")
            .bail(),
        body('description')
            .isLength({min: 20})
                .withMessage("Fill product's description")
                .bail(),
        body('price')
            .isFloat({min:1})
                .withMessage('Price must be greater than 0')
                .bail(),
        body('discount')
            .custom((value)=>{
                
                if(value == false || (value > 0 && value < 100)){
                    return true
                }
                return false;
            })
                .withMessage('Discount must be greater than 0 and less than 100')
                .bail(),
        body('wholesaleprice')
            .notEmpty()
                .withMessage("Please select product's wholesale price")
                .bail()
            .isFloat({min:1})
                .withMessage('Wholesale price must be greater than 0'),
        body("art")
            .notEmpty()
                .withMessage("Please fill product's article code"),
        body("size")
            .notEmpty()
                .withMessage("Please select a size"),
        body('type')
            .notEmpty()
                .withMessage("Please select product's type")
        
    ]
}

