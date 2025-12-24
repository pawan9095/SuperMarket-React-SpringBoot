import { Heart, ShoppingBag, Star, X } from "lucide-react";
import { useState } from "react";
import ProfileCard from "../ProfileCard";

export default function Wishlist({ user }) {
  const [wishlistItems, setWishlistItems] = useState([
    { id: 1, name: "Wireless Headphones", price: "$129.99", rating: 4.5, image: "🎧", inStock: true },
    { id: 2, name: "Smart Watch", price: "$249.99", rating: 4.8, image: "⌚", inStock: true },
    { id: 3, name: "Laptop Stand", price: "$49.99", rating: 4.2, image: "💻", inStock: false },
    { id: 4, name: "Coffee Maker", price: "$89.99", rating: 4.7, image: "☕", inStock: true },
  ]);

  const removeFromWishlist = (id) => {
    setWishlistItems(wishlistItems.filter(item => item.id !== id));
  };

  const moveAllToCart = () => {
    console.log("Moving all to cart");
    // Add cart logic here
  };

  return (
    <div className="space-y-6">
      <ProfileCard 
        title={`My Wishlist (${wishlistItems.length})`}
        action="Move All to Cart"
        onClickAction={moveAllToCart}
      >
        {wishlistItems.length > 0 ? (
          <div className="grid md:grid-cols-2 gap-4">
            {wishlistItems.map((item) => (
              <div 
                key={item.id}
                className="border border-gray-200 rounded-xl p-4 hover:border-blue-300 transition-all"
              >
                <div className="flex gap-4">
                  <div className="w-20 h-20 bg-gray-100 rounded-lg flex items-center justify-center text-2xl">
                    {item.image}
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-semibold text-gray-900">{item.name}</h4>
                        <div className="flex items-center gap-1 mt-1">
                          {[...Array(5)].map((_, i) => (
                            <Star 
                              key={i}
                              className={`w-3 h-3 ${
                                i < Math.floor(item.rating) 
                                  ? "text-amber-400 fill-amber-400" 
                                  : "text-gray-300"
                              }`}
                            />
                          ))}
                          <span className="text-sm text-gray-500 ml-1">{item.rating}</span>
                        </div>
                      </div>
                      <button
                        onClick={() => removeFromWishlist(item.id)}
                        className="p-1 text-gray-400 hover:text-red-500"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                    
                    <div className="flex items-center justify-between mt-4">
                      <div>
                        <div className="text-xl font-bold text-gray-900">{item.price}</div>
                        <span className={`text-sm ${
                          item.inStock ? "text-green-600" : "text-red-600"
                        }`}>
                          {item.inStock ? "In Stock" : "Out of Stock"}
                        </span>
                      </div>
                      
                      <div className="flex gap-2">
                        <button className="p-2 text-gray-600 hover:text-blue-600">
                          <Heart className="w-5 h-5 fill-current" />
                        </button>
                        <button 
                          disabled={!item.inStock}
                          className={`p-2 rounded-lg ${
                            item.inStock
                              ? "bg-blue-600 text-white hover:bg-blue-700"
                              : "bg-gray-100 text-gray-400 cursor-not-allowed"
                          }`}
                        >
                          <ShoppingBag className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Your wishlist is empty</h3>
            <p className="text-gray-500 mb-6">Save items you love for later</p>
            <button className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl hover:shadow-lg">
              Start Shopping
            </button>
          </div>
        )}
      </ProfileCard>

      {/* Recently Viewed */}
      {wishlistItems.length > 0 && (
        <ProfileCard title="Recently Viewed">
          <div className="overflow-x-auto">
            <div className="flex gap-4 pb-4">
              {[
                { id: 1, name: "Gaming Mouse", price: "$59.99", image: "🖱️" },
                { id: 2, name: "Desk Lamp", price: "$34.99", image: "💡" },
                { id: 3, name: "Backpack", price: "$79.99", image: "🎒" },
                { id: 4, name: "Water Bottle", price: "$24.99", image: "💧" },
              ].map((item) => (
                <div key={item.id} className="flex-shrink-0 w-40">
                  <div className="bg-gray-50 rounded-xl p-4 text-center">
                    <div className="text-3xl mb-3">{item.image}</div>
                    <h4 className="font-medium text-gray-900 mb-1">{item.name}</h4>
                    <div className="text-gray-700 font-semibold mb-2">{item.price}</div>
                    <button className="w-full py-2 bg-white border border-gray-300 rounded-lg hover:border-blue-400 text-sm">
                      Add to Wishlist
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </ProfileCard>
      )}
    </div>
  );
}