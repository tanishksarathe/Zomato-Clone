import cloudinary from "../config/cloudinary.js";
import User from "../models/userModel.js";

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
      folder: "GrabMyMeal/User",
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
