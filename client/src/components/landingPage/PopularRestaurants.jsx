import { Star, ArrowRight } from "lucide-react";

export default function PopularRestaurants() {
  const restaurants = [
    {
      name: "Bella Italia",
      cuisine: "Italian",
      time: "25–35 min",
      rating: "4.8",
      image:
        "https://images.unsplash.com/photo-1600891964599-f61ba0e24092?q=80&w=1200&auto=format&fit=crop",
    },
    {
      name: "Spice Garden",
      cuisine: "Indian",
      time: "30–40 min",
      rating: "4.7",
      image:
        "https://images.unsplash.com/photo-1589302168068-964664d93dc0?q=80&w=1200&auto=format&fit=crop",
    },
    {
      name: "Tokyo Bites",
      cuisine: "Japanese",
      time: "20–30 min",
      rating: "4.9",
      image:
        "https://images.unsplash.com/photo-1553621042-f6e147245754?q=80&w=1200&auto=format&fit=crop",
    },
    {
      name: "Burger Barn",
      cuisine: "American",
      time: "15–25 min",
      rating: "4.6",
      image:
        "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=1200&auto=format&fit=crop",
    },
    {
      name: "Dragon Wok",
      cuisine: "Chinese",
      time: "25–35 min",
      rating: "4.7",
      image:
        "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=1200&auto=format&fit=crop",
    },
    {
      name: "Mediterranean Grill",
      cuisine: "Mediterranean",
      time: "30–40 min",
      rating: "4.8",
      image:
        "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=1200&auto=format&fit=crop",
    },
  ];

  return (
    <section className="w-full px-6 py-16">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <p className="text-sm tracking-widest text-(--color-secondary) font-semibold">
              TOP PICKS
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-(--color-text-primary)">
              Popular Restaurants
            </h2>
          </div>

          <button className="flex items-center gap-2 text-(--color-primary) font-medium hover:underline">
            View All <ArrowRight size={16} />
          </button>
        </div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {restaurants.map((item, index) => (
            <div
              key={index}
              className="bg-(--color-surface) rounded-2xl shadow-md overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-xl animate-fadeInUp"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Image */}
              <div className="relative overflow-hidden">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-44 object-cover transition-transform duration-500 group-hover:scale-110 hover:scale-110"
                />

                {/* Rating badge */}
                <div className="absolute top-3 right-3 bg-white text-sm px-2 py-1 rounded-full flex items-center gap-1 shadow">
                  <Star
                    size={14}
                    className="text-(--color-secondary) fill-(--color-secondary)"
                  />
                  {item.rating}
                </div>
              </div>

              {/* Content */}
              <div className="p-5 space-y-3">
                <div>
                  <h3 className="font-semibold text-(--color-text-primary)">
                    {item.name}
                  </h3>
                  <p className="text-sm text-(--color-text-secondary)">
                    {item.cuisine} • {item.time}
                  </p>
                </div>

                <button className="w-full bg-(--color-accent-soft) hover:bg-(--color-primary) hover:text-white text-(--color-primary) font-medium py-2 rounded-lg transition">
                  Order Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
