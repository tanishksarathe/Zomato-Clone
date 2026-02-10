import toast from "react-hot-toast";

const InsideMenu = ({ menus }) => {

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
      <div className="grid grid-cols-3">
        {menus.map((menu, idx) => (
          <div
            key={idx}
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
        ))}
      </div>
    </>
  );
};

export default InsideMenu;
