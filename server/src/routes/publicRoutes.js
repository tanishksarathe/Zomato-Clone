import express from 'express';
import { contactUsController, getAllRestaurants } from '../controllers/publicController.js';

const router = express.Router();

router.post("/contactus", contactUsController);
router.get("/all-restaurants", getAllRestaurants)

export default router;