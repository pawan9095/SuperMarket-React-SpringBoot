import {
  User, ShoppingBag, MapPin, Heart,
  CreditCard, Bell, Shield, Star,
  Settings, HelpCircle, Key
} from "lucide-react";

const tabs = [
  { id: "overview", label: "Overview", icon: User, badge: null },
  { id: "orders", label: "My Orders", icon: ShoppingBag, badge: "3" },
  { id: "address", label: "Addresses", icon: MapPin, badge: "2" },
  { id: "wishlist", label: "Wishlist", icon: Heart, badge: "7" },
  { id: "payments", label: "Payments", icon: CreditCard, badge: null },
  { id: "reviews", label: "My Reviews", icon: Star, badge: "8" },
  { id: "notifications", label: "Notifications", icon: Bell, badge: "2" },
  { id: "security", label: "Security", icon: Shield, badge: null },
  { id: "settings", label: "Settings", icon: Settings, badge: null },
];

export default function ProfileSidebar({ activeTab, setActiveTab }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden transition-all duration-300 hover:shadow-md">
      <div className="p-4 border-b border-gray-100">
        <h3 className="font-semibold text-gray-700">Account Settings</h3>
        <p className="text-sm text-gray-500">Manage your profile</p>
      </div>
      
      <nav className="divide-y divide-gray-100">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center justify-between px-5 py-4 transition-all duration-200 ${
                isActive
                  ? "bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-600 border-r-4 border-blue-500"
                  : "hover:bg-gray-50 text-gray-600 hover:text-gray-900"
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${
                  isActive ? "bg-blue-100" : "bg-gray-100"
                }`}>
                  <Icon className={`w-4 h-4 ${isActive ? "text-blue-600" : "text-gray-500"}`} />
                </div>
                <span className="font-medium">{tab.label}</span>
              </div>
              
              {tab.badge && (
                <span className={`px-2 py-1 text-xs rounded-full ${
                  isActive 
                    ? "bg-blue-100 text-blue-600" 
                    : "bg-gray-100 text-gray-600"
                }`}>
                  {tab.badge}
                </span>
              )}
            </button>
          );
        })}
      </nav>
      
      {/* Support section */}
      <div className="p-5 border-t border-gray-100 bg-gradient-to-r from-gray-50 to-white">
        <button className="w-full flex items-center gap-3 px-3 py-2.5 text-gray-600 hover:text-gray-900 hover:bg-white rounded-xl border border-gray-200 transition-colors">
          <HelpCircle className="w-4 h-4" />
          <span className="font-medium">Help & Support</span>
        </button>
        <button className="w-full flex items-center gap-3 px-3 py-2.5 mt-2 text-gray-600 hover:text-gray-900 hover:bg-white rounded-xl border border-gray-200 transition-colors">
          <Key className="w-4 h-4" />
          <span className="font-medium">Privacy Center</span>
        </button>
      </div>
    </div>
  );
}