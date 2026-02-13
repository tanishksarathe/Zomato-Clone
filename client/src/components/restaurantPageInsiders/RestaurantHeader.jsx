import React, { useEffect, useRef, useState } from "react";
import {
  MapPin,
  Share2,
  MessageSquare,
  CalendarDays,
  Phone,
  Star,
  SunMedium,
} from "lucide-react";
import InsideOverview from "./InsideOverview";
import InsideReview from "./InsideReview";
import InsideMenu from "./InsideMenu";
import InsidePhotos from "./InsidePhotos";
import InsideBookATable from "./InsideBookATable";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../../config/API";

const RestaurantHeader = () => {
  const [toOpen, setToOpen] = useState("overview");

  const [header, setHeader] = useState();

  const navigate = useNavigate();

  const { id } = useParams();

  const fetchDetails = async () => {
    try {
      const res = await api.get(`/public/restaurant-solo/${id}`);
      setHeader(res?.data?.data);
    } catch (error) {
      console.log(error);
      toast.error(
        error?.response?.data?.message || "Error while fetching menu details..",
      );
    }
  };

  const handleShow = (page) => {
    page = page?.toLowerCase().replace(/\s/g, "");
    switch (page) {
      case "overview":
        return <InsideOverview header={header}/>;
      case "reviews":
        return <InsideReview />;
      case "menu":
        return <InsideMenu menus={header?.menu} />;
      case "photos":
        return <InsidePhotos header={header}/>;
      case "bookatable":
        return <InsideBookATable />;

      default:
        return <InsideOverview header={header} />;
    }
  };

  useEffect(() => {
    fetchDetails();
  }, [id]);

  const avgPrice = (header) => {
    return (
      header?.menu?.reduce((sum, item) => sum + Number(item.price), 0) /
      header?.menu?.length
    );
  };

  console.log("Header is here : ",header)

  return (
    <>
      <div className="w-full h-450 bg-(--color-background) text-(--color-text-primary)">
        {/* Top Section */}
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row md:justify-between gap-6">
            {/* Left Info */}
            <div>
              <h1 className="text-3xl font-semibold">
                {header?.restaurantName}
              </h1>
              <p className="text-(--color-text-secondary) mt-1">
                {header?.cuisine}
              </p>
              <p className="text-sm text-(--color-text-secondary)">
                {header?.address}, {header?.city}
              </p>

              <div className="flex items-center gap-3 mt-3 text-sm flex-wrap">
                <span className="bg-(--color-accent-soft) text-(--color-primary) px-3 py-1 rounded-full">
                  {new Date().getHours() <
                    Number(header?.timing?.open.split(":")[0]) ||
                  new Date().getHours() >
                    Number(header?.timing?.close.split(":")[0])
                    ? "Close"
                    : "Open"}
                </span>
                <span>
                  {header?.timing?.open} - {header?.timing?.close}
                </span>
                <span>|</span>
                <span>{String(avgPrice(header))}</span>
                <span>|</span>
                <span className="flex items-center gap-1">
                  <Phone size={14} /> {header?.phone}
                </span>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 mt-4 flex-wrap">
                <a
                href={`https://www.google.com/maps/dir/?api=1&destination=${header?.geolocation?.lat},${header?.geolocation?.lon}`}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-(--color-surface) hover:bg-(--color-accent-soft) transition"
                target="_blank"
                >
                  <MapPin size={16} /> Direction
                </a>
                <button
                  type="button"
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-(--color-surface) hover:bg-(--color-accent-soft) transition"
                >
                  <Share2 size={16} /> Share
                </button>
                <button
                  type="button"
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-(--color-surface) hover:bg-(--color-accent-soft) transition"
                >
                  <MessageSquare size={16} /> Reviews
                </button>
                <button
                  type="button"
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-(--color-primary) text-white hover:bg-(--color-primary-hover) transition"
                >
                  <CalendarDays size={16} /> Book a table
                </button>
              </div>
            </div>

            {/* Ratings */}

            {/* <div className="flex gap-6 items-start">
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
            </div> */}
          </div>

          {/* Image Gallery */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-6">
            {/* Main Image */}
            <div className="md:col-span-2 h-75 overflow-hidden rounded-xl">
              <img
                src={header?.restaurantImages[0]?.url}
                alt="Restaurant"
                className="w-full h-full object-cover hover:scale-105 transition duration-500"
              />
            </div>

            {/* Side Images */}

            <div className="grid grid-cols-1 gap-3">
              <div className="h-36.25 overflow-hidden rounded-xl">
                <img
                  src={header?.restaurantImages[1]?.url}
                  alt="Food"
                  className="w-full h-full object-cover hover:scale-105 transition duration-500"
                />
              </div>
              <div className="h-36.25 overflow-hidden rounded-xl relative" onClick={() => setToOpen("photos")}>
                <img
                  src={header?.restaurantImages[2]?.url}
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
