import { Router } from 'express';
import { getUser, getUsers } from '../controllers/userController.js';
import verifyToken from '../middlewares/authChecking.js';

// router instance
const router = Router();

// ############# FIND USERS ################
router.get('/', verifyToken, getUsers);

// ############ FIND USER ###################
router.get('/:id', verifyToken, getUser);

export default router;
