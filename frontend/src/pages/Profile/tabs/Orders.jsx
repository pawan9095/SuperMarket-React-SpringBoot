import { Package, Truck, CheckCircle, Clock, Search, Filter } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Orders() {
  const navigate = useNavigate();

  const orders = [
    { id: "ORD-78945", date: "Nov 15, 2024", total: "$249.99", status: "Delivered", items: 2 },
    { id: "ORD-78944", date: "Nov 10, 2024", total: "$149.99", status: "Shipped", items: 1 },
    { id: "ORD-78943", date: "Nov 5, 2024", total: "$449.99", status: "Processing", items: 3 },
  ];

  const getStatusIcon = (status) => {
    switch (status) {
      case "Delivered": return <CheckCircle className="w-4 h-4 text-green-500" />;
      case "Shipped": return <Truck className="w-4 h-4 text-blue-500" />;
      case "Processing": return <Clock className="w-4 h-4 text-amber-500" />;
      default: return <Package className="w-4 h-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Delivered": return "bg-green-100 text-green-700";
      case "Shipped": return "bg-blue-100 text-blue-700";
      case "Processing": return "bg-amber-100 text-amber-700";
      default: return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">My Orders</h2>
          <p className="text-gray-500">Track, return, or buy things again</p>
        </div>
        
        <div className="flex gap-3">
          <div className="relative flex-1 md:w-64">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search orders..."
              className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 rounded-xl hover:bg-gray-50">
            <Filter className="w-4 h-4" />
            Filter
          </button>
        </div>
      </div>

      {/* Orders List */}
      {orders.length > 0 ? (
        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-3">
                      <Package className="w-5 h-5 text-gray-400" />
                      <div>
                        <div className="font-semibold text-gray-900">Order {order.id}</div>
                        <div className="text-sm text-gray-500">Placed on {order.date}</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-col md:items-end gap-2">
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                      {getStatusIcon(order.status)}
                      {order.status}
                    </span>
                    <div className="text-sm text-gray-500">{order.items} item(s)</div>
                  </div>
                </div>
                
                <div className="mt-6 pt-6 border-t border-gray-100 flex items-center justify-between">
                  <div>
                    <div className="text-sm text-gray-500">Total Amount</div>
                    <div className="text-xl font-bold text-gray-900">{order.total}</div>
                  </div>
                  
                  <div className="flex gap-3">
                    <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                      View Details
                    </button>
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                      Track Order
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        // Empty State
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center">
          <div className="max-w-md mx-auto">
            <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-r from-blue-100 to-purple-100 flex items-center justify-center">
              <Package className="w-12 h-12 text-blue-500" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No orders yet</h3>
            <p className="text-gray-500 mb-6">When you place an order, it will appear here.</p>
            <button
              onClick={() => navigate("/")}
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5"
            >
              Start Shopping
              <span className="text-lg">→</span>
            </button>
          </div>
        </div>
      )}
      
      {/* Recent Orders */}
      <div className="bg-gradient-to-r from-gray-50 to-white rounded-2xl p-6 border border-gray-100">
        <h3 className="font-semibold text-gray-900 mb-4">Quick Links</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {['Buy Again', 'Digital Orders', 'Cancelled Orders', 'Archive'].map((item) => (
            <button key={item} className="p-3 bg-white border border-gray-200 rounded-xl text-sm hover:border-blue-300 hover:bg-blue-50 transition-colors">
              {item}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}