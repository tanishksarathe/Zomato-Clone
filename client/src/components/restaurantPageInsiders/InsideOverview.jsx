import React from "react";
import DiscountCard from "../../miniComponents/DiscountCard";

const DUMMY_RESTAURANTS = [
  {
    id: 1,
    name: "Burger King",
    image:
      "https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=500&q=80",
    cuisines: ["Burgers", "American", "Fast Food"],
    rating: 4.2,
    deliveryTime: "25-30",
    priceForTwo: "₹400 for two",
    discount: "60% OFF up to ₹120",
  },
  {
    id: 2,
    name: "Pizza Hut",
    image:
      "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=500&q=80",
    cuisines: ["Pizzas", "Italian", "Pasta"],
    rating: 4.5,
    deliveryTime: "35-40",
    priceForTwo: "₹600 for two",
    discount: "FREE Delivery",
  },
];

const InsideOverview = ({ header }) => {
  
  // console.log("", header);
  
  return (
    <>
      <div className="flex gap-5 justify-between overflow-y-auto">
        <div className="w-[70%] h-full border pr-10"></div>
        <div className="w-[30%] h-180 flex flex-col gap-3">
          <div className="font-bold pl-5 py-2 text-2xl bg-linear-to-r from-(--color-text-primary) via-(--color-accent) to-(--color-secondary) bg-clip-text text-transparent">
            Today's Tasty Savings
          </div>

          {DUMMY_RESTAURANTS.map((res, idx) => (
            <DiscountCard key={idx} restaurant={res} />
          ))}
        </div>
      </div>
    </>
  );
};

export default InsideOverview;
