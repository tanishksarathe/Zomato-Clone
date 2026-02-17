import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import api from "../../config/API";
import { useCart } from "../../context/cartContext";

const AddToCartPage = () => {
  const [cartItems, setCartItems] = useState([]);

  const [cart, setCart] = useState();

  const { setBadge } = useCart();

  const fetchCartItems = async (list, localCart) => {
    try {
      const res = await api.get(`/public/cart-items/${list}`);

      // here we need to merge our state with the local storage because we have quanity in that storage only so that's why

      // jo data upr se aa rha h usme map lgao

      // double loop concept // time complexity i suppose O(n^2)

      // const mergedCart = res?.data?.data.map((item) => {
      //   const localItem = localCart.find((i) => {
      //     i.menuItem === item._id;
      //   });

      //   return {
      //     ...item,
      //     quantity: localItem?.quantity || 1,
      //   };
      // });

      // map approach, yaha m local storage m id and quanity ko map kr dunga than O(n) time complexity se cheezo ko handle krunga

      const localRestaurants = {}; // map ready

      localCart.forEach((item) => {
        localRestaurants[item.resid] = item.existingItem; // map filling
      });

      // console.log(localRestaurants); // debug

      // now map of menu items with quantity

      const mapMenuQuantity = {};

      for (let resid in localRestaurants) {
        const items = localRestaurants[resid];

        items.forEach((item) => {
          mapMenuQuantity[item.menuid] = item.quantity;
        });
      }

      console.log(mapMenuQuantity);

      // now merge

      // const localQuantity = res?.data?.data.map((item) => {
      //   return {
      //     ...item,
      //     quantity: localQuantity[item._id] || 1,
      //   };
      // });

      // setCart(mergedCart);

      // setBadge(mergedCart.length);
    } catch (error) {
      console.log(error);
    }
  };

  const onRemove = (itemid) => {
    setCartItems((prev) => {
      const updtaed = prev.filter((i) => i.menuItem !== itemid);
      localStorage.setItem("AddToCart", JSON.stringify(updtaed));
      return updtaed;
    });

    setCart((prev) => prev.filter((i) => i._id !== itemid));
  };

  const onDecrease = (itemid) => {
    const updateCart = cartItems.map((i) =>
      i.menuItem === itemid && i.quantity >= 1
        ? { ...i, quantity: i.quantity - 1 }
        : i,
    );
    setCartItems(updateCart);
    localStorage.setItem("AddToCart", JSON.stringify(updateCart));

    setCart((prev) =>
      prev.map((i) =>
        i._id === itemid ? { ...i, quantity: i.quantity - 1 } : i,
      ),
    );
  };

  const onIncrease = (itemid) => {
    const updateCart = cartItems.map((i) =>
      i.menuItem === itemid ? { ...i, quantity: i.quantity + 1 } : i,
    );
    setCartItems(updateCart);
    localStorage.setItem("AddToCart", JSON.stringify(updateCart));

    setCart((prev) =>
      prev.map((i) =>
        i._id === itemid ? { ...i, quantity: i.quantity + 1 } : i,
      ),
    );
  };

  useEffect(() => {
    const parsedLocalStorageData =
      JSON.parse(localStorage.getItem("AddToCart")) || [];
    setCartItems(parsedLocalStorageData);

    const list = parsedLocalStorageData?.map((item) => item?.resid);

    fetchCartItems(list, parsedLocalStorageData);
  }, []);

  function totalAmount() {
    let total = 0;
    cart?.forEach(
      (item) => (total += Number(item.price) * Number(item.quantity)),
    );
    return total;
  }

  console.log(cart);

  return (
    <>
      <div className="min-h-screen py-10 px-4 bg-(--color-background)">
        {/* Main container */}
        <div className="max-w-4xl mx-auto">
          {/* Page title */}
          <h1 className="text-3xl font-bold mb-8 text-(--color-text-primary)">
            Your Cart
          </h1>

          {/* Empty state */}
          {cart?.length === 0 && (
            <div
              className="text-center py-20 rounded-xl shadow-sm"
              style={{ backgroundColor: "var(--color-surface)" }}
            >
              <p
                className="text-lg font-medium"
                style={{ color: "var(--color-text-secondary)" }}
              >
                Your cart is empty
              </p>
            </div>
          )}

          {/* Cart items list */}
          <div className="space-y-4">
            {cart?.map((item, idx) => (
              <div
                key={idx}
                className="flex items-center gap-4 p-4 rounded-xl shadow-sm transition hover:shadow-md"
                style={{ backgroundColor: "var(--color-surface)" }}
              >
                {/* Image */}
                <img
                  src={item?.image?.[0]?.url}
                  alt={item.dishName}
                  className="w-24 h-24 object-cover rounded-lg"
                />

                {/* Middle content */}
                <div className="flex-1">
                  <h3
                    className="text-lg font-semibold"
                    style={{ color: "var(--color-text-primary)" }}
                  >
                    {item.dishName}
                  </h3>

                  <p
                    className="text-sm mt-1"
                    style={{ color: "var(--color-text-secondary)" }}
                  >
                    {item.cuisine} • {item.servingSize}
                  </p>

                  <p
                    className="text-xs mt-1"
                    style={{
                      color: item.availability
                        ? "var(--color-secondary)"
                        : "var(--color-accent)",
                    }}
                  >
                    {item.availability ? "Available" : "Currently unavailable"}
                  </p>

                  <p
                    className="text-lg font-bold mt-2"
                    style={{ color: "var(--color-primary)" }}
                  >
                    ₹{item.price}
                  </p>
                </div>

                {/* Right controls */}
                <div className="flex flex-col items-end gap-3">
                  {/* Quantity controls */}
                  <div className="flex items-center gap-2 border rounded-lg px-2 py-1">
                    <button
                      onClick={() => onDecrease(item._id)}
                      className="w-7 h-7 rounded-md text-lg font-bold"
                      style={{
                        backgroundColor: "var(--color-accent-soft)",
                        color: "var(--color-text-primary)",
                      }}
                      disabled={item.quantity == 0}
                    >
                      -
                    </button>

                    <span
                      className="font-semibold text-sm w-6 text-center"
                      style={{ color: "var(--color-text-primary)" }}
                    >
                      {item.quantity}
                    </span>

                    <button
                      onClick={() => onIncrease(item._id)}
                      className="w-7 h-7 rounded-md text-lg font-bold text-white"
                      style={{ backgroundColor: "var(--color-primary)" }}
                    >
                      +
                    </button>
                  </div>

                  {/* Remove button */}
                  <button
                    type="button"
                    onClick={() => onRemove(item._id)}
                    className="text-xs border px-2 py-1 rounded-lg bg-(--color-primary) text-(--color-background) font-medium"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
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
                {cart?.length} items in cart
              </span>
              <span className="text-lg font-semibold">₹{totalAmount()}</span>
            </div>

            {/* Right: View Cart Button */}
            <button
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
              Buy Anyone
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddToCartPage;
