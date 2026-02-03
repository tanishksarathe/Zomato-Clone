import mongoose from "mongoose";

const menuSchema = mongoose.Schema(
  {
    restaurantID: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    dishName: {
      type: String,
      required: true,
    },
    cuisine: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: [
        "veg",
        "nonveg",
        "vegan",
        "egg",
        "jain",
        "spicy",
        "gluten-free",
        "contains-nuts",
        "sweet",
      ],
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: String,
      required: true,
    },
    availability: {
      type: Boolean,
      required: true,
      default: true,
    },
    preperationTime:{
      type:String,
      required:true
    },
    servingSize: {
      type: String,
    },
    image: {
      type: [
        {
          url: { type: String, required: true },
          publicID: { type: String, required: true },
        },
      ],
    },
  },
  {
    timestamps: true,
  },
);

export const Menu = mongoose.model("Menu", menuSchema);