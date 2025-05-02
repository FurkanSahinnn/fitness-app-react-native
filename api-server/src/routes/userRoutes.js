import express from 'express';
import { createUser, getAllUsers, getUserById, updateUser, deleteUser } from '../controllers/userController.js';
import { validateUser } from '../middlewares/inputValidator.js';
import { authenticate } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post("/user", authenticate, validateUser, createUser);
router.get("/user", authenticate, getAllUsers);
router.get("/user/:id", authenticate, getUserById);
router.put("/user/:id", authenticate, validateUser, updateUser);
router.delete("/user/:id", authenticate, deleteUser);

export default router;