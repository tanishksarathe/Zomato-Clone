import User from "../models/userModel.js";

export const userUpdate = async (req, res, next) => {
  try {
    const { fullname, email, phone } = req.body; // from update wala form

    const currentUser = req.user;

    if (!fullname || !email || !phone) {
      const error = new Error("All Fields Required");
      error.statusCode = 400;
      return next(error);
    }

    console.log("Current User : ", currentUser); // old User data in JSON Format

    // it can be done via req.body data assigned directly to currentUser and save...

    // currentUser.fullname = fullname;
    // currentUser.email = email;
    // currentUser.phone = phone;

    // await currentUser.save();

    // res
    //   .status(200)
    //   .json({ message: "User Updated Successfully", data: currentUser });


    const updatedUser = await User.findByIdAndUpdate(
      { _id: currentUser._id },
      {
        fullname,
        email,
        phone,
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
