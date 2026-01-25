import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import { genToken } from "../utils/authToken.js";

export const userRegistration = async (req, res, next) => {
  try {
    const { fullname, email, phone, password, role } = req.body;

    if (!fullname || !email || !phone || !password || !role) {
      const error = new Error("All Fields Required");
      error.statusCode = 400;
      return next(error);
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      const error = new Error("Email Already Registered");
      error.statusCode = 409;
      return next(error);
    }

    //encrypting the password

    const salt = await bcrypt.genSalt(10);

    const hashedpassword = await bcrypt.hash(password, salt);

    const photoUrl = `https://placehold.co/600x400?text=${fullname.charAt(0).toUpperCase()}`
    const photo ={
      url:photoUrl
    }
    const newUser = await User.create({
      fullname,
      email,
      phone,
      password: hashedpassword,
      role,
      photo
    });

    console.log(newUser);

    res.status(201).json({ message: "User Registered Successfully" });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const userLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      const error = new Error("All Fields Required");
      error.statusCode = 400;
      return next(error);
    }

    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      const error = new Error("Email Not Registered");
      error.statusCode = 402;
      return next(error);
    }

    const isVerified = await bcrypt.compare(password, existingUser.password);

    if (!isVerified) {
      const error = new Error("Password not matched");
      error.statusCode = 402;
      return next(error);
    }

    //token is generated here

    await genToken(existingUser, res);

    res
      .status(200)
      .json({ message: "User Login successful", data: existingUser });
  } catch (error) {
    next(error);
  }
};

export const userLogout = async (req, res, next) => {
  try {
    res.clearCookie('oreo');
    res.status(200).json({ message: "Logout Successful" });
  } catch (error) {
    next(error);
  }
};
