import { Store, UtensilsCrossed, Bike } from "lucide-react";

export default function HowItWorks() {
  const steps = [
    {
      icon: <Store size={28} />,
      title: "Choose a Restaurant",
      desc: "Browse through hundreds of restaurants and pick your favorite one.",
    },
    {
      icon: <UtensilsCrossed size={28} />,
      title: "Select Your Meal",
      desc: "Explore the menu and customize your order to your liking.",
    },
    {
      icon: <Bike size={28} />,
      title: "Fast Delivery",
      desc: "Our riders pick up your order and deliver it fresh to your door.",
    },
  ];

  return (
    <section className="w-full px-6 py-20">
      <div className="max-w-6xl mx-auto text-center">
        {/* Heading */}
        <div className="mb-16 animate-fadeInUp">
          <p className="text-sm tracking-widest text-(--color-secondary) font-semibold">
            SIMPLE PROCESS
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-(--color-text-primary) mt-3">
            How It Works
          </h2>
          <p className="text-(--color-text-secondary) mt-4 max-w-2xl mx-auto">
            Getting your favorite food is easier than ever — just three simple steps.
          </p>
        </div>

        {/* Steps */}
        <div className="relative grid md:grid-cols-3 gap-10 items-start">
          {/* Connecting line (desktop) */}
          <div className="hidden md:block absolute top-10 left-1/6 right-1/6 h-0.5 bg-linear-to-r from-(--color-primary) to-(--color-secondary)" />

          {steps.map((step, index) => (
            <div
              key={index}
              className="relative flex flex-col items-center text-center space-y-4 animate-fadeInUp"
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              {/* Icon */}
              <div className="w-20 h-20 flex items-center justify-center rounded-2xl bg-linear-to-br from-(--color-primary) to-(--color-accent) text-white shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-xl">
                {step.icon}
              </div>

              {/* Title */}
              <h3 className="text-xl font-semibold text-(--color-text-primary)">
                {step.title}
              </h3>

              {/* Description */}
              <p className="text-(--color-text-secondary) max-w-xs">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

    
    </section>
  );
}
