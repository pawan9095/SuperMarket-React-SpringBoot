import { Bell, Check, Settings, Mail, ShoppingBag, Shield } from "lucide-react";
import { useState } from "react";
import ProfileCard from "../ProfileCard";

export default function Notifications({ user }) {
  const [notifications, setNotifications] = useState([
    { id: 1, type: "order", title: "Order Shipped", description: "Your order #78945 has been shipped", time: "2 hours ago", read: false },
    { id: 2, type: "security", title: "New Login", description: "New login from Chrome on Windows", time: "1 day ago", read: true },
    { id: 3, type: "promotion", title: "Special Offer", description: "Get 20% off on your next purchase", time: "2 days ago", read: false },
    { id: 4, type: "order", title: "Order Delivered", description: "Your order #78944 has been delivered", time: "3 days ago", read: true },
  ]);

  const [settings, setSettings] = useState({
    emailNotifications: true,
    pushNotifications: true,
    orderUpdates: true,
    promotions: false,
    securityAlerts: true,
  });

  const markAsRead = (id) => {
    setNotifications(notifications.map(notif => 
      notif.id === id ? { ...notif, read: true } : notif
    ));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(notif => ({ ...notif, read: true })));
  };

  const toggleSetting = (key) => {
    setSettings({ ...settings, [key]: !settings[key] });
  };

  const getIcon = (type) => {
    switch (type) {
      case "order": return <ShoppingBag className="w-5 h-5" />;
      case "security": return <Shield className="w-5 h-5" />;
      case "promotion": return <Mail className="w-5 h-5" />;
      default: return <Bell className="w-5 h-5" />;
    }
  };

  const getIconColor = (type) => {
    switch (type) {
      case "order": return "text-blue-600 bg-blue-50";
      case "security": return "text-green-600 bg-green-50";
      case "promotion": return "text-purple-600 bg-purple-50";
      default: return "text-gray-600 bg-gray-50";
    }
  };

  return (
    <div className="space-y-6">
      <ProfileCard 
        title="Recent Notifications"
        action="Mark all as read"
        onClickAction={markAllAsRead}
      >
        <div className="space-y-3">
          {notifications.map((notification) => (
            <div
              key={notification.id}
              className={`flex items-start gap-3 p-3 rounded-lg transition-all ${
                notification.read 
                  ? "bg-gray-50" 
                  : "bg-blue-50 border border-blue-100"
              }`}
            >
              <div className={`p-2 rounded-lg ${getIconColor(notification.type)}`}>
                {getIcon(notification.type)}
              </div>
              
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-medium text-gray-900">{notification.title}</h4>
                    <p className="text-sm text-gray-600">{notification.description}</p>
                  </div>
                  {!notification.read && (
                    <button
                      onClick={() => markAsRead(notification.id)}
                      className="ml-2 p-1 text-gray-400 hover:text-green-600"
                    >
                      <Check className="w-4 h-4" />
                    </button>
                  )}
                </div>
                <div className="text-xs text-gray-500 mt-1">{notification.time}</div>
              </div>
            </div>
          ))}
        </div>
        
        {notifications.length === 0 && (
          <div className="text-center py-8">
            <Bell className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500">No notifications yet</p>
          </div>
        )}
      </ProfileCard>

      {/* Notification Settings */}
      <ProfileCard 
        title="Notification Settings"
        action={<Settings className="w-4 h-4" />}
        onClickAction={() => console.log("Settings")}
      >
        <div className="space-y-4">
          {Object.entries(settings).map(([key, value]) => (
            <div key={key} className="flex items-center justify-between">
              <div>
                <div className="font-medium text-gray-900">
                  {key.split(/(?=[A-Z])/).join(' ')}
                </div>
                <div className="text-sm text-gray-500">
                  {key.includes('email') 
                    ? "Receive notifications via email" 
                    : key.includes('push') 
                    ? "Receive push notifications" 
                    : key.includes('order') 
                    ? "Updates about your orders" 
                    : key.includes('promotion') 
                    ? "Special offers and promotions" 
                    : "Security alerts and login notifications"}
                </div>
              </div>
              
              <button
                onClick={() => toggleSetting(key)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  value ? "bg-blue-600" : "bg-gray-300"
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    value ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>
            </div>
          ))}
        </div>
      </ProfileCard>
    </div>
  );
}