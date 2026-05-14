import express from 'express';
import { registerUser, loginUser, getProfile, createPost, deletePost, commentPost } from '../controllers/userController.js';
import { verifyToken } from '../middleware/auth.js';
const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/profile', verifyToken, getProfile);
router.post('/posts', verifyToken, createPost);
router.delete('/delete/:id', verifyToken, deletePost);
router.post('/posts/:id/comment', verifyToken, commentPost);

export default router;










