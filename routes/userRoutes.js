import express from 'express';
import { registerUser, loginUser, getProfile, createPost, deletePost } from '../controllers/userController.js';
import { verifyToken } from '../middleware/auth.js';
const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/profile', verifyToken, getProfile);
router.post('/posts', verifyToken, createPost);
router.delete('/delete/:id', verifyToken, deletePost);
export default router;














// import express from 'express';
// import { registerUser, loginUser, getProfile, createPost } from '../controllers/userController.js';
// import { verifyToken } from '../middleware/auth.js';
// const router = express.Router();

// router.post('/register', registerUser);
// router.post('/login', loginUser);
// router.get('/profile', verifyToken, getProfile);
// router.post('/posts', verifyToken, createPost);
// export default router;
