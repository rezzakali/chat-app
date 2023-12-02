import { Router } from 'express';
import {
  createMessage,
  deleteMessage,
  getMessages,
} from '../controllers/messageController.js';
import verifyToken from '../middlewares/authChecking.js';

// router instance
const router = Router();

// CREATE MESSAGE
router.post('/', verifyToken, createMessage);

// GET MESSAGES
router.get('/:chatId', verifyToken, getMessages);

// DELETE A MESSAGE
router.delete('/:messageId', verifyToken, deleteMessage);

export default router;
