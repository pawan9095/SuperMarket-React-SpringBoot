import { CreditCard, Plus, Trash2, Check } from "lucide-react";
import ProfileCard from "../ProfileCard";

export default function Payments({ user }) {
  const paymentMethods = [
    { id: 1, type: "Visa", last4: "4242", expiry: "12/25", isDefault: true },
    { id: 2, type: "MasterCard", last4: "8888", expiry: "08/24", isDefault: false },
    { id: 3, type: "PayPal", email: user.email, isDefault: false },
  ];

  return (
    <div className="space-y-6">
      <ProfileCard 
        title="Payment Methods"
        action="Add New"
        onClickAction={() => console.log("Add payment")}
      >
        <div className="space-y-4">
          {paymentMethods.map((method) => (
            <div 
              key={method.id}
              className="flex items-center justify-between p-4 border border-gray-200 rounded-xl hover:border-blue-300 transition-colors"
            >
              <div className="flex items-center gap-4">
                <div className="p-3 bg-blue-50 rounded-lg">
                  <CreditCard className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <div className="font-medium text-gray-900">
                    {method.type} •••• {method.last4}
                  </div>
                  <div className="text-sm text-gray-500">
                    {method.expiry ? `Expires ${method.expiry}` : method.email}
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                {method.isDefault && (
                  <span className="flex items-center gap-1 px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">
                    <Check className="w-3 h-3" /> Default
                  </span>
                )}
                <button className="p-2 text-gray-400 hover:text-red-500">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
        
        <button className="w-full mt-6 flex items-center justify-center gap-2 p-4 border-2 border-dashed border-gray-300 rounded-xl hover:border-blue-400 hover:bg-blue-50 transition-all">
          <Plus className="w-5 h-5" />
          <span className="font-medium text-gray-700">Add New Payment Method</span>
        </button>
      </ProfileCard>

      {/* Transaction History */}
      <ProfileCard title="Recent Transactions">
        <div className="space-y-3">
          {[
            { id: 1, description: "Premium Subscription", amount: "$9.99", date: "Today", status: "Completed" },
            { id: 2, description: "Online Purchase", amount: "$129.99", date: "Nov 15", status: "Completed" },
            { id: 3, description: "Grocery Order", amount: "$45.67", date: "Nov 10", status: "Refunded" },
          ].map((transaction) => (
            <div key={transaction.id} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg">
              <div>
                <div className="font-medium text-gray-900">{transaction.description}</div>
                <div className="text-sm text-gray-500">{transaction.date}</div>
              </div>
              <div className="text-right">
                <div className={`font-semibold ${
                  transaction.status === "Refunded" ? "text-red-600" : "text-gray-900"
                }`}>
                  {transaction.amount}
                </div>
                <div className={`text-xs px-2 py-1 rounded-full ${
                  transaction.status === "Completed" 
                    ? "bg-green-100 text-green-700" 
                    : "bg-red-100 text-red-700"
                }`}>
                  {transaction.status}
                </div>
              </div>
            </div>
          ))}
        </div>
      </ProfileCard>
    </div>
  );
}