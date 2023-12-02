import { body, param } from 'express-validator';
import checkValidationResult from '../middlewares/checkValidationResult.js';
import Message from '../models/messageModel.js';
import ErrorResponse from '../utility/error.js';

// ############ CREATE MESSAGE ##################
export const createMessage = [
  body('chatId').notEmpty().trim().withMessage('chatId is required!'),
  body('senderId').notEmpty().trim().withMessage('senderId is required!'),
  body('text').notEmpty().trim().withMessage('text is required!'),
  checkValidationResult,
  async (req, res, next) => {
    try {
      const { chatId, senderId, text } = req.body;
      const newMessage = new Message({
        chatId,
        senderId,
        text,
      });
      const response = await newMessage.save();
      return res.status(201).json(response);
    } catch (error) {
      return next(new ErrorResponse(error?.message, 500));
    }
  },
];

// ################ GET MESSAGES ####################
export const getMessages = [
  param('chatId').notEmpty().trim().withMessage('chatId is required!'),
  checkValidationResult,
  async (req, res, next) => {
    try {
      const { chatId } = req.params;

      const messages = await Message.find({ chatId });

      return res.status(200).json(messages);
    } catch (error) {
      return next(new ErrorResponse(error?.message, 500));
    }
  },
];

// ################# DELETE A MESSAGE ################
export const deleteMessage = [
  param('messageId').notEmpty().trim().withMessage('messageId is required!'),
  checkValidationResult,
  async (req, res, next) => {
    try {
      const { messageId } = req.params;
      const message = await Message.findOneAndDelete({ _id: messageId });

      if (!message) {
        return next(new ErrorResponse(`Message doesn't exist!`, 400));
      }
      const remainingMessages = await Message.find({});

      return res.status(200).json(remainingMessages);
    } catch (error) {
      return next(new ErrorResponse(error?.message, 500));
    }
  },
];
