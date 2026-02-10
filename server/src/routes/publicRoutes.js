import express from 'express';
import { contactUsController, getAllRestaurants, getSoloRestaurant } from '../controllers/publicController.js';

const router = express.Router();

router.post("/contactus", contactUsController);
router.get("/all-restaurants", getAllRestaurants)
router.get("/restaurant-solo/:id", getSoloRestaurant)

export default router;