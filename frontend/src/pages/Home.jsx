import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import ProductCard from "../components/ProductCard";
import HeroSection from "../components/HeroSection";
import { 
  Sparkles, 
  TrendingUp, 
  Clock,
  Star,
  Tag,
  ShoppingBag,
  ChevronLeft,
  ChevronRight
} from "lucide-react";

export default function Home() {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [trendingProducts, setTrendingProducts] = useState([]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  // Categories for navigation
  const categories = [
    { id: "all", name: "All", icon: "🌟" },
    { id: "fresh", name: "Fresh", icon: "🥬" },
    { id: "bestsellers", name: "Best Sellers", icon: "🔥" },
    { id: "mobiles", name: "Mobiles", icon: "📱" },
    { id: "deals", name: "Deals", icon: "🎯" },
    { id: "electronics", name: "Electronics", icon: "💻" },
    { id: "home", name: "Home & Kitchen", icon: "🏠" },
    { id: "fashion", name: "Fashion", icon: "👗" },
    { id: "beauty", name: "Beauty", icon: "💄" },
    { id: "sports", name: "Sports", icon: "⚽" },
    { id: "books", name: "Books", icon: "📚" },
    { id: "toys", name: "Toys", icon: "🧸" },
  ];

  // Handle scroll for category navigation arrows
  const handleCategoryScroll = (direction) => {
    const container = document.getElementById('category-scroll');
    if (!container) return;
    
    const scrollAmount = 200;
    if (direction === 'left') {
      container.scrollLeft -= scrollAmount;
    } else {
      container.scrollLeft += scrollAmount;
    }
    
    // Update arrow visibility after scroll
    setTimeout(() => {
      setShowLeftArrow(container.scrollLeft > 0);
      setShowRightArrow(container.scrollLeft < (container.scrollWidth - container.clientWidth));
    }, 100);
  };

  useEffect(() => {
    // Check initial scroll position
    const container = document.getElementById('category-scroll');
    if (container) {
      setShowLeftArrow(container.scrollLeft > 0);
      setShowRightArrow(container.scrollLeft < (container.scrollWidth - container.clientWidth));
    }

    // Featured Products
    setFeaturedProducts([
      {
        id: 1,
        name: "Wireless Bluetooth Headphones",
        price: 129.99,
        originalPrice: 199.99,
        rating: 4.8,
        category: "Electronics",
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop",
        isNew: true,
        discount: 35
      },
      {
        id: 2,
        name: "Organic Avocados (Pack of 6)",
        price: 8.99,
        rating: 4.6,
        category: "Grocery",
        image: "https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?w=400&h=300&fit=crop",
        isNew: false
      },
      {
        id: 3,
        name: "Smart Watch Series 5",
        price: 299.99,
        originalPrice: 399.99,
        rating: 4.9,
        category: "Electronics",
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=300&fit=crop",
        discount: 25
      },
      {
        id: 4,
        name: "Premium Coffee Beans (1kg)",
        price: 24.99,
        rating: 4.7,
        category: "Grocery",
        image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&h=300&fit=crop",
        isNew: true
      },
    ]);

    // Trending Products
    setTrendingProducts([
      {
        id: 5,
        name: "Yoga Mat Premium",
        price: 39.99,
        originalPrice: 59.99,
        rating: 4.5,
        category: "Fitness",
        image: "https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?w=400&h=300&fit=crop",
        isNew: true,
        discount: 33
      },
      {
        id: 6,
        name: "Wireless Charging Pad",
        price: 29.99,
        originalPrice: 49.99,
        rating: 4.3,
        category: "Electronics",
        image: "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=400&h=300&fit=crop",
        discount: 40
      },
      {
        id: 7,
        name: "Ceramic Dinner Set",
        price: 89.99,
        rating: 4.8,
        category: "Home & Kitchen",
        image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop",
        isNew: false
      },
      {
        id: 8,
        name: "Gaming Mouse RGB",
        price: 59.99,
        originalPrice: 79.99,
        rating: 4.4,
        category: "Electronics",
        image: "https://images.unsplash.com/photo-1527814050087-3793815479db?w=400&h=300&fit=crop",
        discount: 25
      },
    ]);
  }, []);

  const deals = [
    { 
      id: 1, 
      title: "Tech Tuesday", 
      discount: "30% OFF", 
      category: "Electronics",
      bgColor: "from-blue-500 to-purple-600",
      timeLeft: "24h 30m"
    },
    { 
      id: 2, 
      title: "Flash Sale", 
      discount: "50% OFF", 
      category: "Fashion",
      bgColor: "from-pink-500 to-rose-600",
      timeLeft: "12h 15m"
    },
    { 
      id: 3, 
      title: "Weekend Special", 
      discount: "25% OFF", 
      category: "Home",
      bgColor: "from-green-500 to-teal-600",
      timeLeft: "48h 00m"
    },
  ];

  const features = [
    {
      id: 1,
      icon: "🚚",
      title: "Free Delivery",
      description: "Free delivery on orders above $50"
    },
    {
      id: 2,
      icon: "🔄",
      title: "Easy Returns",
      description: "30-day return policy"
    },
    {
      id: 3,
      icon: "🔒",
      title: "Secure Payment",
      description: "100% secure & encrypted payments"
    },
    {
      id: 4,
      icon: "⭐",
      title: "Best Quality",
      description: "Quality checked products"
    }
  ];

  return (
    <>
      <Navbar />
      
      <main className="pt-20 px-4 md:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-16">
          {/* Category Navigation Bar */}
          <section className="mt-4">
            <div className="relative">
              {/* Left Arrow */}
              {showLeftArrow && (
                <button
                  onClick={() => handleCategoryScroll('left')}
                  className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 p-2 bg-white border border-gray-200 rounded-full shadow-lg hover:bg-gray-50 transition-all"
                  aria-label="Scroll left"
                >
                  <ChevronLeft className="w-4 h-4 text-gray-600" />
                </button>
              )}
              
              {/* Right Arrow */}
              {showRightArrow && (
                <button
                  onClick={() => handleCategoryScroll('right')}
                  className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 p-2 bg-white border border-gray-200 rounded-full shadow-lg hover:bg-gray-50 transition-all"
                  aria-label="Scroll right"
                >
                  <ChevronRight className="w-4 h-4 text-gray-600" />
                </button>
              )}
              
              {/* Categories Scroll Container */}
              <div
                id="category-scroll"
                className="flex gap-2 overflow-x-auto scrollbar-hide py-2 px-1"
                onScroll={(e) => {
                  const container = e.target;
                  setShowLeftArrow(container.scrollLeft > 0);
                  setShowRightArrow(container.scrollLeft < (container.scrollWidth - container.clientWidth - 10));
                }}
              >
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setActiveCategory(category.id)}
                    className={`flex-shrink-0 flex items-center gap-2 px-4 py-3 rounded-xl transition-all duration-200 ${
                      activeCategory === category.id
                        ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg"
                        : "bg-white border border-gray-200 text-gray-700 hover:border-blue-300 hover:shadow-md"
                    }`}
                  >
                    <span className="text-lg">{category.icon}</span>
                    <span className="font-medium whitespace-nowrap">{category.name}</span>
                  </button>
                ))}
              </div>
            </div>
          </section>

          {/* Hero Section */}
          <section>
            <HeroSection />
          </section>

          {/* Limited Time Offer Banner */}
          <section className="bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl p-6 md:p-8 text-white overflow-hidden relative">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/10 rounded-full translate-y-8 -translate-x-8"></div>
            
            <div className="relative z-10">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="max-w-2xl">
                  <span className="inline-block px-4 py-1.5 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium mb-4">
                    ⚡ Limited Time Offer
                  </span>
                  
                  <h2 className="text-3xl md:text-4xl font-bold mb-3">
                    Electronics Sale
                  </h2>
                  
                  <p className="text-lg opacity-90 mb-6">
                    Up to 50% OFF on premium electronics. Free shipping on all orders. Don't miss out!
                  </p>
                  
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-lg">
                      <Clock className="w-5 h-5" />
                      <span className="font-semibold">Ends in: 24h 30m</span>
                    </div>
                  </div>
                </div>
                
                <button className="flex-shrink-0 px-8 py-3.5 bg-white text-gray-900 font-semibold rounded-xl hover:bg-gray-100 transition-all hover:scale-105 shadow-lg">
                  Shop Now →
                </button>
              </div>
            </div>
          </section>

          {/* Categories Grid */}
          <section>
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-3xl font-bold text-gray-900">Shop by Category</h2>
                <p className="text-gray-600 mt-2">Browse products from popular categories</p>
              </div>
              <button className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium group">
                View All Categories
                <TrendingUp className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-4">
              {categories.slice(0, 8).map((category) => (
                <div 
                  key={category.id} 
                  className="group text-center p-4 bg-white rounded-xl border border-gray-200 hover:border-blue-300 hover:shadow-lg transition-all duration-300 cursor-pointer"
                  onClick={() => setActiveCategory(category.id)}
                >
                  <div className="w-16 h-16 mx-auto mb-3 rounded-xl bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                    {category.icon}
                  </div>
                  <h3 className="font-medium text-gray-900 group-hover:text-blue-600">{category.name}</h3>
                </div>
              ))}
            </div>
          </section>

          {/* Featured Products */}
          <section>
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <Sparkles className="w-6 h-6 text-amber-500" />
                <div>
                  <h2 className="text-3xl font-bold text-gray-900">Featured Products</h2>
                  <p className="text-gray-600 mt-1">Handpicked items just for you</p>
                </div>
              </div>
              <button className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                <ShoppingBag className="w-4 h-4" />
                View All Products
              </button>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </section>

          {/* Daily Deals */}
          <section>
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <Tag className="w-6 h-6 text-red-500" />
                <div>
                  <h2 className="text-3xl font-bold text-gray-900">Daily Deals</h2>
                  <p className="text-gray-600 mt-1">Don't miss these amazing offers</p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-red-600">
                <Clock className="w-4 h-4" />
                <span className="font-medium">Ends Soon</span>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {deals.map((deal) => (
                <div 
                  key={deal.id}
                  className={`relative overflow-hidden rounded-2xl bg-gradient-to-r ${deal.bgColor} p-6 text-white`}
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
                  
                  <div className="relative z-10">
                    <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm mb-4">
                      ⚡ Limited Time
                    </span>
                    
                    <h3 className="text-2xl font-bold mb-2">{deal.title}</h3>
                    <div className="text-4xl font-bold mb-3">{deal.discount}</div>
                    <p className="text-lg mb-6 opacity-90">on {deal.category} products</p>
                    
                    <div className="flex items-center justify-between">
                      <div className="text-sm">
                        <div className="opacity-80">Ends in</div>
                        <div className="font-bold text-xl">{deal.timeLeft}</div>
                      </div>
                      <button className="px-6 py-2.5 bg-white text-gray-900 font-semibold rounded-lg hover:bg-gray-100 transition-colors">
                        Shop Now
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Trending Products */}
          <section>
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <TrendingUp className="w-6 h-6 text-green-500" />
                <div>
                  <h2 className="text-3xl font-bold text-gray-900">Trending Now</h2>
                  <p className="text-gray-600 mt-1">Most popular products this week</p>
                </div>
              </div>
              <button className="text-blue-600 hover:text-blue-700 font-medium">
                See What's Hot →
              </button>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {trendingProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </section>

          {/* Why Choose Us */}
          <section>
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose SuperMarket?</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">We provide the best shopping experience with premium quality products and excellent customer service.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((feature) => (
                <div key={feature.id} className="flex flex-col items-center text-center p-6 bg-white rounded-2xl border border-gray-100 hover:border-blue-200 hover:shadow-lg transition-all duration-300">
                  <div className="w-20 h-20 rounded-xl bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center mb-6">
                    <span className="text-3xl">{feature.icon}</span>
                  </div>
                  
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>
    </>
  );
}