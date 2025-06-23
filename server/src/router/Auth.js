import express from 'express';
import { signupController, loginController, logoutController } from '../controller/AuthController.js';
import {authenticateToken, authorizeRoles } from '../middleware/Auth.js';
const router = express.Router();

router.post('/signup', signupController);
router.post('/signin', loginController);
router.get('/signout', logoutController);

router.get("/testp", authenticateToken, authorizeRoles("PLANNER"), (req, res) => {
  res.json("hello Planner from protected route");
});

router.get("/testc", authenticateToken, authorizeRoles("CLIENT"), (req, res) => {
  res.json("hello from protected route");
});

export default router;
