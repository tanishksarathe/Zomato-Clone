import { ArrowRight } from "lucide-react";
import { FaHamburger } from "react-icons/fa";

const CallToAction = () => {
  return (
    <section className="w-full px-6 py-16">
      <div className="max-w-6xl mx-auto">
        <div className="relative rounded-3xl overflow-hidden bg-(--color-text-primary) text-white px-8 py-16 text-center shadow-lg animate-fadeInUp">
          
          {/* Decorative circles */}
          <div className="absolute -bottom-16 -left-16 w-40 h-40 bg-white/10 rounded-full" />
          <div className="absolute -top-16 -right-16 w-48 h-48 bg-white/10 rounded-full" />

          {/* Content */}
          <div className="relative z-10">
            <div className="flex justify-center mb-4 text-3xl">
              <FaHamburger />
            </div>

            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              Hungry? Order Your Favorite Meal Now.
            </h2>

            <p className="text-white/90 max-w-2xl mx-auto mb-8">
              Thousands of restaurants are waiting for you. Fast, fresh, and
              delivered with care.
            </p>

            <button className="inline-flex items-center gap-2 bg-(--color-secondary) hover:bg-(--color-secondary-hover) text-white font-semibold px-8 py-3 rounded-xl shadow-md transition-all duration-300 hover:scale-105">
              Get Started
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </div>

    </section>
  );
}

export default CallToAction