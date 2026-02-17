import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import api from "../../config/API";
import { useCart } from "../../context/cartContext";
import { Trash2 } from "lucide-react";

const AddToCartPage = () => {
  const [myLocalCart, setMyLocalCart] = useState([]);

  const [cart, setCart] = useState([]);

  const [groupedArray, setGroupedArray] = useState([]);

  const { setBadge, setTotalAmt } = useCart();

  const fetchCartItems = async (list, localCart) => {
    try {
      const res = await api.get(`/public/cart-items/${list}`);

      console.log(res?.data?.data);

      const menuQuantity = localCart
        .flatMap((res) => res.existingItem)
        .reduce((acc, item) => {
          acc[item.menuid] = item.quantity;
          return acc;
        }, {});

      // now merge

      const mergedCart = res?.data?.data.map((item) => ({
        ...item,
        quantity: menuQuantity[item._id],
      }));

      setCart(mergedCart);

      setBadge(mergedCart.length);
    } catch (error) {
      console.log(error);
    }
  };

  const onRemove = (itemid, resid) => {
    const updateCart = myLocalCart.find((i) => i.resid === resid);

    updateCart.existingItem = updateCart.existingItem.filter(
      (item) => item.menuid !== itemid,
    );

    localStorage.setItem("AddToCart", JSON.stringify(myLocalCart));

    setMyLocalCart(myLocalCart);

    setCart((prev) => prev.filter((i) => i._id !== itemid));
  };

  const onDecrease = (itemid, resid) => {
    const updateCart = myLocalCart.find((i) => i.resid === resid);

    updateCart.existingItem = updateCart.existingItem.map((item) =>
      item.menuid === itemid && item.quantity >= 1
        ? { ...item, quantity: item.quantity - 1 }
        : item,
    );

    localStorage.setItem("AddToCart", JSON.stringify(myLocalCart));

    setMyLocalCart(myLocalCart);

    setCart((prev) =>
      prev.map((i) =>
        i._id === itemid ? { ...i, quantity: i.quantity - 1 } : i,
      ),
    );
  };

  const onIncrease = (itemid, resid) => {
    const updateCart = myLocalCart.find((i) => i.resid === resid);

    updateCart.existingItem = updateCart.existingItem.map((item) =>
      item.menuid === itemid
        ? { ...item, quantity: (item.quantity || 0) + 1 }
        : item,
    );

    localStorage.setItem("AddToCart", JSON.stringify(myLocalCart));

    setMyLocalCart(myLocalCart);

    setCart((prev) =>
      prev.map((i) =>
        i._id === itemid ? { ...i, quantity: i.quantity + 1 } : i,
      ),
    );
  };

  useEffect(() => {
    const parsedLocalStorageData =
      JSON.parse(localStorage.getItem("AddToCart")) || [];

    setMyLocalCart(parsedLocalStorageData);

    const list = parsedLocalStorageData
      ?.map((item) => item.existingItem.map((i) => i.menuid))
      .flat();

    fetchCartItems(list, parsedLocalStorageData);
  }, []);

  function totalAmount() {
    let total = 0;
    cart?.forEach(
      (item) => (total += Number(item.price) * Number(item.quantity)),
    );

    return total;
  }

  useEffect(() => {
    if (!cart.length) return;

    let a = totalAmount();
    setTotalAmt(a);

    const grouped = cart?.reduce((acc, item) => {
      const rid = item?.restaurantID;

      if (!acc[rid]) acc[rid] = []; // basically acc stores key while making objects

      acc[rid].push(item);
      return acc;
    }, {});

    console.log(grouped)

    setGroupedArray(Object.entries(grouped));
  }, [cart]);

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
          {groupedArray?.length === 0 && (
            <div
              className="text-center py-20 rounded-xl shadow-sm"
              style={{ backgroundColor: "var(--color-surface)" }}
            >
              <p
                className="text-lg font-medium"
                style={{ color: "var(--color-text-secondary)" }}
              >
                You don't have any cart...
              </p>
            </div>
          )}

          {/* Cart items list */}

          <div className="space-y-8">
            {groupedArray.map(([resid, items], index) => (
              <div
                key={resid}
                className="p-5 rounded-2xl shadow-md"
                style={{ backgroundColor: "var(--color-surface)" }}
              >
                {/* Cart heading */}
                <h2
                  className="text-xl font-bold mb-4"
                  style={{ color: "var(--color-text-primary)" }}
                >
                  Cart {index + 1}
                </h2>

                {/* Items of this restaurant */}
                <div className="space-y-4">
                  {items.map((item) => (
                    <div
                      key={item._id}
                      className="flex items-center gap-4 p-4 rounded-xl shadow-sm transition hover:shadow-md"
                      style={{ backgroundColor: "white" }}
                    >
                      {/* Image */}
                      <img
                        src={item?.image?.[0]?.url}
                        alt={item.dishName}
                        className="w-20 h-20 object-cover rounded-lg"
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
                          className="text-lg font-bold mt-2"
                          style={{ color: "var(--color-primary)" }}
                        >
                          ₹{item.price}
                        </p>
                      </div>

                      {/* Quantity controls */}
                      <div className="flex flex-col items-end gap-3">
                        <div className="flex items-center gap-2 border rounded-lg px-2 py-1">
                          <button
                            onClick={() =>
                              onDecrease(item._id, item.restaurantID)
                            }
                            className="w-7 h-7 rounded-md text-lg font-bold"
                            style={{
                              backgroundColor: "var(--color-accent-soft)",
                              color: "var(--color-text-primary)",
                            }}
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
                            onClick={() =>
                              onIncrease(item._id, item.restaurantID)
                            }
                            className="w-7 h-7 rounded-md text-lg font-bold text-white"
                            style={{ backgroundColor: "var(--color-primary)" }}
                          >
                            +
                          </button>
                        </div>

                        <button
                          type="button"
                          onClick={() => onRemove(item._id, item.restaurantID)}
                          className="text-xs px-2 py-1 rounded-lg font-medium"
                        >
                          <Trash2 color="#5A142B"/>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Restaurant total */}
                <div className="mt-4 flex justify-between items-center bg-(--color-primary) px-3 py-2 rounded-xl text-(--color-background) font-semibold text-lg">
                  Total: ₹
                  {items.reduce((sum, i) => sum + i.price * i.quantity, 0)}

                  <button className="bg-(--color-secondary) px-3 py-1 rounded-lg">Buy Now</button>
                </div>



              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default AddToCartPage;
