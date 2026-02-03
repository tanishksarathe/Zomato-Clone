import {
  Search,
  ChevronDown,
  Eye,
  Pencil,
  Trash2,
  CirclePlus,
  CircleCheckBig,
  BadgeAlert,
} from "lucide-react";
import { useEffect, useState } from "react";
import AddItemModel from "../modals/addItemModel";
import toast from "react-hot-toast";
import api from "../../config/API";

const RestaurantMenu = () => {
  const [menu, setMenu] = useState({});

  const [loading, setLoading] = useState(false);

  const [openAddModal, setOpenAddModal] = useState(false);

  const fetchMenuItems = async () => {
    setLoading(true);
    try {
      const res = await api.get("/restaurant/restaurantMenu");

      console.log(res.data.data);

      setMenu(res.data.data);

      toast.success(res.data.message);
    } catch (error) {
      toast(
        error?.response?.data?.message || "Error while fetching menu items",
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
   if(!openAddModal) fetchMenuItems();
  }, [openAddModal]);

  return (
    <>
      <div className="min-h-screen bg-[#FBEEE4] p-8 text-[#3A0B1C]">
        {/* Page Title */}
        <h1 className="text-2xl font-semibold text-center mb-6">
          Added Menu Items
        </h1>

        {/* Top Controls */}
        <div className="flex flex-wrap items-center gap-4 bg-[#FFF7F1] p-4 rounded-xl shadow-sm mb-6">
          {/* Search */}
          <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-lg border w-full max-w-xs">
            <Search size={18} className="text-gray-400" />
            <input
              type="text"
              placeholder="Search items..."
              className="outline-none w-full text-sm bg-transparent"
            />
          </div>

          {/* Veg / Non-Veg */}
          <div className="flex items-center gap-4">
            <label className="flex items-center gap-2 text-sm">
              <input type="radio" name="type" className="accent-green-600" />
              Veg
            </label>
            <label className="flex items-center gap-2 text-sm">
              <input type="radio" name="type" className="accent-red-600" />
              Non-Veg
            </label>
          </div>

          {/* Cuisine Dropdown */}
          {/* <div className="relative">
            <select className="appearance-none bg-white border rounded-lg px-4 py-2 pr-10 text-sm">
              <option>Select Cuisine</option>
              <option>Indian</option>
              <option>Italian</option>
              <option>Continental</option>
              <option>Desserts</option>
            </select>
            <ChevronDown
              size={18}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
            />
          </div> */}

          {/* Add Item Button */}
          <button
            onClick={() => setOpenAddModal(true)}
            className="ml-auto flex justify-center items-center gap-2 bg-[#8E1D4F] hover:bg-[#5A142B] text-white px-3 py-2 rounded-lg text-sm font-medium"
          >
            <CirclePlus size={18} />
            Add Item
          </button>
        </div>

        {/* Table Card */}
        <div className="bg-[#FFF7F1] rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-semibold mb-4">Added Menu Items</h2>

          {loading ? (
            <div>Loading....</div>
          ) : menu ? (
            <>
              <div className="overflow-x-auto">
                <table className="w-full border border-[#F3C2A6] rounded-lg overflow-hidden">
                  <thead className="bg-[#F3C2A6] text-sm">
                    <tr>
                      <th className="p-3 text-left">S. No</th>
                      <th className="p-3 text-left">Dish Name</th>
                      <th className="p-3 text-left">Cuisine</th>
                      <th className="p-3 text-left">Food Type</th>
                      <th className="p-3 text-left">Price (INR)</th>
                      <th className="p-3 text-left">Actions</th>
                    </tr>
                  </thead>

                  <tbody className="text-sm bg-white">
                    {Array.from(menu).map((item, index) => (
                      <tr key={index} className="border-t">
                        <td className="p-3">{index + 1}</td>
                        <td className="p-3 font-medium">{item.dishName}</td>
                        <td className="p-3">{item.cuisine}</td>
                        <td
                          className={`p-3 font-semibold ${
                            item.type === "veg"
                              ? "text-green-700"
                              : item.type === "vegan"
                                ? "text-emerald-700"
                                : item.type === "nonveg"
                                  ? "text-red-700"
                                  : item.type === "egg"
                                    ? "text-amber-800"
                                    : item.type === "spicy"
                                      ? "text-orange-700"
                                      : item.type === "gluten-free"
                                        ? "text-teal-700"
                                        : item.type === "jain"
                                          ? "text-blue-600"
                                          : item.type === "contains-nuts"
                                            ? "text-stone-800"
                                            : "text-rose-600"
                          }`}
                        >
                          {item.type === "veg"
                            ? "Veg"
                            : item.type === "vegan"
                              ? "Vegan"
                              : item.type === "nonveg"
                                ? "Non Veg"
                                : item.type === "egg"
                                  ? "Egg"
                                  : item.type === "spicy"
                                    ? "Spicy"
                                    : item.type === "gluten-free"
                                      ? "Gluten Free"
                                      : item.type === "jain"
                                        ? "Jain"
                                        : item.type === "contains-nuts"
                                          ? "Contains Nuts"
                                          : item.type === "sweet"
                                            ? "Sweet"
                                            : ""}
                        </td>
                        <td className="p-3">{item.price}</td>
                        <td className="p-3">
                          <div className="flex gap-2">
                            <button className="flex items-center gap-1 bg-[#5A142B] text-white px-3 py-1 rounded-md text-md">
                              <Eye size={14} /> View
                            </button>
                            <button className="flex items-center gap-1 bg-[#E08A45] text-white px-3 py-1 rounded-md text-md">
                              <Pencil size={14} /> Edit
                            </button>
                            <button
                              onClick={() => setAvailable(!menu.available)}
                              className={`flex items-center w-28 justify-center gap-1 ${menu.available ? "bg-green-600" : "bg-red-600"} text-white px-3 py-1 rounded-md text-md`}
                            >
                              {menu.available ? (
                                <span className="flex justify-center gap-1 items-center">
                                  <CircleCheckBig size={15} />
                                  Available
                                </span>
                              ) : (
                                <span className="flex justify-center gap-1 items-center">
                                  <BadgeAlert size={15} />
                                  Unavailable
                                </span>
                              )}
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          ) : (
            <div>No items to display</div>
          )}
        </div>
      </div>
      {openAddModal && <AddItemModel onClose={() => setOpenAddModal(false)} />}
    </>
  );
};

export default RestaurantMenu;
