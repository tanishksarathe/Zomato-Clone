import User from "../models/userModel.js";
import bcrypt, { genSalt } from "bcrypt";
import { genOTPToken, genToken } from "../utils/authToken.js";
import { sendForgotPasswordOTPService } from "../utils/sendEmailService.js";
import OTP from "../models/otpModel.js";

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

    const photoUrl = `https://placehold.co/600x400?text=${fullname.charAt(0).toUpperCase()}`;
    const photo = {
      url: photoUrl,
    };
    const newUser = await User.create({
      fullname,
      email,
      phone,
      password: hashedpassword,
      role,
      photo,
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
    res.status(200).clearCookie("oreo").json({ message: "Logout Successful" });
  } catch (error) {
    next(error);
  }
};


export const userGenOTP = async (req, res, next) => {
  try {
    const { email } = req.body;

    if (!email) {
      const error = new Error("Email Required");
      error.statusCode = 400;
      return next(error);
    }

    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      const error = new Error("Email Not Registered");
      error.statusCode = 402;
      return next(error);
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    const salt = await bcrypt.genSalt(10);

    const hashedOTP = await bcrypt.hash(otp, salt);

    await OTP.create({
      otp: hashedOTP,
      email,
    });

    sendForgotPasswordOTPService(email, otp);

    res.status(200).json({ message: "Otp sent on registered email" });
  } catch (error) {
    next(error);
  }
};


export const userOTPVerification = async (req, res, next) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      const error = new Error("OTP Required...");
      error.statusCode = 400;
      return next(error);
    }

    // compare the latest otp only logic left
    const usermon = await OTP.findOne({ email }).sort({ createdAt: -1 });

    console.log("Usermon", usermon);
    if (!usermon) {
      const error = new Error("Email Not Registered");
      error.statusCode = 402;
      return next(error);
    }

    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      const error = new Error("Email Not Registered");
      error.statusCode = 402;
      return next(error);
    }
    
    // if expired than also out
    
    if(Date.now() - new Date(usermon.createdAt).getTime() > 2 * 60 * 1000){
      const error = new Error("OTP Expired");
      error.statusCode = 401;
      return next(error);
    }

    const verifyOTP = await bcrypt.compare(otp, usermon.otp);

    if (!verifyOTP) {
      const error = new Error("OTP Invalid");
      error.statusCode = 401;
      return next(error);
    }
    
    
    await genOTPToken(existingUser, res);

    res.status(200).json({ message: "OTP verified" });
  } catch (error) {
    next(error);
  }
};


export const updateForgotPassword = async (req, res, next) => {
  try {
    const { email, newPassword } = req.body;

    if (!email || !newPassword) {
      const error = new Error("All Fields Required");
      error.statusCode = 400;
      return next(error);
    }

    const currentUser = req.user;

    const salt = await bcrypt.genSalt(10);

    const hashedpasswordNew = await bcrypt.hash(newPassword, salt);

    currentUser.password = hashedpasswordNew;

    await currentUser.save();

    res.status(200).clearCookie("otpToken").json({ message: "Password Updated"});

  } catch (error) {
    next(error);
  }
};
