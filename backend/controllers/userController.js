import { param } from 'express-validator';
import checkValidationResult from '../middlewares/checkValidationResult.js';
import User from '../models/userModel.js';
import ErrorResponse from '../utility/error.js';

// ################# GET ALL USERS ###################
export const getUsers = async (req, res, next) => {
  try {
    const users = await User.find().select('-password');
    if (!users) {
      return next(new ErrorResponse('No users', 404));
    }
    return res.status(200).json({ success: true, users });
  } catch (error) {
    return next(new ErrorResponse(error?.message, 500));
  }
};

// ################# GET ALL USER ###################
export const getUser = [
  param('id').notEmpty().trim().withMessage('userId is required!'),
  checkValidationResult,
  async (req, res, next) => {
    try {
      const { id } = req.params;

      const user = await User.findById(id).select('-password');
      if (!user) {
        return next(new ErrorResponse('No user', 404));
      }
      return res.status(200).json({ success: true, user });
    } catch (error) {
      return next(new ErrorResponse(error?.message, 500));
    }
  },
];
