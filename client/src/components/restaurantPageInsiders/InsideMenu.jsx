import { SearchIcon } from "lucide-react";
import toast from "react-hot-toast";
import "./restaurantPage.css";
import { useState } from "react";

const InsideMenu = ({ menus }) => {
  const [searchBy, setSearchBy] = useState({
    pivot: "",
    priceRange: "",
  });

  const handleAddToCart = (menuItem) => {
    try {
      // sabse pehle to jo existing cart h use lekr aao ya new define kr do

      const existingCart = JSON.parse(localStorage.getItem("AddToCart")) || [];

      // ab dekho kya item phle se h cart m

      const existingItem = existingCart.find(
        (item) => item._id === menuItem._id,
      );

      // agr existing item h to uski quantity bdha kr save kro if not than direct new item ki entry save krvao

      if (existingItem) {
        const updateCart = existingCart.map((item) =>
          item._id === menuItem._id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
        localStorage.setItem("AddToCart", JSON.stringify(updateCart));
        toast.success("Added to Cart");
      } else {
        const updateCart = [...existingCart, { ...menuItem, quantity: 1 }];
        localStorage.setItem("AddToCart", JSON.stringify(updateCart));
        toast.success("Added to Cart");
      }
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <>
      <div className="flex">
        <div className="w-[30%] h-full flex flex-col pr-4">
          <h3 className="text-left font-semibold border-b pb-2 text-xl mb-3">
            Customise your Search
          </h3>
          <div className="flex flex-col capitalize gap-3 flex-wrap py-2 text-sm">
            <div className="text-lg font-semibold">Cuisines</div>
            <div className="flex flex-wrap gap-2 items-center">
              <div className="flex flex-wrap gap-2 pl-3 items-center capitalize">
                {[
                  "north-indian",
                  "south-indian",
                  "italian",
                  "chinese",
                  "dessert",
                ].map((item, idx) => (
                  <button
                    type="button"
                    onClick={() =>
                      setSearchBy((prev) => ({ ...prev, pivot: item }))
                    }
                    key={idx}
                    className="text-(--color-background) bg-(--color-primary) border p-1 px-2 rounded-lg font-normal"
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

            <div className="text-lg font-semibold">Categories</div>
            <div className="flex flex-wrap gap-2 pl-3 items-center capitalize">
              {["veg", "non-veg", "vegan", "gluten-free"].map((item, idx) => (
                <button
                  type="button"
                  onClick={() =>
                    setSearchBy((prev) => ({ ...prev, pivot: item }))
                  }
                  key={idx}
                  className="text-(--color-background) bg-(--color-primary) border p-1 px-2 rounded-lg font-normal"
                >
                  {item}
                </button>
              ))}
            </div>
            {/* {searchBy.pivot} */}
            <div className="text-lg font-semibold">Price</div>
            <div className="flex gap-2 pl-3 items-center">
              <span>max</span>
              <input
                type="range"
                className="custom-range mr-5"
                min={0}
                max={100}
                value={searchBy.priceRange}
                onChange={(e) =>
                  setSearchBy((prev) => ({ ...prev, priceRange: e.target.value }))
                }
              />

              {/* {searchBy.priceRange} */}

              <span>min</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-5 w-[70%] overflow-auto">
          <div className="flex items-center gap-5">
            <input
              type="search"
              className="rounded-3xl bg-white p-2 w-full"
              placeholder="Find Your Dish"
            />
            <div className="bg-white rounded-full p-2">
              <SearchIcon />
            </div>
          </div>

          {menus.map((menu, idx) => (
            <div
              key={idx}
              className={`w-full bg-white rounded-xl shadow-sm p-5 transition 
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
            ${
              menu.type === "veg"
                ? "border-green-700"
                : menu.type === "vegan"
                  ? "border-emerald-700"
                  : menu.type === "nonveg"
                    ? "border-red-700"
                    : menu.type === "egg"
                      ? "border-amber-800"
                      : menu.type === "spicy"
                        ? "border-orange-700"
                        : menu.type === "gluten-free"
                          ? "border-teal-700"
                          : menu.type === "jain"
                            ? "border-blue-600"
                            : menu.type === "contains-nuts"
                              ? "border-stone-800"
                              : "border-rose-600"
            }`}
                >
                  <div
                    className={`w-2 h-2 rounded-full
                ${
                  menu.type === "veg"
                    ? "bg-green-700"
                    : menu.type === "vegan"
                      ? "bg-emerald-700"
                      : menu.type === "nonveg"
                        ? "bg-red-700"
                        : menu.type === "egg"
                          ? "bg-amber-800"
                          : menu.type === "spicy"
                            ? "bg-orange-700"
                            : menu.type === "gluten-free"
                              ? "bg-teal-700"
                              : menu.type === "jain"
                                ? "bg-blue-600"
                                : menu.type === "contains-nuts"
                                  ? "bg-stone-800"
                                  : "bg-rose-600"
                }`}
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
                    src={menu?.image[0].url}
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
                  type="button"
                  onClick={() => handleAddToCart(menu)}
                  disabled={!menu.availability}
                  className={`px-4 py-1.5 rounded-lg capitalize font-semibold text-white
              ${
                menu.availability
                  ? "bg-red-500 hover:bg-red-600"
                  : "bg-gray-400 cursor-not-allowed"
              }`}
                >
                  Add to cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default InsideMenu;
