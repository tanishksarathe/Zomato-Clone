import { Clock, Heart, Star, Tag } from "lucide-react";

const DiscountCard = ({ restaurant }) => {
  return (
    <div className="group relative bg-white rounded-3xl transition-all duration-500 hover:-translate-y-2">
      {/* Image Section */}
      <div className="relative aspect-4/3 overflow-hidden rounded-3xl">
        <img 
          className="w-full h-full object-cover transition-transform duration-700 scale-105 group-hover:scale-110" 
          src={restaurant.image} 
          alt={restaurant.name} 
        />
        
        {/* Modern Glassmorphism Offer Badge */}
        {restaurant.discount && (
          <div className="absolute bottom-3 left-3 right-3 backdrop-blur-md bg-white/80 py-2 px-3 rounded-2xl shadow-sm border border-white/20">
            <div className="flex items-center gap-2">
              <Tag size={14} className="text-blue-600 fill-blue-600" />
              <span className="text-sm font-black text-gray-800 tracking-tight">
                {restaurant.discount}
              </span>
            </div>
          </div>
        )}

        {/* Favorite Button */}
        <button className="absolute top-4 right-4 p-2.5 rounded-full bg-white/90 shadow-md hover:bg-white transition-colors">
          <Heart size={18} className="text-gray-400 hover:text-red-500 transition-colors" />
        </button>
      </div>

      {/* Content Section */}
      <div className="pt-4 pb-2 px-1">
        <div className="flex justify-between items-center mb-1">
          <h3 className="text-xl font-bold text-gray-900 tracking-tight group-hover:text-blue-600 transition-colors">
            {restaurant.name}
          </h3>
          <div className="flex items-center gap-1 font-semibold text-gray-700 bg-gray-100 px-2 py-1 rounded-lg text-sm">
            <Star size={14} className="fill-yellow-400 text-yellow-400" />
            {restaurant.rating}
          </div>
        </div>

        <div className="flex items-center gap-2 text-gray-500 text-sm mb-3">
          <span className="truncate">{restaurant.cuisines.slice(0, 2).join(' • ')}</span>
          <span>•</span>
          <span className="font-medium text-gray-800">{restaurant.priceForTwo}</span>
        </div>

        {/* Dynamic Status Pill */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 bg-blue-50 text-blue-700 px-3 py-1.5 rounded-full text-xs font-bold">
            <Clock size={14} />
            {restaurant.deliveryTime} MINS
          </div>
          <span className="text-[10px] font-black text-gray-300 uppercase tracking-widest">Free Delivery</span>
        </div>
      </div>
    </div>
  );
};

export default DiscountCard