import { Star, MapPin, Clock, Phone, ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import { FaGripfire } from "react-icons/fa6";
import "./pages.css";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../config/API";

const RestaurantPage = () => {
  const navigate = useNavigate();

  const [restaurant, setRestaurant] = useState([]);

  const [loading, setLoading] = useState(false);

  const fetchAllRestaurants = async () => {
    setLoading(true);
    try {
      const res = await api.get("/public/all-restaurants");

      setRestaurant(res?.data?.data);
    } catch (error) {
      console.log(error);
      toast.error(
        error?.response?.data?.message || "Error while Fetching Restaurants",
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllRestaurants();
  }, []);

  console.log("List of all Restaurants : ", restaurant);

  return (
    <section
      className="w-full px-15 min-h-screen py-16"
      style={{ backgroundColor: "var(--color-background)" }}
    >
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Header Section */}
        <div className="grid md:grid-cols-2 gap-10 items-center">
          {/* Left */}
          <div className="space-y-6 animate-fadeInUp">
            <div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium"
              style={{
                backgroundColor: "var(--color-accent-soft)",
                color: "var(--color-primary)",
              }}
            >
              <span className="animate-pulse">
                <FaGripfire />
              </span>
              Top Restaurant
            </div>

            <h1
              className="text-4xl flex flex-col md:text-5xl font-extrabold"
              style={{ color: "var(--color-text-primary)" }}
            > <span className="text-(--color-secondary) text-sm font-normal ml-1">{restaurant[2]?.owner}'s</span>
              {restaurant[2]?.restaurantName}
            </h1>

            <p
              className="text-lg max-w-lg"
              style={{ color: "var(--color-text-secondary)" }}
            >
              {restaurant[2]?.description.slice(0, 100)}....
            </p>

            {/* Info Row */}
            <div className="flex flex-wrap gap-6">
              {/* <div className="flex items-center gap-2">
                <Star
                  size={18}
                  className="text-(--color-secondary) fill-(--color-secondary)"
                />
                <span>{restaurant.rating}</span>
              </div>  */}

              {/* <div className="flex items-center gap-2">
                <Clock size={18} />
                <span>{restaurant.preperationTime}</span>
              </div> */}

              {/* <div className="flex items-center gap-2">
                <MapPin size={18} />
                <span>{restaurant.geolocation}</span>
              </div> */}

              <div className="flex text-blue-800 items-center gap-2">
                <Phone size={18} />
                <span>{restaurant[2]?.phone}</span>
              </div>
            </div>

            {/* CTA */}
            <button
            onClick={() => navigate('/restaurant-header')}
              className="flex items-center gap-2 px-6 py-3 rounded-xl font-semibold shadow-md transition hover:scale-105"
              style={{
                backgroundColor: "var(--color-primary)",
                color: "white",
              }}
            >
              View Menu
              <ArrowRight size={18} />
            </button>
          </div>

          {/* Right Image */}
          <div className="animate-float">
            <div
              className="rounded-3xl p-6 shadow-lg"
              style={{ backgroundColor: "var(--color-surface)" }}
            >
              <img
                src={restaurant[2]?.photo?.url}
                alt={restaurant[2]?.restaurantName}
                className="w-full h-80 object-cover rounded-2xl"
              />
            </div>
          </div>
        </div>

        {/* CTA Card for restaurant owners */}
        <div
          className="rounded-3xl p-10 text-center shadow-lg"
          style={{
            background:
              "linear-gradient(90deg, var(--color-primary), var(--color-accent))",
            color: "white",
          }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Own a Restaurant?
          </h2>
          <p className="max-w-2xl mx-auto mb-8 text-white/90">
            Join Grab My Meal and start receiving orders from thousands of
            hungry customers. Fast onboarding, secure payments, and full
            support.
          </p>

          <button
            onClick={() =>
              navigate("/register", { state: { role: "manager" } })
            }
            className="inline-flex items-center gap-2 px-8 py-3 rounded-xl font-semibold shadow-md transition hover:scale-105"
            style={{
              backgroundColor: "var(--color-secondary)",
              color: "white",
            }}
          >
            Register Your Restaurant
            <ArrowRight size={18} />
          </button>
        </div>

        {restaurant.map((rest, idx) => (
          <div key={idx} className="grid md:grid-cols-2 transition-all delay-100 rounded-2xl pb-5 px-5 gap-10 items-center hover:shadow-2xl">
            {/* Left */}
            <div className="space-y-6 animate-fadeInUp">

              <h1
                className="text-4xl flex flex-col md:text-5xl font-extrabold"
                style={{ color: "var(--color-text-primary)" }}
              >
                <span className="text-(--color-secondary) text-sm font-normal ml-1">{rest?.owner}'s</span>
                {rest.restaurantName}
              </h1>

              <p
              className="text-lg max-w-lg"
              style={{ color: "var(--color-text-secondary)" }}
            >
              {rest?.description.slice(0, 100)}....
            </p>
              {/* Info Row */}
              <div className="flex flex-wrap gap-6">
                {/* <div className="flex items-center gap-2">
                <Star
                  size={18}
                  className="text-(--color-secondary) fill-(--color-secondary)"
                />
                <span>{rest.rating}</span>
              </div>  */}

                {/* <div className="flex items-center gap-2">
                <Clock size={18} />
                <span>{rest.preperationTime}</span>
              </div> */}

                {/* <div className="flex items-center gap-2">
                <MapPin size={18} />
                <span>{rest.geolocation}</span>
              </div> */}

                <div className="flex text-blue-800 items-center gap-2">
                  <Phone size={18} />
                  <span>{rest.phone}</span>
                </div>
              </div>

              {/* CTA */}
              <button
              onClick={()=> navigate(`/restaurant-header/${rest._id}`)}
                className="flex items-center gap-2 px-6 py-3 rounded-xl font-semibold shadow-md transition hover:scale-105"
                style={{
                  backgroundColor: "var(--color-primary)",
                  color: "white",
                }}
              >
                View Menu
                <ArrowRight size={18} />
              </button>
            </div>

            {/* Right Image */}
            <div className="animate-float flex justify-center">
              <div
                className="rounded-3xl w-fit p-6 shadow-lg"
                style={{ backgroundColor: "var(--color-surface)" }}
              >
                <img
                  src={rest?.photo?.url}
                  alt={rest?.restaurantName}
                  className="w-80 h-50 object-cover rounded-2xl"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default RestaurantPage;
