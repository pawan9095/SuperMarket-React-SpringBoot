import { TrendingUp, Award, Clock, CheckCircle } from "lucide-react";

export default function ProfileStats({ user }) {
  const stats = [
    {
      title: "Member Level",
      value: "Gold",
      icon: Award,
      color: "text-amber-600",
      bgColor: "bg-amber-50",
      progress: 75
    },
    {
      title: "Response Time",
      value: "< 2 hrs",
      icon: Clock,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      subtitle: "Avg. reply time"
    },
    {
      title: "Order Completion",
      value: "98%",
      icon: CheckCircle,
      color: "text-green-600",
      bgColor: "bg-green-50",
      subtitle: "Success rate"
    },
    {
      title: "Activity Score",
      value: "4.8",
      icon: TrendingUp,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      subtitle: "Out of 5.0"
    }
  ];

  return (
    <div className="bg-gradient-to-br from-gray-900 to-black rounded-2xl p-6 text-white">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-bold">Profile Stats</h3>
          <p className="text-gray-300 text-sm">Your account performance</p>
        </div>
        <div className="px-3 py-1 bg-white/10 rounded-full text-sm">
          This Month
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white/5 rounded-xl p-4 backdrop-blur-sm">
              <div className="flex items-center gap-3 mb-2">
                <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                  <Icon className={`w-4 h-4 ${stat.color}`} />
                </div>
                <div>
                  <div className="text-sm text-gray-300">{stat.title}</div>
                  <div className="text-2xl font-bold">{stat.value}</div>
                </div>
              </div>
              
              {stat.progress ? (
                <div className="mt-3">
                  <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                    <div 
                      className={`h-full ${stat.bgColor.replace('bg-', 'bg-').replace('50', '400')}`}
                      style={{ width: `${stat.progress}%` }}
                    ></div>
                  </div>
                  <div className="text-xs text-gray-400 mt-1">
                    {stat.progress}% to next level
                  </div>
                </div>
              ) : (
                <div className="text-xs text-gray-400">{stat.subtitle}</div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}