import express from "express";
import { managerProtect, protect } from "../middlewares/authMiddleware.js";
import {
  restaurantMenuPost,
  updateRestaurant,
  updateRestaurantImage,
  restrauntMenuGet,
} from "../controllers/restaurantController.js";
import multer from "multer";

const router = express.Router();

const uploads = multer();

router.put("/update", protect, updateRestaurant);
router.patch(
  "/updateRestaurantImage",
  protect,
  uploads.single("image"),
  updateRestaurantImage,
);

router
  .route("/restaurantMenu")
  .post(protect, managerProtect, uploads.array("menuImage"), restaurantMenuPost)
  .get(protect, restrauntMenuGet);

export default router;
