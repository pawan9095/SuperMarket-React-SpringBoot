import { CheckCircle, Clock, Package, Star, User, Mail, Phone, Calendar, Users, Award, Shield } from "lucide-react";

export default function Overview({ user }) {
  const recentActivity = [
    { id: 1, action: "Order Delivered", item: "Wireless Headphones", time: "2 hours ago", icon: Package },
    { id: 2, action: "Review Posted", item: "Smart Watch", time: "1 day ago", icon: Star },
    { id: 3, action: "Password Changed", item: "Security", time: "2 days ago", icon: CheckCircle },
    { id: 4, action: "Order Shipped", item: "Laptop Stand", time: "3 days ago", icon: Clock },
  ];

  const personalInfoFields = [
    {
      label: "Full Name",
      value: user.name || "Not set",
      icon: User,
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600",
      borderColor: "hover:border-blue-200"
    },
    {
      label: "Email Address",
      value: user.email,
      icon: Mail,
      iconBg: "bg-green-100",
      iconColor: "text-green-600",
      borderColor: "hover:border-green-200",
      badge: "Verified",
      badgeColor: "bg-green-100 text-green-800"
    },
    {
      label: "Phone Number",
      value: user.phone || "+1 (555) 123-4567",
      icon: Phone,
      iconBg: "bg-purple-100",
      iconColor: "text-purple-600",
      borderColor: "hover:border-purple-200",
      badge: "Not Verified",
      badgeColor: "bg-yellow-100 text-yellow-800"
    },
    {
      label: "Date of Birth",
      value: user.dob || "January 15, 1990",
      icon: Calendar,
      iconBg: "bg-pink-100",
      iconColor: "text-pink-600",
      borderColor: "hover:border-pink-200"
    },
    {
      label: "Gender",
      value: user.gender || "Prefer not to say",
      icon: Users,
      iconBg: "bg-indigo-100",
      iconColor: "text-indigo-600",
      borderColor: "hover:border-indigo-200"
    },
    {
      label: "Member Since",
      value: user.joinDate || "January 2023",
      icon: Award,
      iconBg: "bg-cyan-100",
      iconColor: "text-cyan-600",
      borderColor: "hover:border-cyan-200"
    }
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Card */}
      <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl p-6 text-white">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h2 className="text-2xl font-bold mb-2">Welcome back, {user.name?.split(' ')[0] || 'User'}! 👋</h2>
            <p className="opacity-90">Here's what's happening with your account today.</p>
          </div>
          <div className="bg-white/20 px-4 py-2 rounded-xl">
            <div className="text-sm opacity-90">Member Level</div>
            <div className="text-xl font-bold">Gold</div>
          </div>
        </div>
      </div>

      {/* Personal Information Section */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Personal Information</h2>
            <p className="text-gray-600 mt-1">Manage your personal details and preferences</p>
          </div>
          {/* <button className="flex items-center gap-2 px-4 py-2.5 text-blue-600 hover:text-blue-700 font-medium border border-blue-200 rounded-lg hover:bg-blue-50 transition-colors whitespace-nowrap">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
            Edit Information
          </button> */}
        </div>

        {/* Information Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {personalInfoFields.map((field, index) => {
            const Icon = field.icon;
            return (
              <div 
                key={index} 
                className={`p-4 border border-gray-200 rounded-xl transition-colors ${field.borderColor}`}
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className={`w-10 h-10 rounded-lg ${field.iconBg} flex items-center justify-center flex-shrink-0`}>
                    <Icon className={`w-5 h-5 ${field.iconColor}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-gray-700 truncate">{field.label}</div>
                    <div className="font-semibold text-gray-900 truncate">{field.value}</div>
                  </div>
                  {field.badge && (
                    <div className={`text-xs px-2 py-1 rounded-full ${field.badgeColor} flex-shrink-0`}>
                      {field.badge}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Security Note */}
        <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl">
          <div className="flex items-start gap-3">
            <Shield className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-sm text-blue-800">
                Your information is secured with end-to-end encryption. Some details may require verification for certain transactions.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity Section */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-6">Recent Activity</h3>
        
        <div className="space-y-4">
          {recentActivity.map((activity) => {
            const Icon = activity.icon;
            return (
              <div 
                key={activity.id} 
                className="flex items-center gap-4 p-4 hover:bg-gray-50 rounded-xl transition-colors border border-gray-100"
              >
                <div className="p-3 bg-blue-50 rounded-lg flex-shrink-0">
                  <Icon className="w-5 h-5 text-blue-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-gray-900 truncate">{activity.action}</div>
                  <div className="text-sm text-gray-600 truncate">{activity.item}</div>
                </div>
                <div className="text-sm text-gray-500 whitespace-nowrap flex-shrink-0">
                  {activity.time}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Account Overview Stats */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-6">Account Overview</h3>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "Total Orders", value: "12", color: "text-blue-600", bgColor: "bg-blue-100" },
            { label: "Pending", value: "2", color: "text-amber-600", bgColor: "bg-amber-100" },
            { label: "Wishlist Items", value: "7", color: "text-pink-600", bgColor: "bg-pink-100" },
            { label: "Reviews", value: "8", color: "text-green-600", bgColor: "bg-green-100" },
          ].map((stat, index) => (
            <div key={index} className="text-center p-4 rounded-xl border border-gray-200">
              <div className={`text-2xl font-bold mb-2 ${stat.color}`}>{stat.value}</div>
              <div className="text-sm font-medium text-gray-700">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}