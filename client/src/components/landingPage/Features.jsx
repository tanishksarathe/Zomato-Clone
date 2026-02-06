import {
  Zap,
  ShieldCheck,
  Store,
  MapPin,
  Package,
  Headphones,
} from "lucide-react";

const Features = () => {
  const features = [
    {
      icon: <Zap size={22} />,
      title: "Fast Delivery",
      desc: "Get your food delivered in 30 minutes or less with our optimized delivery network.",
    },
    {
      icon: <ShieldCheck size={22} />,
      title: "Secure Payments",
      desc: "Multiple payment options with bank-level encryption to keep your transactions safe.",
    },
    {
      icon: <Store size={22} />,
      title: "Multiple Restaurants",
      desc: "Choose from hundreds of restaurants offering diverse cuisines near you.",
    },
    {
      icon: <MapPin size={22} />,
      title: "Live Order Tracking",
      desc: "Track your order in real-time from the kitchen to your doorstep.",
    },
    {
      icon: <Package size={22} />,
      title: "Hygienic Packaging",
      desc: "All meals are packed with care using food-safe, tamper-proof packaging.",
    },
    {
      icon: <Headphones size={22} />,
      title: "24/7 Support",
      desc: "Our dedicated team is always ready to help you with any questions or issues.",
    },
  ];

  return (
    <section className="w-full py-20 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-14 animate-fadeInUp">
          <p className="text-sm tracking-widest text-(--color-secondary) font-semibold">
            WHY CHOOSE US
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-(--color-text-primary) mt-3">
            Everything You Need for a Great Meal
          </h2>
          <p className="text-(--color-text-secondary) mt-4 max-w-2xl mx-auto">
            We go beyond just delivery — experience convenience, safety, and
            quality at every step.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((item, index) => (
            <div
              key={index}
              className="bg-(--color-surface) rounded-2xl p-6 shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-2 animate-fadeInUp"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Icon */}
              <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-linear-to-br from-(--color-primary) to-(--color-accent) text-white mb-4">
                {item.icon}
              </div>

              {/* Title */}
              <h3 className="text-lg font-semibold text-(--color-text-primary) mb-2">
                {item.title}
              </h3>

              {/* Description */}
              <p className="text-sm text-(--color-text-secondary) leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Features;