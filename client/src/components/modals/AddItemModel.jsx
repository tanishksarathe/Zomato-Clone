import { ImagePlus, Loader, Upload, X } from "lucide-react";
import React, { useRef, useState } from "react";
import api from "../../config/API";
import toast from "react-hot-toast";

const AddItemModel = ({ onClose }) => {
  const [details, setDetails] = useState({
    dishName: "",
    cuisine: "",
    type: "",
    description: "",
    price: "",
    availability: true,
    preperationTime: "",
    servingSize: "",
  });

  const [loading, setLoading] = useState(false);

  const [preview, setPreview] = useState([]);

  const dishes = useRef(null);

  const handlePhotoChange = async (e) => {
    const file = Array.from(e.target.files);

    setPreview(file.slice(0, 5));
  };

  const handleChange = (e) => {
    const { type, name, value, checked } = e.target;

    setDetails((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    console.log("Details before sending to backend : ", details);

    try {
      const formData = new FormData();
      formData.append("dishName", details.dishName);
      formData.append("servingSize", details.servingSize);
      formData.append("cuisine", details.cuisine);
      formData.append("availability", details.availability);
      formData.append("price", details.price);
      formData.append("description", details.description);
      formData.append("preperationTime", details.preperationTime);
      formData.append("type", details.type);

      preview.map((item) => formData.append("menuImage", item));

      const response = await api.post("/restaurant/restaurantMenu", formData);

      toast.success(response.data.message);
      onClose();
    } catch (error) {
      toast.error(error?.response?.data?.message || "Unknown Error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="fixed bg-black/80 inset-0 flex items-center justify-center">
        <div className="bg-white max-h-[80vh] w-5xl overflow-y-auto mt-20 p-8 relative">
          <button
            onClick={() => onClose()}
            className="absolute top-0 right-0 p-2"
          >
            <X />
          </button>

          <h1 className="text-2xl font-semibold mb-6">Add Menu Item</h1>

          <form
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
            onSubmit={handleSubmit}
          >
            {/* Dish Name */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Dish Name *
              </label>
              <input
                type="text"
                placeholder="Enter dish name"
                className="w-full border rounded-lg px-4 py-2 outline-none"
                name="dishName"
                value={details.dishName}
                onChange={handleChange}
                required
              />
            </div>

            {/* Cuisine */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Cuisine *
              </label>
              <input
                type="text"
                placeholder="e.g. Indian, Italian"
                className="w-full border rounded-lg px-4 py-2 outline-none"
                name="cuisine"
                value={details.cuisine}
                onChange={handleChange}
                required
              />
            </div>

            {/* Type (Enum) */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Dish Type *
              </label>
              <select
                className="w-full border rounded-lg px-4 py-2 outline-none"
                name="type"
                value={details.type}
                onChange={handleChange}
                required
              >
                <option value="">Select type</option>
                <option value="veg">Veg</option>
                <option value="nonveg">Non-Veg</option>
                <option value="vegan">Vegan</option>
                <option value="egg">Egg</option>
                <option value="jain">Jain</option>
                <option value="spicy">Spicy</option>
                <option value="gluten-free">Gluten Free</option>
                <option value="contains-nuts">Contains Nuts</option>
                <option value="sweet">Sweet</option>
              </select>
            </div>

            {/* Price */}
            <div>
              <label className="block text-sm font-medium mb-1">Price *</label>
              <input
                type="text"
                placeholder="₹ Price"
                className="w-full border rounded-lg px-4 py-2 outline-none"
                name="price"
                value={details.price}
                onChange={handleChange}
                required
              />
            </div>

            {/* Serving Size */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Serving Size
              </label>
              <input
                type="text"
                placeholder="e.g. 1 plate, 250g"
                className="w-full border rounded-lg px-4 py-2 outline-none"
                name="servingSize"
                value={details.servingSize}
                onChange={handleChange}
                required
              />
            </div>

            {/* Preperation Time */}

            <div>
              <label className="block text-sm font-medium mb-1">
                Preperation Time (in Mins)
              </label>
              <input
                type="text"
                placeholder="e.g. 60 mins"
                className="w-full border rounded-lg px-4 py-2 outline-none"
                name="preperationTime"
                value={details.preperationTime}
                onChange={handleChange}
                required
              />
            </div>

            {/* Availability */}
            <div className="flex items-center gap-3 mt-6">
              <input
                type="checkbox"
                className="w-4 h-4 accent-[#8E1D4F]"
                name="availability"
                value={details.availability}
                onChange={handleChange}
              />
              <label className="text-sm font-medium">
                Available for ordering
              </label>
            </div>

            {/* Description */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-1">
                Description *
              </label>
              <textarea
                rows="4"
                placeholder="Describe the dish..."
                className="w-full border rounded-lg px-4 py-2 outline-none resize-none"
                name="description"
                value={details.description}
                onChange={handleChange}
                required
              />
            </div>

            {/* Image Upload */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-2">
                Dish Images (Max 3) *
              </label>

              <div
                className="border-2 border-dashed border-[#F3C2A6]  rounded-xl p-6 bg-white"
                onClick={() => dishes.current.click()}
              >
                <div className="flex flex-col items-center gap-2 text-center">
                  <ImagePlus size={36} className="text-[#8E1D4F]" />
                  <p className="text-sm text-gray-600">Upload up to 5 images</p>
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    ref={dishes}
                    className="mt-2 text-sm"
                    onChange={handlePhotoChange}
                    hidden
                  />
                </div>
              </div>
              {preview.length !== 0 && (
                <div className="grid grid-cols-5 p-2 gap-2">
                  {preview.map((item, idx) => (
                    <div key={idx} className="relative">
                      <img
                        src={URL.createObjectURL(item)}
                        alt="images"
                        className="h-40 rounded-md w-40 object-cover"
                      />
                      <button
                        type="button"
                        onClick={() =>
                          setPreview((prev) => prev.filter((_, i) => i !== idx))
                        }
                        className="absolute top-0 right-0 bg-white rounded-full m-1 cursor-pointer"
                      >
                        <X size={20} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Submit Button */}
            <div className="md:col-span-2 flex justify-end">
              <button
                type="submit"
                className="flex items-center gap-2 bg-[#8E1D4F] hover:bg-[#5A142B] text-white px-8 py-3 rounded-lg font-medium"
              >
                {loading ? (
                  <div className="flex gap-1">
                    Pr<span className="animate-spin">
                      
                      <Loader size={15} />
                    </span>
                      cessing
                  </div>
                ) : (
                  <div className="flex gap-1">
                    <span>
                      <Upload size={18} />
                    </span>
                    Save Menu Item
                  </div>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddItemModel;
