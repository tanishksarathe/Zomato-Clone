import { Search, ArrowRight } from "lucide-react";
import { FaFire } from "react-icons/fa";

export default function Hero() {
  return (
    <section className="w-full min-h-[80vh] flex items-center justify-center px-6 py-16">
      <div className="max-w-7xl w-full grid md:grid-cols-2 gap-10 items-center">
        {/* Left Content */}
        <div className="space-y-6 animate-fadeInUp">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-(--color-accent-soft) text-(--color-primary) px-4 py-2 rounded-full text-sm font-medium">
            <FaFire className="text-(--color-secondary)" />
            #1 Food Delivery Platform
          </div>

          {/* Heading */}
          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight text-(--color-text-primary)">
            Delicious Food,
            <br />
            <span className="text-(--color-primary)">
              Delivered <span className="text-(--color-text-primary)">to Your</span>
            </span>
            <br />
            <span className="text-(--color-secondary)">
              Doorstep
            </span>
          </h1>

          {/* Description */}
          <p className="text-(--color-text-secondary) text-lg max-w-lg">
            Explore hundreds of restaurants, order your favorite meals, and
            enjoy fast delivery with real-time tracking. Your next meal is just
            a tap away.
          </p>

          {/* Search + CTA */}
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
            <div className="flex items-center gap-2 bg-(--color-surface) border border-(--color-accent-soft) rounded-xl px-4 py-3 w-full sm:w-85 shadow-sm">
              <Search
                size={18}
                className="text-(--color-text-secondary)"
              />
              <input
                type="text"
                placeholder="Search restaurants or dishes..."
                className="bg-transparent outline-none w-full text-sm text-(--color-text-primary) placeholder:text-(--color-text-secondary)"
              />
            </div>

            <button className="flex items-center gap-2 bg-(--color-primary) hover:bg-(--color-primary-hover) text-white px-6 py-3 rounded-xl font-semibold shadow-md transition-all duration-300 hover:scale-105">
              Order Now
              <ArrowRight size={18} />
            </button>
          </div>

          {/* Stats */}
          <div className="flex gap-10 pt-4">
            <div>
              <p className="text-2xl font-bold text-(--color-text-primary)">
                500+
              </p>
              <p className="text-sm text-(--color-text-secondary)">
                Restaurants
              </p>
            </div>
            <div>
              <p className="text-2xl font-bold text-(--color-text-primary)">
                50K+
              </p>
              <p className="text-sm text-(--color-text-secondary)">
                Happy Users
              </p>
            </div>
            <div>
              <p className="text-2xl font-bold text-(--color-text-primary)">
                4.9
              </p>
              <p className="text-sm text-(--color-text-secondary)">
                App Rating
              </p>
            </div>
          </div>
        </div>

        {/* Right Image */}
        <div className="relative animate-float">
          <div className="bg-(--color-surface) rounded-3xl p-6 shadow-lg">
            <img
              src="/hero-food.png"
              alt="Food"
              className="w-full h-auto object-contain"
            />
          </div>
        </div>
      </div>

      {/* Animations */}

    </section>
  );
}
