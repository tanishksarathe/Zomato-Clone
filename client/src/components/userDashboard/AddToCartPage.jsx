import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const AddToCartPage = () => {
  const [cartItems, setCartItems] = useState([]);

  console.log("Cart Items : ", cartItems);

  const onRemove = (itemid) => {
    setCartItems((prev) => {
      const updtaed = prev.filter((i) => i._id !== itemid);
      localStorage.setItem("AddToCart", JSON.stringify(updtaed));
      return updtaed;
    });
  };

  const onDecrease = (item) => {
    const updateCart = cartItems.map((i) =>
      i._id === item._id ? { ...i, quantity: i.quantity - 1 } : i,
    );
    setCartItems(updateCart);
    localStorage.setItem("AddToCart", JSON.stringify(updateCart));
  };

  const onIncrease = (item) => {
    const updateCart = cartItems.map((i) =>
      i._id === item._id ? { ...i, quantity: i.quantity + 1 } : i,
    );
    setCartItems(updateCart);
    localStorage.setItem("AddToCart", JSON.stringify(updateCart));
  };

  useEffect(() => {
    const parsedLocalStorageData =
      JSON.parse(localStorage.getItem("AddToCart")) || [];
    setCartItems(parsedLocalStorageData);
  }, []);

  function totalAmount() {
    let total = 0;
    cartItems.forEach(
      (item) => (total = total + Number(item.price) * Number(item.quantity)),
    );
    return total;
  }

  console.log(totalAmount());

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
          {cartItems.length === 0 && (
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
            {cartItems.map((item, idx) => (
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
                      onClick={() => onDecrease(item)}
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
                      onClick={() => onIncrease(item)}
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
          <section className="bg-(--color-surface) flex justify-between items-center p-5 rounded-full px-10 my-5 border-t hover:shadow-2xs">
            <div>
              <p className="text-xl font-semibold text-(--color-text-primary)">
                Total Amount
              </p>
              <p className="text-xl font-semibold text-(--color-primary)">
                ₹{totalAmount()}
              </p>
            </div>

            <button
              // onClick={onCheckout}
              className="px-8 py-3 rounded-xl font-semibold text-white text-lg transition"
              style={{
                backgroundColor: "var(--color-primary)",
              }}
              onMouseOver={(e) =>
                (e.currentTarget.style.backgroundColor =
                  "var(--color-primary-hover)")
              }
              onMouseOut={(e) =>
                (e.currentTarget.style.backgroundColor = "var(--color-primary)")
              }
            >
              Buy Now
            </button>
          </section>
        </div>
      </div>
      {/* Footer Section Begins */}
    </>
  );
};

export default AddToCartPage;
