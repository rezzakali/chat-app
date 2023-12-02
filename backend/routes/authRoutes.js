import { Router } from 'express';
import {
  changePassword,
  changeProfile,
  signInController,
  signUpController,
} from '../controllers/authController.js';
import verifyToken from '../middlewares/authChecking.js';

// ################# router instance #################
const router = Router();

// ################### sign up route #######################
router.post('/signup', signUpController);

// ################### sign in route #######################
router.post('/signin', signInController);

// #################### change-password ####################
router.patch('/change-password', verifyToken, changePassword);

// #################### change profile picture #################
router.patch('/change-profile', verifyToken, changeProfile);

export default router;
