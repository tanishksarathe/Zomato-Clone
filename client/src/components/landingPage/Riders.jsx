import { Clock, ShieldCheck, ThumbsUp, Bike } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Riders = () => {

    const navigate = useNavigate();

  const stats = [
    {
      icon: <Clock size={20} />,
      title: "On-Time Delivery",
      desc: "98% deliveries on schedule",
    },
    {
      icon: <ShieldCheck size={20} />,
      title: "Verified Riders",
      desc: "Background-checked professionals",
    },
    {
      icon: <ThumbsUp size={20} />,
      title: "Top Rated",
      desc: "4.9★ average rider rating",
    },
  ];

  return (
    <section className="w-full px-6 py-20">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        {/* Left Content */}
        <div className="space-y-8 animate-fadeInUp">
          <div>
            <p className="text-sm tracking-widest text-(--color-secondary) font-semibold">
              OUR DELIVERY PARTNERS
            </p>
            <h2 className="text-4xl md:text-5xl font-bold text-(--color-text-primary) mt-3">
              Reliable Riders, Every Time
            </h2>
            <p className="text-(--color-text-secondary) mt-4 max-w-lg">
              Our delivery partners are the backbone of Grab My Meal. Trained,
              verified, and committed to getting your food to you fast and
              fresh — rain or shine.
            </p>
          </div>

          {/* Stats */}
          <div className="space-y-5">
            {stats.map((item, index) => (
              <div
                key={index}
                className="flex items-center gap-4 bg-(--color-surface) p-4 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 animate-fadeInUp"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-(--color-accent-soft) text-(--color-secondary)">
                  {item.icon}
                </div>
                <div>
                  <h4 className="font-semibold text-(--color-text-primary)">
                    {item.title}
                  </h4>
                  <p className="text-sm text-(--color-text-secondary)">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Card */}
        <div className="bg-(--color-surface) rounded-3xl shadow-lg p-10 text-center animate-fadeInUp">
          {/* Icon circle */}
          <div className="w-24 h-24 mx-auto flex items-center justify-center rounded-full bg-linear-to-br from-(--color-primary) to-(--color-accent) text-white shadow-md mb-6">
            <Bike size={36} />
          </div>

          <h3 className="text-2xl font-semibold text-(--color-text-primary) mb-3">
            Become a Rider
          </h3>
          <p className="text-(--color-text-secondary) mb-6 max-w-md mx-auto">
            Join our fleet and earn on your own schedule. Flexible hours,
            great pay.
          </p>

          <button 
          onClick={() => navigate("/register", { state: { role: "partner" } })} // params se state bhejna
          className="bg-(--color-secondary) hover:bg-(--color-secondary-hover) text-white px-8 py-3 rounded-xl font-semibold shadow-md transition-all duration-300 hover:scale-105">
            Apply Now
          </button>
        </div>
      </div>
    </section>
  );
}


export default Riders