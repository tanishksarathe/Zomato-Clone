import React from "react";

const InsideMenu = ({ menus }) => {
  console.log("Menu from Inside Menu : ", menus);

  return (
    <>
    {
      menus.map((menu, idx)=> (

      <div key={idx}
      className={`w-80 bg-white rounded-xl shadow-sm p-5 transition 
        ${!menu.availability ? "opacity-60" : "hover:shadow-md"}`}
        >
        {/* Top row */}
        <div className="flex justify-between items-start">
          {/* Left: Bestseller */}

          {/* {menu.bestseller && (
          <span className="bg-yellow-100 text-yellow-700 text-xs font-semibold px-3 py-1 rounded-full">
            Bestseller
            </span>
            )} */}

          <div
            className={`w-4 h-4 border-2 flex items-center justify-center
            ${menu.type === "veg" ? "border-green-600" : "border-red-600"}`}
          >
            <div
              className={`w-2 h-2 rounded-full
                ${menu.type === "veg" ? "bg-green-600" : "bg-red-600"}`}
                />
          </div>
        </div>

        {/* menu info */}
        <div className="mt-3">
          {/* Name + veg indicator */}
          <div className="flex items-center justify-between gap-2">
            <h3 className="text-lg font-semibold">{menu.dishName}</h3>

            {/* Right: Image */}
            <img
              src={menu.image[0].url}
              alt={menu.dishName}
              className="w-20 h-20 object-cover rounded-lg"
              />
          </div>

          <p className="text-sm text-gray-500 mt-1">{menu.description}</p>

          <p className="text-sm text-gray-600 mt-2">
            Serving: {menu.servingSize}
          </p>

          <p
            className={`text-xs mt-1 font-medium ${
              menu.availability ? "text-green-600" : "text-red-600"
              }`}
              >
            {menu.availability ? "Available" : "Finished for Toady"}
          </p>
        </div>

        {/* Bottom action */}
        <div className="flex justify-between items-center mt-4">
          <span className="text-lg font-bold">₹{menu.price}</span>
          <button
            disabled={!menu.availability}
            className={`px-4 py-1.5 rounded-lg font-semibold text-white
              ${
                menu.availability
                ? "bg-red-500 hover:bg-red-600"
                : "bg-gray-400 cursor-not-allowed"
                }`}
                >
            Add
          </button>
        </div>
      </div>
))
}
    </>
  );
};

export default InsideMenu;
