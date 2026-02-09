import React, { useState } from "react";
import {
  MapPin,
  Share2,
  MessageSquare,
  CalendarDays,
  Phone,
  Star,
} from "lucide-react";
import InsideOverview from "./InsideOverview";
import InsideReview from "./InsideReview";
import InsideMenu from "./InsideMenu";
import InsidePhotos from "./InsidePhotos";
import InsideBookATable from "./InsideBookATable";

const RestaurantHeader = () => {
  const [toOpen, setToOpen] = useState();

  const handleShow = (page) => {
    page = page?.toLowerCase().replace(/\s/g, "");
    switch (page) {
      case "overview":
        return <InsideOverview />;
      case "reviews":
        return <InsideReview />;
      case "menu":
        return <InsideMenu />;
      case "photos":
        return <InsidePhotos />;
      case "bookatable":
        return <InsideBookATable />;

      default:
        return <InsideOverview />;
    }
  };

  const restaurant = {
    name: "BlinQ - Premium Sky Cafe",
    cuisines: "Chinese, Continental, North Indian",
    address: "17, E-2, Arera Colony, Bhopal",
    status: "Open now",
    timing: "3pm – 11:45pm (Today)",
    price: "₹1,000 for two",
    phone: "+91 9009019143",
    rating: 4.2,
    diningReviews: 204,
    deliveryReviews: 0,
    images: [
      "https://images.unsplash.com/photo-1555396273-367ea4eb4db5",
      "https://images.unsplash.com/photo-1600891964599-f61ba0e24092",
      "https://images.unsplash.com/photo-1552566626-52f8b828add9",
      "https://images.unsplash.com/photo-1546069901-ba9599a7e63c",
    ],
  };

  return (
    <>
      <div className="w-full bg-(--color-background) text-(--color-text-primary)">
        {/* Top Section */}
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row md:justify-between gap-6">
            {/* Left Info */}
            <div>
              <h1 className="text-3xl font-semibold">{restaurant.name}</h1>
              <p className="text-(--color-text-secondary) mt-1">
                {restaurant.cuisines}
              </p>
              <p className="text-sm text-(--color-text-secondary)">
                {restaurant.address}
              </p>

              <div className="flex items-center gap-3 mt-3 text-sm flex-wrap">
                <span className="bg-(--color-accent-soft) text-(--color-primary) px-3 py-1 rounded-full">
                  {restaurant.status}
                </span>
                <span>{restaurant.timing}</span>
                <span>|</span>
                <span>{restaurant.price}</span>
                <span>|</span>
                <span className="flex items-center gap-1">
                  <Phone size={14} /> {restaurant.phone}
                </span>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 mt-4 flex-wrap">
                <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-(--color-surface) hover:bg-(--color-accent-soft) transition">
                  <MapPin size={16} /> Direction
                </button>
                <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-(--color-surface) hover:bg-(--color-accent-soft) transition">
                  <Share2 size={16} /> Share
                </button>
                <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-(--color-surface) hover:bg-(--color-accent-soft) transition">
                  <MessageSquare size={16} /> Reviews
                </button>
                <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-(--color-primary) text-white hover:bg-(--color-primary-hover) transition">
                  <CalendarDays size={16} /> Book a table
                </button>
              </div>
            </div>

            {/* Ratings */}
            <div className="flex gap-6 items-start">
              <div className="text-center">
                <div className="bg-green-600 text-white px-3 py-1 rounded-md flex items-center gap-1 justify-center">
                  <Star size={14} /> {restaurant.rating}
                </div>
                <p className="text-sm mt-1">
                  {restaurant.diningReviews} Dining Ratings
                </p>
              </div>

              <div className="text-center">
                <div className="bg-gray-200 text-gray-600 px-3 py-1 rounded-md">
                  -
                </div>
                <p className="text-sm mt-1">
                  {restaurant.deliveryReviews} Delivery Ratings
                </p>
              </div>
            </div>
          </div>

          {/* Image Gallery */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-6">
            {/* Main Image */}
            <div className="md:col-span-2 h-75 overflow-hidden rounded-xl">
              <img
                src={restaurant.images[0]}
                alt="Restaurant"
                className="w-full h-full object-cover hover:scale-105 transition duration-500"
              />
            </div>

            {/* Side Images */}
            <div className="grid grid-cols-1 gap-3">
              <div className="h-36.25 overflow-hidden rounded-xl">
                <img
                  src={restaurant.images[1]}
                  alt="Food"
                  className="w-full h-full object-cover hover:scale-105 transition duration-500"
                />
              </div>
              <div className="h-36.25 overflow-hidden rounded-xl relative">
                <img
                  src={restaurant.images[2]}
                  alt="Food"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center text-white font-semibold text-lg">
                  View Gallery
                </div>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-6 mt-6 border-b border-(--color-accent-soft)">
            {["Overview", "Reviews", "Photos", "Menu", "Book a Table"].map(
              (tab, i) => (
                <button
                  onClick={() => setToOpen(tab)}
                  key={i}
                  className={`pb-3 text-sm font-medium transition-all ${`${tab === toOpen ? "border-b-2 border-(--color-primary)" : ""} text-(--color-primary) hover:text-(--color-primary)`}`}
                >
                  {tab}
                </button>
              ),
            )}
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-4 py-6">{handleShow(toOpen)}</div>
      </div>
    </>
  );
};

export default RestaurantHeader;
