import Contact from "../models/contactusModel.js";

export const contactUsController = async (req, res, next) => {
  try {
    const { fullname, email, subject, message } = req.body;

    if (!fullname || !email || !subject || !message) {
      const error = new Error("All Fields Required");
      error.statusCode = 400;
      return next(error);
    }

    const existingRequest = await Contact.findOne({ subject });

    if (existingRequest) {
      const error = new Error("Already Requested");
      error.statusCode = 409;
      return next(error);
    }

    const newQuery = Contact.create({
      fullname,
      email,
      subject,
      message,
    });

    res.status(200).json({ message: "Your Query is sent..." });

    console.log("New Query from Backend :", newQuery);
    
  } catch (error) {
    console.log(error);
    next(error);
  }
};
