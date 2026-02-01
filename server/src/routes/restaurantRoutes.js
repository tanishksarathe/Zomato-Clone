import express from 'express'
import { protect } from '../middlewares/authMiddleware.js';
import { updateRestaurant, updateRestaurantImage } from '../controllers/restaurantController.js';

const router = express.Router();

router.put("/update", protect, updateRestaurant);
router.patch("/update-photo", protect, updateRestaurantImage);

export default router;