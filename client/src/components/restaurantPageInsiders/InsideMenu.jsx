import { SearchIcon } from "lucide-react";
import toast from "react-hot-toast";
import "./restaurantPage.css";
import { useEffect, useState } from "react";
import api from "../../config/API";
import { useCart } from "../../context/cartContext";
import {useAuth} from '../../context/AuthContext'
import { useNavigate } from "react-router-dom";

const InsideMenu = ({ header }) => {
  const [searchBy, setSearchBy] = useState({
    pivotcuisine: "",
    pivottype: "",
    priceRange: "",
  });

  const navigate = useNavigate();

  const {isLogin} = useAuth()

  const { badge, totalAmt } = useCart();

  const [naam, setNaam] = useState("");

  const [minMax, setMinMax] = useState([]);

  const [menus, setMenus] = useState(header?.menu);

  const handleAddToCart = (menuid, resid) => {
    try {
      // sabse pehle to jo existing cart h use lekr aao ya new define kr do

      let existingCart = JSON.parse(localStorage.getItem("AddToCart")) || [];

      // ab dekho kya restaurant phle se h cart m

      const existingRes = existingCart.find((item) => item.resid === resid); // returns the complete object with resid

      if (existingRes) {
        // if restaurant found then find the item now

        const mainItem = existingRes.existingItem.find(
          (i) => i.menuid === menuid,
        );

        //  if item found then increase the item quantity

        if (mainItem) {
          existingRes.existingItem = existingRes.existingItem.map((i) =>
            i.menuid === menuid
              ? {
                  ...i,
                  quantity: i.quantity + 1,
                }
              : i,
          );

          //  else add the item
        } else {
          existingRes.existingItem = [
            ...existingRes.existingItem,
            {
              menuid,
              quantity: 1,
            },
          ];
        }
      } else {
        //  if restaurant is not found than make the restaurant field first and than add the menuitem array, add menu item, add quantity...

        existingCart = [
          ...existingCart,
          {
            resid,
            existingItem: [
              {
                menuid,
                quantity: 1,
              },
            ],
          },
        ];
      }

      toast.success("Added to Cart");
      localStorage.setItem("AddToCart", JSON.stringify(existingCart));
    } catch (error) {
      toast.error(error);
    }
  };

  const fetchFilteredData = async () => {
    try {
      const res = await api.get("/public/get-filtered", {
        params: {
          id: header?._id,
          pivotc: searchBy.pivotcuisine,
          pivott: searchBy.pivottype,
          priran: searchBy.priceRange,
          naam: naam,
        },
      });
      setMenus(res?.data?.data);
      console.log("FilteredData : ", res?.data?.data);
    } catch (error) {
      console.log(error);
    }
  };

  const minMaxPrice = () => {
    const min = header?.menu?.map((dish) => Number(dish?.price));
    setMinMax(min);
    return min;
  };

  useEffect(() => {
    if (header?.menu) {
      setMenus(header.menu);
      minMaxPrice();
    }
  }, [header]);

  useEffect(() => {
    if (header?._id) {
      fetchFilteredData();
    }
  }, [searchBy, naam]);

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
                  "North Indian",
                  "South Indian",
                  "italian",
                  "Chinese",
                  "Dessert",
                  "Mughlai",
                ].map((item, idx) => (
                  <button
                    type="button"
                    onClick={() =>
                      setSearchBy((prev) => ({ ...prev, pivotcuisine: item }))
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
              {[
                "veg",
                "nonveg",
                "spicy",
                "vegan",
                "gluten-free",
                "contains-nuts",
              ].map((item, idx) => (
                <button
                  type="button"
                  onClick={() =>
                    setSearchBy((prev) => ({ ...prev, pivottype: item }))
                  }
                  key={idx}
                  className="text-(--color-background) bg-(--color-primary) border p-1 px-2 rounded-lg font-normal capitalize"
                >
                  {item}
                </button>
              ))}
            </div>
            {/* {searchBy.pivot} */}
            <div className="text-lg font-semibold">Price</div>
            <div className="flex gap-2 pl-3 items-center">
              <span>{minMax.length ? Math.min(...minMax) : 0}</span>
              <input
                type="range"
                className="custom-range mr-5"
                min={minMax.length ? Math.min(...minMax) : 0}
                max={minMax.length ? Math.max(...minMax) : 1000}
                value={searchBy.priceRange}
                onChange={(e) =>
                  setSearchBy((prev) => ({
                    ...prev,
                    priceRange: e.target.value,
                  }))
                }
              />

              {/* {searchBy.priceRange} */}

              <span>{minMax.length ? Math.max(...minMax) : 1000}</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-5 w-[70%] overflow-auto">
          <div className="flex items-center gap-5">
            <input
              type="search"
              className="rounded-3xl bg-white p-2 w-full"
              placeholder="Find Your Dish"
              value={searchBy.naam}
              onChange={(e) =>
                setTimeout(() => {
                  setNaam(e.target.value);
                }, 3000)
              }
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
                  <div className="flex flex-col gap-2">
                    <h3 className="text-lg font-semibold">{menu?.dishName}</h3>
                    <h6 className="text-sm font-normal bg-(--color-secondary) py-0.2 px-2 rounded-2xl text-(--color-background) w-fit">
                      {menu?.cuisine}
                    </h6>
                  </div>
                  {/* Right: Image */}
                  <img
                    src={menu?.image[0].url}
                    alt={menu.dishName}
                    className="w-20 h-20 object-cover rounded-lg"
                  />
                </div>

                <p className="text-sm text-gray-500 mt-1">
                  {menu?.description.slice(0, 100)}.....
                </p>

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
                  onClick={() => handleAddToCart(menu._id, menu.restaurantID)}
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

      <div>
        <div className="fixed bottom-0 left-0 w-full z-50">
          <div
            className="max-w-5xl mx-auto mb-4 px-5 py-4 rounded-2xl shadow-lg flex items-center justify-between"
            style={{
              backgroundColor: "var(--color-primary)",
              color: "white",
            }}
          >
            {/* Left: Cart Info */}
            <div className="flex flex-col">
              <span
                className="text-sm"
                style={{ color: "var(--color-accent-soft)" }}
              >
                {badge} items in cart
              </span>
              <span className="text-lg font-semibold">₹{totalAmt}</span>
            </div>

            {/* Right: View Cart Button */}
            <button
              onClick={() => {
                if (isLogin) {
                  navigate("/add-to-cart");
                } else {
                  toast.error("Please login as customer to continue...");
                  navigate("/login");
                }
              }}
              className="px-5 py-2 rounded-xl font-semibold transition"
              style={{
                backgroundColor: "var(--color-secondary)",
                color: "white",
              }}
              onMouseOver={(e) =>
                (e.currentTarget.style.backgroundColor =
                  "var(--color-secondary-hover)")
              }
              onMouseOut={(e) =>
                (e.currentTarget.style.backgroundColor =
                  "var(--color-secondary)")
              }
            >
              View Cart →
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default InsideMenu;
