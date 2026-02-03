import express from "express";
import {
  userChangePhoto,
  userResetPassword,
  userUpdate,
} from "../controllers/userController.js";
import { protect } from "../middlewares/authMiddleware.js";
import multer from "multer";

const router = express.Router();

const upload = multer();

router.put("/update", protect, userUpdate);
router.patch("/photo-update", protect, upload.single("image"), userChangePhoto);
router.patch("/reset-password", protect, userResetPassword);

export default router;
