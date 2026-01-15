import express from "express";
import {
  userLogin,
  userLogout,
  userRegistration,
} from "../controllers/authController.js";

const route = express.Router();

route.post("/register", userRegistration);
route.get("/logout", userLogout);
route.post("/login", userLogin);

export default route;
