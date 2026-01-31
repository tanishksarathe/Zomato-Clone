import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    fullname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phone: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["admin", "manager", "partner", "customer", "N/A"],
      default: "customer",
      required: true,
    },
    gender: {
      type: String,
      enum: ["male", "female", "others", "N/A"],
      required: true,
      default: "N/A",
    },
    city: {
      type: String,
      required: true,
      default: "N/A",
    },
    dob: {
      type: String,
      required: true,
      default: "N/A",
    },
    address: {
      type: String,
      required: true,
      default: "N/A",
    },
    state: {
      type: String,
      required: true,
      default: "N/A",
    },
    pin: {
      type: String,
      required: true,
      default: "N/A",
    },
    photo: {
      url: {
        type: String,
        default: "",
      },
      publicID: {
        type: String,
        default: "",
      },
    },
    geolocation: {
      lat: {
        type: String,
        required: true,
        default: "N/A",
      },
      lon: {
        type: String,
        required: true,
        default: "N/A",
      },
    },
    restaurantName: {
      type: String,
      required() {
        return this.role == "manager";
      },
      default() {
        return this.role == "manager" ? "N/A" : null;
      },
    },
    cuisine: {
      type: String,
      required() {
        return this.role == "manager";
      },
      default() {
        return this.role == "manager" ? "N/A" : null;
      },
    },
    paymentDetails: {
      upi: {
        type: String,
        required: true,
        default: "N/A",
      },
      ifs_Code: {
        type: String,
        required: true,
        default: "N/A",
      },
      account_number: {
        type: String,
        required: true,
        default: "N/A",
      },
    },
    documents: {
      gst: {
        type: String,
        required: true,
        default: "N/A",
      },
      fssai: {
        type: String,
        required: true,
        default: "N/A",
      },
      rc: {
        type: String,
        required: true,
        default: "N/A",
      },
      dl: {
        type: String,
        required: true,
        default: "N/A",
      },
      uidai: {
        type: String,
        required: true,
        default: "N/A",
      },
      pan: {
        type: String,
        required: true,
        default: "N/A",
      },
    },
    isActive: {
      type: String,
      enum: ["active", "inactive", "blocked"],
      required: true,
      default: "active",
    },
  },
  { timestamps: true },
);

const User = mongoose.model("User", userSchema);

export default User;
