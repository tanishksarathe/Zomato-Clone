import React from "react";

const InsideMenu = () => {
  const dish = {
    name: "Paneer Butter Masala",
    description: "Creamy tomato gravy with soft paneer cubes",
    servingSize: "Serves 2",
    price: 220,
    veg: true,
    bestseller: true,
    available: true,
    image:
      "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=200&q=80",
  };

  return (
    <div
      className={`w-80 bg-white rounded-xl shadow-sm p-5 transition 
      ${!dish.available ? "opacity-60" : "hover:shadow-md"}`}
    >
      {/* Top row */}
      <div className="flex justify-between items-start">
        {/* Left: Bestseller */}
        {dish.bestseller && (
          <span className="bg-yellow-100 text-yellow-700 text-xs font-semibold px-3 py-1 rounded-full">
            Bestseller
          </span>
        )}

        <div
          className={`w-4 h-4 border-2 flex items-center justify-center
            ${dish.veg ? "border-green-600" : "border-red-600"}`}
        >
          <div
            className={`w-2 h-2 rounded-full
              ${dish.veg ? "bg-green-600" : "bg-red-600"}`}
          />
        </div>
      </div>

      {/* Dish info */}
      <div className="mt-3">
        {/* Name + veg indicator */}
        <div className="flex items-center justify-between gap-2">
          <h3 className="text-lg font-semibold">{dish.name}</h3>

          {/* Right: Image */}
          <img
            src={dish.image}
            alt={dish.name}
            className="w-20 h-20 object-cover rounded-lg"
          />
        </div>

        <p className="text-sm text-gray-500 mt-1">{dish.description}</p>

        <p className="text-sm text-gray-600 mt-2">
          Serving: {dish.servingSize}
        </p>

        <p
          className={`text-xs mt-1 font-medium ${
            dish.available ? "text-green-600" : "text-red-600"
          }`}
        >
          {dish.available ? "Available" : "Out of Stock"}
        </p>
      </div>

      {/* Bottom action */}
      <div className="flex justify-between items-center mt-4">
        <span className="text-lg font-bold">₹{dish.price}</span>
        <button
          disabled={!dish.available}
          className={`px-4 py-1.5 rounded-lg font-semibold text-white
          ${
            dish.available
              ? "bg-red-500 hover:bg-red-600"
              : "bg-gray-400 cursor-not-allowed"
          }`}
        >
          Add
        </button>
      </div>
    </div>
  );
};

export default InsideMenu;
