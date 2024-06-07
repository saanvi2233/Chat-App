import express from 'express';
import userController from '../controllers/userController.js';  // Ensure the correct path

const router = express.Router();

router.post('/register', userController.register);
router.post('/login', userController.login);
router.post('/setAvatar/:id', userController.setAvatar);  // Ensure the correct method name
router.get('/allusers/:id',userController.getAllUsers)

export default router;
