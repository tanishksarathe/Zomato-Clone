import express from "express";
import {
  userLogin,
  userLogout,
  userRegistration,
} from "../controllers/authController.js";
import { contactUsController } from "../controllers/functionalityController.js";

const route = express.Router();

route.post("/register", userRegistration);
route.get("/logout", userLogout);
route.post("/login", userLogin);
route.post("/contactus", contactUsController)

export default route;
