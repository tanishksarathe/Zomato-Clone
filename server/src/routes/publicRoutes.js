import express from 'express';
import { cartItemsList, contactUsController, getAllRestaurants, getFilteredMenu, getSoloRestaurant } from '../controllers/publicController.js';

const router = express.Router();

router.post("/contactus", contactUsController);
router.get("/all-restaurants", getAllRestaurants)
router.get("/restaurant-solo/:id", getSoloRestaurant)
router.get("/get-filtered", getFilteredMenu)

router.get('/cart-items/:list', cartItemsList);

export default router;