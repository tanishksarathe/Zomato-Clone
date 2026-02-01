import express from "express";
import {
  userLogin,
  userLogout,
  userRegistration,
  userGenOTP,
  userOTPVerification
} from "../controllers/authController.js";

const route = express.Router();

route.post("/register", userRegistration);
route.get("/logout", userLogout);
route.post("/login", userLogin);

route.post("/genOtp", userGenOTP);
route.post("/verifyOtp", userOTPVerification);

export default route;
