import { Router } from 'express';
import {
  createChat,
  fetchUserChats,
  findChat,
} from '../controllers/chatController.js';
import verifyToken from '../middlewares/authChecking.js';

const router = Router();

// CREATE CHAT
router.post('/', verifyToken, createChat);

// FETCH USER'S CHATS
router.get('/:userId', verifyToken, fetchUserChats);

// FIND CHATS
router.get('/:firstId/:secondId', verifyToken, findChat);

export default router;
