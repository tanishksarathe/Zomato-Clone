import express from 'express';
import { userChangePhoto, userUpdate } from '../controllers/userController.js';
import { protect } from '../middlewares/authMiddleware.js';
import multer from 'multer';


const router = express.Router();

const upload = multer();

router.put("/update", protect, userUpdate);
router.patch("/photo-update", protect, upload.single("image"),userChangePhoto);

export default router;

