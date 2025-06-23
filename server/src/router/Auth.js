import express from 'express';
import { signupController, loginController } from '../controller/AuthController.js';
const router = express.Router();

router.post('/signup', signupController);
router.post('/signin', loginController);

export default router;
