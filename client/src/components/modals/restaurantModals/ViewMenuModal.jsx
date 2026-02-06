import { X } from "lucide-react";
import React from "react";

const ViewMenuModal = ({ onClose, selectedItem }) => {
  return (
    <>
      <div className="fixed bg-black/80 inset-0 flex items-center justify-center">
       
          <button type="button" onClick={()=> onClose()} className="fixed top-20 right-0">
            <X color="white"/>
          </button>
      
        <div
          className="bg-white max-h-[80vh] rounded-2xl mt-10 w-5xl overflow-y-auto z-100 transition hover:shadow-xl"
          style={{
            backgroundColor: "var(--color-surface)",
            color: "var(--color-text-primary)",
          }}
        >
          {/* Image */}

          <div className={`h-48 w-full overflow-hidden grid grid-cols-5 gap-1`}>
            {selectedItem?.image?.map((i, idx) => (
              <img
                key={idx}
                src={selectedItem?.image?.[idx]?.url || "/placeholder-food.jpg"}
                alt={selectedItem.dishName}
                className="w-full h-full object-cover"
              />
            ))}
          </div>

          {/* Content */}
          <div className="p-4 space-y-3">
            {/* Top row */}
            <div className="flex justify-between items-start">
              <h2
                className="text-lg font-semibold"
                style={{ color: "var(--color-primary)" }}
              >
                {selectedItem.dishName}
              </h2>

              <span
                className="px-3 py-1 text-xs rounded-full"
              >
                <div
                          className={`p-3 font-semibold rounded-2xl ${
                            selectedItem.type === "veg"
                              ? "text-green-700 bg-green-200"
                              : selectedItem.type === "vegan"
                                ? "text-emerald-700 bg-emerald-100"
                                : selectedItem.type === "nonveg"
                                  ? "text-red-700 bg-red-100"
                                  : selectedItem.type === "egg"
                                    ? "text-amber-800 bg-amber-100"
                                    : selectedItem.type === "spicy"
                                      ? "text-orange-700 bg-orange-100"
                                      : selectedItem.type === "gluten-free"
                                        ? "text-teal-700 bg-teal-100"
                                        : selectedItem.type === "jain"
                                          ? "text-blue-600 bg-blue-100"
                                          : selectedItem.type === "contains-nuts"
                                            ? "text-stone-800 bg-stone-100"
                                            : "text-rose-600 bg-rose-100"
                          }`}
                        >
                          {selectedItem.type === "veg"
                            ? "Veg"
                            : selectedItem.type === "vegan"
                              ? "Vegan"
                              : selectedItem.type === "nonveg"
                                ? "Non Veg"
                                : selectedItem.type === "egg"
                                  ? "Egg"
                                  : selectedItem.type === "spicy"
                                    ? "Spicy"
                                    : selectedItem.type === "gluten-free"
                                      ? "Gluten Free"
                                      : selectedItem.type === "jain"
                                        ? "Jain"
                                        : selectedItem.type === "contains-nuts"
                                          ? "Contains Nuts"
                                          : selectedItem.type === "sweet"
                                            ? "Sweet"
                                            : ""}
                        </div>
              </span>
            </div>

            {/* Cuisine */}
            <p
              className="text-sm font-medium"
              style={{ color: "var(--color-secondary)" }}
            >
              {selectedItem.cuisine}
            </p>

            {/* Description */}
            <p
              className="text-sm"
              style={{ color: "var(--color-text-secondary)" }}
            >
              {selectedItem.description}
            </p>

            {/* Info Row */}
            <div className="flex justify-between text-sm">
              <span>⏱ {selectedItem.preperationTime}</span>
              {selectedItem.servingSize && (
                <span>🍽 {selectedItem.servingSize}</span>
              )}
            </div>

            {/* Bottom Row */}
            <div className="flex justify-between items-center mt-3">
              <span
                className="text-lg font-bold"
                style={{ color: "var(--color-primary)" }}
              >
                ₹{selectedItem.price}
              </span>

              <button
                disabled={!selectedItem.availability}
                className="px-4 py-2 rounded-full text-sm font-medium transition"
                style={{
                  backgroundColor: selectedItem.availability
                    ? "var(--color-secondary)"
                    : "#ccc",
                  color: "#fff",
                }}
              >
                {selectedItem.availability ? "Add to Cart" : "Unavailable"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewMenuModal;
