import { body, param } from 'express-validator';
import checkValidationResult from '../middlewares/checkValidationResult.js';
import Chat from '../models/chatModel.js';
import ErrorResponse from '../utility/error.js';

// CREATE CHART
export const createChat = [
  body('firstId').notEmpty().trim().withMessage('firstId is required!'),
  body('secondId').notEmpty().trim().withMessage('secondId is required!'),
  checkValidationResult,
  async (req, res, next) => {
    try {
      const { firstId, secondId } = req.body;

      const chats = await Chat.find({
        members: { $all: [firstId, secondId] },
      });

      if (chats.length !== 0) {
        return res.status(200).json(chats);
      }

      const newChat = new Chat({
        members: [firstId, secondId],
      });

      const response = await newChat.save();

      return res.status(201).json(response);
    } catch (error) {
      return next(new ErrorResponse(error?.message, 500));
    }
  },
];

// FETCH USER'S CHATS
export const fetchUserChats = [
  param('userId').notEmpty().trim().withMessage('userId is required!'),
  checkValidationResult,
  async (req, res, next) => {
    try {
      const { userId } = req.params;
      const chats = await Chat.find({
        members: { $in: [userId] },
      });
      if (!chats) {
        return res.status(404).json({
          success: true,
          message: 'No chats exists!',
        });
      }
      return res.status(200).json(chats);
    } catch (error) {
      return next(new ErrorResponse(error?.message, 500));
    }
  },
];

// FIND CHATS
export const findChat = [
  param('firstId').notEmpty().trim().withMessage('firstId is required!'),
  param('secondId').notEmpty().trim().withMessage('secondId is required!'),
  checkValidationResult,
  async (req, res, next) => {
    try {
      const { firstId, secondId } = req.params;
      const chat = await Chat.find({
        members: { $all: [firstId, secondId] },
      });
      return res.status(200).json(chat);
    } catch (error) {
      return next(new ErrorResponse(error?.message, 500));
    }
  },
];
