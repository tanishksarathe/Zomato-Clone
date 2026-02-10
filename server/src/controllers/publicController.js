import Contact from "../models/contactusModel.js";
import User from "../models/userModel.js";
import Menu from "../models/restaurantMenu.js";

export const contactUsController = async (req, res, next) => {
  try {
    const { fullname, email, subject, message } = req.body;

    if (!fullname || !email || !subject || !message) {
      const error = new Error("All Fields Required");
      error.statusCode = 400;
      return next(error);
    }

    const newQuery = await Contact.create({
      fullname,
      email,
      subject,
      message,
    });

    res.status(200).json({
      message:
        "Thanks for Contacting us. We will contact you within 24 hours...",
    });

    console.log("New Query from Backend :", newQuery);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const getAllRestaurants = async (req, res, next) => {
  const restaurants = await User.find(
    { role: "manager", isActive: "active" },
    "-password",
  );

  if (!restaurants) {
    const error = new Error("Restaurants not Found");
    error.statusCode = 404;
    return next(error);
  }

  res
    .status(200)
    .json({ message: "Restaurants Fetched Successfully", data: restaurants });
};

export const getSoloRestaurant = async (req, res, next) => {
  try {
    const { id } = req.params;

    console.log("Id in getSoloRestaurat : ", id);

    const restaurant = await User.findById(id).populate("menu");

    console.log("Restaurant :", restaurant);

    res.status(200).json({ message: "Fetched Successfully", data: restaurant });
  } catch (error) {
    next(error);
  }
};
