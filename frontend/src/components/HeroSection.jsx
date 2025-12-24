import { ArrowRight, Play, ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";

export default function HeroSection() {
  const [playVideo, setPlayVideo] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [transitioning, setTransitioning] = useState(false);

  const slides = [
    {
      id: 1,
      tagline: "Summer Sale is Live",
      title: "Fresh Groceries",
      subtitle: "Delivered to Your Door",
      description: "Shop from 10,000+ products with same-day delivery. Quality guaranteed or money back.",
      cta: "Start Shopping",
      bgColor: "from-blue-600 via-purple-600 to-pink-600",
    },
    {
      id: 2,
      tagline: "Limited Time Offer",
      title: "Electronics Sale",
      subtitle: "Up to 50% OFF",
      description: "Premium gadgets and devices at unbeatable prices. Free shipping on all orders.",
      cta: "Shop Electronics",
      bgColor: "from-green-600 via-teal-600 to-cyan-600",
    },
    {
      id: 3,
      tagline: "New Arrivals",
      title: "Winter Collection",
      subtitle: "Stay Warm in Style",
      description: "Explore our latest fashion collection with premium quality materials.",
      cta: "Browse Collection",
      bgColor: "from-orange-600 via-red-600 to-pink-600",
    },
  ];

  // Auto slide every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => {
    if (transitioning) return;
    
    setTransitioning(true);
    setTimeout(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
      setTransitioning(false);
    }, 300);
  };

  const prevSlide = () => {
    if (transitioning) return;
    
    setTransitioning(true);
    setTimeout(() => {
      setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
      setTransitioning(false);
    }, 300);
  };

  const goToSlide = (index) => {
    if (transitioning || index === currentSlide) return;
    
    setTransitioning(true);
    setTimeout(() => {
      setCurrentSlide(index);
      setTransitioning(false);
    }, 300);
  };

  const current = slides[currentSlide];

  return (
    <section className="relative rounded-2xl overflow-hidden mt-8 h-[500px] md:h-[550px] lg:h-[600px]">
      {/* Background for all slides - fixed background */}
      <div className="absolute inset-0 bg-gray-100"></div>
      
      {/* Slides container */}
      <div className="relative h-full overflow-hidden">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-500 ${
              index === currentSlide 
                ? "opacity-100 z-10" 
                : "opacity-0 z-0 pointer-events-none"
            }`}
          >
            {/* Slide background */}
            <div className={`absolute inset-0 bg-gradient-to-r ${slide.bgColor}`}></div>
            
            {/* Overlay pattern */}
            <div className="absolute inset-0 bg-gradient-to-br from-black/5 to-transparent"></div>
            
            {/* Slide content - only visible for current slide */}
            <div className="relative h-full px-6 py-16 md:px-12 md:py-24 lg:py-28 flex items-center">
              <div className="max-w-3xl w-full">
                {/* Tagline */}
                <span className="inline-block px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm font-medium mb-6 animate-pulse">
                  🎉 {slide.tagline}
                </span>
                
                {/* Main Title */}
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight">
                  {slide.title}
                  <span className="block text-3xl md:text-4xl lg:text-5xl mt-2 font-medium opacity-95">
                    {slide.subtitle}
                  </span>
                </h1>
                
                {/* Description */}
                <p className="text-lg md:text-xl text-white/90 mb-10 max-w-2xl">
                  {slide.description}
                </p>
                
                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <button className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-white text-gray-900 font-semibold rounded-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 shadow-lg">
                    {slide.cta}
                    <ArrowRight className="w-5 h-5" />
                  </button>
                  
                  <button 
                    onClick={() => setPlayVideo(!playVideo)}
                    className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-white/20 backdrop-blur-sm text-white font-semibold rounded-xl hover:bg-white/30 transition-all border-2 border-white/30"
                  >
                    <Play className="w-5 h-5 fill-white" />
                    Watch Demo
                  </button>
                </div>
              </div>
            </div>
            
            {/* Decorative Elements for this slide */}
            <div className="absolute top-0 right-0 w-1/3 h-full">
              <div className="absolute -top-32 -right-32 w-96 h-96 bg-gradient-to-br from-white/10 to-transparent rounded-full"></div>
              <div className="absolute top-1/2 -right-12 w-48 h-48 bg-gradient-to-br from-pink-500/20 to-transparent rounded-full"></div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Navigation Arrows - Fixed positioning */}
      <button
        onClick={prevSlide}
        disabled={transitioning}
        className={`absolute left-4 top-1/2 transform -translate-y-1/2 z-30 p-3 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-all ${
          transitioning ? "opacity-50 cursor-not-allowed" : ""
        }`}
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-5 h-5 text-white" />
      </button>
      
      <button
        onClick={nextSlide}
        disabled={transitioning}
        className={`absolute right-4 top-1/2 transform -translate-y-1/2 z-30 p-3 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-all ${
          transitioning ? "opacity-50 cursor-not-allowed" : ""
        }`}
        aria-label="Next slide"
      >
        <ChevronRight className="w-5 h-5 text-white" />
      </button>
      
      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-3 z-30">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            disabled={transitioning}
            className={`w-3 h-3 rounded-full transition-all ${
              index === currentSlide 
                ? "bg-white w-8" 
                : "bg-white/50 hover:bg-white/70"
            } ${transitioning ? "cursor-not-allowed" : ""}`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
      
      {/* Progress Bar */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20 z-30">
        <div 
          className="h-full bg-white transition-all duration-5000 ease-linear"
          style={{ 
            width: transitioning ? "100%" : "0%",
            transition: transitioning ? "width 5s linear" : "none"
          }}
        ></div>
      </div>
      
      {/* Bottom wave decoration - Fixed to bottom */}
      <div className="absolute bottom-0 left-0 right-0 z-20">
        <svg className="w-full h-12" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path 
            d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
            opacity=".25" 
            className="fill-white"
          />
          <path 
            d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35,6.36,119.13-6.29,32.18-10.71,64.49-26.06,93.67-44.28C953.11,15.08,1037.61,7,1121.65,21.67c85,15,168.69,55.38,233,102.69,16,11.78,36.21,20.45,66,24V0Z"
            opacity=".5" 
            className="fill-white"
          />
          <path 
            d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"
            className="fill-white"
          />
        </svg>
      </div>
      
      {/* Video Modal */}
      {playVideo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
          <div className="relative w-full max-w-4xl mx-4">
            <button
              onClick={() => setPlayVideo(false)}
              className="absolute -top-12 right-0 text-white text-2xl hover:text-gray-300 z-50"
            >
              ✕
            </button>
            <div className="aspect-video bg-gray-900 rounded-xl overflow-hidden">
              <div className="w-full h-full flex items-center justify-center">
                <div className="text-center">
                  <div className="text-6xl mb-4">🎬</div>
                  <p className="text-white text-xl">Product Demo Video</p>
                  <p className="text-gray-400 mt-2">Video player would appear here</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}