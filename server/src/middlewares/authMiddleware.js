import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

export const protect = async (req, res, next) => {
  try {
    const biscuit = req.cookies.oreo;
    console.log("Token Recieved from cookies : ", biscuit);

    const tea = jwt.verify(biscuit, process.env.JWT_SECRET);

    console.log("Decoded value :", tea);

    if (!tea) {
      const error = new Error("Unauthorized User! Please login again...");
      error.statusCode = 401;
      return next(error);
    }

    const verifiedUser = await User.findById(tea.id);

    if (!verifiedUser) {
      const error = new Error("Unauthorized User! Please login again...");
      error.statusCode = 401;
      return next(error);
    }

    // to sent data to next that is controller;

    req.user = verifiedUser;

    next();
  } catch (error) {
    next(error);
  }
};

export const managerProtect = async (req, res, next) => {
  try {
    if (req.user.role !== "manager") {
      const error = new Error("Unauthorized!!!");
      error.statusCode = 401;
      return next(error);
    }

    next();
  } catch (error) {
    next(error);
  }
};

export const adminProtect = async (req, res, next) => {
  try {
    if (req.user.role !== "admin") {
      const error = new Error("Unauthorized!!!");
      error.statusCode = 401;
      return next(error);
    }

    next();
  } catch (error) {
    next(error);
  }
};

export const partnerProtect = async (req, res, next) => {
  try {
    if (req.user.role !== "partner") {
      const error = new Error("Unauthorized!!!");
      error.statusCode = 401;
      return next(error);
    }

    next();
  } catch (error) {
    next(error);
  }
};

export const customerProtect = async (req, res, next) => {
  try {
    if (req.user.role !== "customer") {
      const error = new Error("Unauthorized!!!");
      error.statusCode = 401;
      return next(error);
    }

    next();
  } catch (error) {
    next(error);
  }
};

export const forgotPasswordProtect = async (req, res, next) => {
  try {
    const biscuit = req.cookies.otpToken;
    console.log("Token Recieved from cookies : ", biscuit);

    const tea = jwt.verify(biscuit, process.env.JWT_SECRET);

    console.log("Decoded value :", tea);

    if (!tea) {
      const error = new Error("Unauthorized! Please try again...");
      error.statusCode = 401;
      return next(error);
    }

    const verifiedUser = await User.findById(tea.id);

    if (!verifiedUser) {
      const error = new Error("Unauthorized! Please try again...");
      error.statusCode = 401;
      return next(error);
    }

    // to sent data to next that is controller;

    req.user = verifiedUser;

    next();
  } catch (error) {
    next(error);
  }
};
