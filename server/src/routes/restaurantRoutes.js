import express from 'express'
import { protect } from '../middlewares/authMiddleware.js';
import { updateRestaurant, updateRestaurantImage } from '../controllers/restaurantController.js';
import multer from 'multer';

const router = express.Router();

const uploads = multer();

router.put("/update", protect, updateRestaurant);
router.patch("/updateRestaurantImage", protect,uploads.single("image"), updateRestaurantImage);

export default router;