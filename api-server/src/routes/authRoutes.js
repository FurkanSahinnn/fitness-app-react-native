import express from 'express';
import { login, register } from '../controllers/authController.js';
import { validateAuth, validateUser } from '../middlewares/inputValidator.js';
const router = express.Router();

router.post('/login', validateAuth, login);
router.post('/register', validateAuth, register);

export default router; 