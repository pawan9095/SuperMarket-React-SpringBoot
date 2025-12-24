import { ShoppingCart, Star, Heart } from "lucide-react";
import { useState } from "react";

export default function ProductCard({ product }) {
  const [isLiked, setIsLiked] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="bg-white rounded-2xl shadow-sm hover:shadow-xl border border-gray-100 overflow-hidden transition-all duration-300 hover:-translate-y-2"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Product Image */}
      <div className="relative overflow-hidden h-64 bg-gradient-to-br from-gray-50 to-gray-100">
        <img
          src={product.image}
          alt={product.name}
          className={`w-full h-full object-cover transition-transform duration-500 ${
            isHovered ? "scale-110" : "scale-100"
          }`}
        />
        
        {/* Badges */}
        <div className="absolute top-4 left-4">
          {product.isNew && (
            <span className="px-3 py-1 bg-green-500 text-white text-xs font-medium rounded-full">
              NEW
            </span>
          )}
          {product.discount && (
            <span className="ml-2 px-3 py-1 bg-red-500 text-white text-xs font-medium rounded-full">
              -{product.discount}%
            </span>
          )}
        </div>
        
        {/* Wishlist Button */}
        <button
          onClick={() => setIsLiked(!isLiked)}
          className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-md hover:shadow-lg transition-all"
        >
          <Heart 
            className={`w-5 h-5 transition-colors ${
              isLiked ? "fill-red-500 text-red-500" : "text-gray-400"
            }`}
          />
        </button>
        
        {/* Quick View */}
        {isHovered && (
          <div className="absolute bottom-0 left-0 right-0 bg-black/70 text-white p-4 transform translate-y-0 transition-transform duration-300">
            <button className="w-full py-2 bg-white text-gray-900 font-medium rounded-lg hover:bg-gray-100">
              Quick View
            </button>
          </div>
        )}
      </div>
      
      {/* Product Info */}
      <div className="p-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-gray-500">{product.category}</span>
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
            <span className="text-sm font-medium">{product.rating}</span>
          </div>
        </div>
        
        <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 h-12">
          {product.name}
        </h3>
        
        <div className="flex items-center justify-between mt-4">
          <div>
            <div className="text-2xl font-bold text-gray-900">${product.price}</div>
            {product.originalPrice && (
              <div className="text-sm text-gray-400 line-through">${product.originalPrice}</div>
            )}
          </div>
          
          <button className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all hover:scale-105">
            <ShoppingCart className="w-4 h-4" />
            <span className="hidden sm:inline">Add</span>
          </button>
        </div>
      </div>
    </div>
  );
}