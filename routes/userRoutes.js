import express from 'express';
import { registerUser, loginUser, getProfile } from '../controllers/userController.js';
import { verifyToken } from '../middleware/auth.js';
const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/profile', verifyToken, getProfile);

export default router;














// import express from 'express';
// import { registerUser, loginUser, getProfile } from '../controllers/userController.js';
// import { verifyToken } from '../middleware/auth.js';
// const router = express.Router();

// router.post('/register', registerUser);
// router.post('/login', loginUser);
// router.get('/profile', verifyToken, getProfile);

// export default router;