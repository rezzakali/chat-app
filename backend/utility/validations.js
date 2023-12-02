import { body } from 'express-validator';

// ################### VALIDATE SIGN UP #########################
export const validateSignup = [
  body('name')
    .notEmpty()
    .withMessage('Name is required!')
    .trim()
    .isLength({ min: 3 })
    .escape(),
  body('email')
    .notEmpty()
    .withMessage('Email is required!')
    .trim()
    .isEmail()
    .withMessage('Invalid email address!')
    .escape(),
  body('password')
    .notEmpty()
    .withMessage('Password is required!')
    .trim()
    .isLength({ min: 8 })
    .withMessage('Password must be grater than 8 characters')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])/)
    .withMessage(
      'Password must contain both uppercase and lowercase characters'
    )
    .escape(),
];

// ################## VALIDATE SIGNIN #####################
export const validateSignin = [
  body('email')
    .notEmpty()
    .withMessage('Email is required!')
    .trim()
    .isEmail()
    .withMessage('Invalid email address!')
    .escape(),
  body('password')
    .notEmpty()
    .withMessage('Password is required!')
    .trim()
    .isLength({ min: 8 })
    .withMessage('Password must be grater than 8 characters')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])/)
    .withMessage(
      'Password must contain both uppercase and lowercase characters'
    )
    .escape(),
];

// ################# PASSWORD CHANGE VALIDATE #################
export const validatePasswordChange = [
  body('email')
    .notEmpty()
    .withMessage('Email is required!')
    .trim()
    .isEmail()
    .withMessage('Invalid email address!')
    .escape(),
  body('oldPassword')
    .notEmpty()
    .withMessage('oldPassword is required!')
    .trim()
    .isLength({ min: 8 })
    .withMessage('oldPassword must be grater than 8 characters')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])/)
    .withMessage(
      'oldPassword must contain both uppercase and lowercase characters'
    )
    .escape(),
  body('newPassword')
    .notEmpty()
    .withMessage('newPassword is required!')
    .trim()
    .isLength({ min: 8 })
    .withMessage('newPassword must be grater than 8 characters')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])/)
    .withMessage(
      'newPassword must contain both uppercase and lowercase characters'
    )
    .escape(),
];

// ################# CHANGE PROFILE PICTURE VALIDATE EMAIL #############
export const validateEmail = [
  body('email')
    .notEmpty()
    .withMessage('Email is required!')
    .trim()
    .isEmail()
    .withMessage('Invalid email address!')
    .escape(),
];
