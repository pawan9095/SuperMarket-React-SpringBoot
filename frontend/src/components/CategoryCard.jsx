import { ArrowRight } from "lucide-react";

export default function CategoryCard({ category }) {
  return (
    <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-white to-gray-50 border border-gray-100 hover:border-blue-200 transition-all duration-300">
      <div className="p-6">
        <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center mb-4">
          <span className="text-2xl">{category.icon}</span>
        </div>
        
        <h3 className="text-lg font-semibold text-gray-900 mb-2">{category.name}</h3>
        <p className="text-gray-600 text-sm mb-4">{category.count} items</p>
        
        <button className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium">
          Shop Now
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
      
      {/* Background Pattern */}
      <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-gradient-to-tr from-blue-50/50 to-purple-50/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
    </div>
  );
}