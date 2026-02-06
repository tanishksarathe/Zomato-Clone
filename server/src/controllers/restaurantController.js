import cloudinary from "../config/cloudinary.js";
import { Menu } from "../models/restaurantMenu.js";
import User from "../models/userModel.js";
import { uploadImagesToCloudinary } from "../utils/imageStoreService.js";

export const updateRestaurant = async (req, res, next) => {
  try {
    const {
      fullname,
      email,
      gender,
      phone,
      city,
      dob,
      role,
      state,
      address,
      documents,
      paymentDetails,
      pin,
      restaurantName,
      geolocation,
    } = req.body;

    const currentUser = req.user;

    if (
      !fullname ||
      !email ||
      !phone ||
      !role ||
      !city ||
      !state ||
      !dob ||
      !address ||
      !documents ||
      !paymentDetails ||
      !geolocation ||
      !restaurantName ||
      !pin ||
      !gender
    ) {
      const error = new Error("All Fields Required");
      error.statusCode = 400;
      return next(error);
    }

    const document = {
      uidai: documents.uidai,
      pan: documents.pan,
      fssai: documents.fssai,
      gst: documents.gst,
    };

    const payment = {
      upi: paymentDetails.upi.toLowerCase(),
      ifs_Code: paymentDetails.ifs_Code,
      account_number: paymentDetails.account_number,
    };

    const location = {
      lat: geolocation.lat,
      lon: geolocation.lon,
    };

    const updatedUser = await User.findByIdAndUpdate(
      { _id: currentUser._id },
      {
        fullname,
        email: email.toLowerCase(),
        phone,
        role,
        city,
        state,
        dob,
        restaurantName,
        gender,
        address,
        documents: document,
        paymentDetails: payment,
        pin,
        geolocation: location,
      },
      { new: true },
    );

    res
      .status(200)
      .json({ message: "User Updated Successfully", data: updatedUser });
  } catch (error) {
    next(error);
  }
};

export const updateRestaurantImage = async (req, res, next) => {
  try {
    const currentUser = req.user;
    console.log("Form_data se aaya file ke form m aaya", req.file);
    const dp = req.file;
    if (!dp) {
      const error = new Error("Profile Picture Required");
      error.statusCode = 400;
      return next(error);
    }

    // upload photo on cloudinary

    if (currentUser.photo.publicID) {
      await cloudinary.uploader.destroy(currentUser.photo.publicID);
    }

    // convert the image from req.file from buffer into base 64

    const b64 = Buffer.from(dp.buffer).toString("base64");

    const dataURI = `data:${dp.mimetype};base64,${b64}`;

    // console.log("Data URI = ", dataURI.slice(0, 100));

    const result = await cloudinary.uploader.upload(dataURI, {
      folder: "GrabMyMeal/Restaurant",
      width: 500,
      height: 500,
      crop: "fill",
    });

    console.log("Image Uploaded Successfully : ", result);

    currentUser.photo.url = result.secure_url;
    currentUser.photo.publicID = result.public_id;

    await currentUser.save();

    res.status(200).json({ message: "Photo Updated", data: currentUser });
  } catch (error) {
    next(error);
  }
};

export const restaurantMenuPost = async (req, res, next) => {
  try {
    const {
      dishName,
      cuisine,
      type,
      description,
      price,
      availability,
      preperationTime,
      servingSize,
    } = req.body;

    if (
      !dishName ||
      !cuisine ||
      !type ||
      !description ||
      !price ||
      !availability ||
      !preperationTime ||
      !servingSize
    ) {
      const error = new Error("All Fields Required");
      error.statusCode = 400;
      return next(error);
    }

    const currentUser = req.user;

    console.log("Files from multer", req.files);

    const images = await uploadImagesToCloudinary(req.files);

    const newItems = await Menu.create({
      restaurantID: currentUser._id,
      dishName,
      cuisine,
      type,
      description,
      price,
      availability,
      preperationTime,
      servingSize,
      image: images,
    });

    res.status(200).json({ message: "Item Added Succesfully" });
  } catch (error) {
    next(error);
  }
};

export const restrauntMenuGet = async (req, res, next) => {
  try {
    const currentUser = req.user;

    const menuTable = await Menu.find({ restaurantID: currentUser._id });

    res.status(200).json({ message: "Fetched Successfully", data: menuTable });
  } catch (error) {
    next(error);
  }
};

export const updateMenuItem = async (req, res, next) => {
  const { id } = req.params;

  console.log(id);

  const {
    dishName,
    cuisine,
    type,
    description,
    price,
    availability,
    preperationTime,
    servingSize,
  } = req.body;

  const updtaedItem = await Menu.findByIdAndUpdate(
    id,
    {
      dishName,
      cuisine,
      type,
      description,
      price,
      availability,
      preperationTime,
      servingSize,
    },
    { new: true },
  );

  res.status(200).json({ message: "Menu Items Updated Successfully" });
};
