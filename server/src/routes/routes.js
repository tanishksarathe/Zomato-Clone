import express from "express";
import {
  userLogin,
  userLogout,
  userRegistration,
  userGenOTP,
  userOTPVerification,
  updateForgotPassword
} from "../controllers/authController.js";
import { forgotPasswordProtect } from "../middlewares/authMiddleware.js";

const route = express.Router();

route.post("/register", userRegistration);
route.get("/logout", userLogout);
route.post("/login", userLogin);

route.post("/genOtp", userGenOTP);
route.post("/verifyOtp", userOTPVerification);
route.patch("/forgot-password", forgotPasswordProtect ,updateForgotPassword)

export default route;
