import React, { useState } from "react";
import { Utensils, Clock, DollarSign, Tag, CheckCircle, X } from "lucide-react";
import toast from "react-hot-toast";
import api from "../../../config/API";

const EditMenuModal = ({ onClose, selectedItem }) => {
  const [loading, setLoading] = useState(false);

  const [details, setDetails] = useState({
    dishName: selectedItem.dishName || "",
    cuisine: selectedItem.cuisine || "",
    type: selectedItem.type || "",
    description: selectedItem.description || "",
    price: selectedItem.price || "",
    availability: selectedItem.availability || true,
    preperationTime: selectedItem.preperationTime || "",
    servingSize: selectedItem.servingSize || "",
  });

  const handleChange = (e) => {
    const { value, name, checked, type } = e.target;

    setDetails((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await api.put(
        `/restaurant/update-menu-item/${selectedItem._id}`,
        details,
      );

      toast.success(res?.data?.message);

      onClose();
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || "Unknown Error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="fixed bg-black/80 inset-0 flex flex-col items-center justify-center">
        <button
          type="button"
          onClick={() => onClose()}
          className="fixed top-20 right-0"
        >
          <X color="white" />
        </button>
        <div className="flex flex-col bg-(--color-surface) items-center rounded-2xl mt-15">
          <h2 className="text-2xl font-bold text-(--color-primary) flex items-center gap-2 p-2">
            <Utensils size={24} />
            Edit Dish
          </h2>
          <form
            className="max-w-5xl mx-auto p-8 rounded-2xl shadow-lg space-y-3 grid grid-cols-3 gap-4"
            onSubmit={handleSubmit}
          >
            {/* Dish Name */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Dish Name
              </label>
              <input
                type="text"
                name="dishName"
                placeholder="Enter dish name"
                className="w-full px-4 py-2 rounded-lg border border-(--color-accent-soft) focus:outline-none focus:ring-2 focus:ring-(--color-primary)"
                value={details.dishName}
                onChange={handleChange}
                required
              />
            </div>

            {/* Cuisine */}
            <div>
              <label className="block text-sm font-medium mb-1">Cuisine</label>
              <input
                type="text"
                name="cuisine"
                placeholder="e.g. Italian, Indian"
                className="w-full px-4 py-2 rounded-lg border border-(--color-accent-soft) focus:outline-none focus:ring-2 focus:ring-(--color-primary)"
                value={details.cuisine}
                onChange={handleChange}
                required
              />
            </div>

            {/* Type */}
            <div>
              <label className="block text-sm font-medium mb-1">Type</label>
              <select
                name="type"
                className="w-full px-4 py-2 rounded-lg border border-(--color-accent-soft) focus:outline-none focus:ring-2 focus:ring-(--color-primary)"
                value={details.type}
                onChange={handleChange}
                required
              >
                <option value="veg">Veg</option>
                <option value="nonveg">Non-Veg</option>
                <option value="vegan">Vegan</option>
                <option value="egg">Egg</option>
                <option value="jain">Jain</option>
                <option value="spicy">Spicy</option>
                <option value="gluten-free">Gluten-Free</option>
                <option value="contains-nuts">Contains Nuts</option>
                <option value="sweet">Sweet</option>
              </select>
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Description
              </label>
              <textarea
                name="description"
                rows="4"
                placeholder="Enter dish description"
                className="w-full px-4 py-2 rounded-lg border border-(--color-accent-soft) focus:outline-none focus:ring-2 focus:ring-(--color-primary)"
                value={details.description}
                onChange={handleChange}
                required
              />
            </div>

            {/* Price */}
            <div>
              <label className="text-sm font-medium mb-1 flex items-center gap-1">
                <DollarSign size={16} />
                Price
              </label>
              <input
                type="number"
                name="price"
                placeholder="Enter price"
                className="w-full px-4 py-2 rounded-lg border border-(--color-accent-soft) focus:outline-none focus:ring-2 focus:ring-(--color-primary)"
                value={details.price}
                onChange={handleChange}
                required
              />
            </div>

            {/* Preparation Time */}
            <div>
              <label className="text-sm font-medium mb-1 flex items-center gap-1">
                <Clock size={16} />
                Preparation Time
              </label>
              <input
                type="text"
                name="preperationTime"
                placeholder="e.g. 15 mins"
                className="w-full px-4 py-2 rounded-lg border border-(--color-accent-soft) focus:outline-none focus:ring-2 focus:ring-(--color-primary)"
                value={details.preperationTime}
                onChange={handleChange}
                required
              />
            </div>

            {/* Serving Size */}
            <div>
              <label className="text-sm font-medium mb-1 flex items-center gap-1">
                <Tag size={16} />
                Serving Size
              </label>
              <input
                type="text"
                name="servingSize"
                placeholder="e.g. 1 plate, 2 persons"
                className="w-full px-4 py-2 rounded-lg border border-(--color-accent-soft) focus:outline-none focus:ring-2 focus:ring-(--color-primary)"
                value={details.servingSize}
                onChange={handleChange}
                required
              />
            </div>

            {/* Availability */}
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                name="availability"
                className="w-4 h-4 accent-(--color-primary)"
                checked={details.availability}
                value={details.availability}
                onChange={handleChange}
              />
              <label className="flex items-center gap-1 text-sm font-medium">
                <CheckCircle size={16} />
                Available
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-(--color-primary) text-white font-semibold hover:bg-(--color-primary-hover) transition"
            >
              Save Changes
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default EditMenuModal;
