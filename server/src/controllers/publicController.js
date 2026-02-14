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

export const getFilteredMenu = async (req, res, next) => {
  try {
    const { id, pivotc, pivott, priran, naam } = req.query;

    const query = {
      restaurantID: id,
    };

    // if naam is there

    if (naam && naam !== undefined) {
      query.dishName = naam;
    }

    // if cuisine is there

    if (pivotc && pivotc !== null && pivotc !== undefined) {
      query.cuisine = pivotc;
    }

    // if price range is there

    if (priran && !isNaN(priran)) {
      query.price = { $lte: Number(priran) };
    }

    // if type is there

    if (pivott && pivott !== null && pivott !== undefined) {
      query.type = pivott;
    }

    const restaurant = await Menu.find(query);

    console.log("Restaurant :", restaurant);

    res.status(200).json({ message: "Fetched Successfully", data: restaurant });
  } catch (error) {
    next(error);
  }
};

export const cartItemsList = async (req, res, next) => {
  try {
    const { list } = req.params;

    if (!list || list.length === 0) {
      res.status(404).json({ message: "Items not found" });
      return;
    }

    const idArray = list.split(",") // because params m string aaegi, array ki comma separated values ke saath...

    const cartItems = await Menu.find({ _id: { $in: idArray } });

    res.status(200).json({ message: "Cart Updates", data:cartItems });
  } catch (error) {
    next(error);
  }
};
