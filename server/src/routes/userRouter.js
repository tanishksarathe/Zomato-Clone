import express from 'express';
import { userUpdate } from '../controllers/userController.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.put("/update", protect, userUpdate);

export default router;

