import { MapPin, Edit, Trash2, Check, Plus } from "lucide-react";
import { useState } from "react";
import ProfileCard from "../ProfileCard";

export default function Address({ user }) {
  const [addresses, setAddresses] = useState([
    {
      id: 1,
      name: "Home",
      address: "123 Main St, New York, NY 10001",
      phone: "(555) 123-4567",
      isDefault: true,
    },
    {
      id: 2,
      name: "Work",
      address: "456 Park Ave, New York, NY 10016",
      phone: "(555) 987-6543",
      isDefault: false,
    },
  ]);

  const setDefaultAddress = (id) => {
    setAddresses(
      addresses.map((addr) => ({
        ...addr,
        isDefault: addr.id === id,
      }))
    );
  };

  const deleteAddress = (id) => {
    setAddresses(addresses.filter((addr) => addr.id !== id));
  };
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null);

  return (
    <div className="space-y-6">
      <ProfileCard
        title="Saved Addresses"
        action="Add New"
        onClickAction={() => console.log("Add address")}
      >
        <div className="grid md:grid-cols-2 gap-4">
          {addresses.map((address) => (
            <div
              key={address.id}
              className={`border rounded-xl p-4 transition-all ${
                address.isDefault
                  ? "border-blue-300 bg-blue-50"
                  : "border-gray-200 hover:border-blue-300"
              }`}
            >
              <div className="flex justify-between items-start mb-3">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-blue-600" />
                  <h4 className="font-semibold text-gray-900">
                    {address.name}
                  </h4>
                  {address.isDefault && (
                    <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">
                      Default
                    </span>
                  )}
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      setEditingAddress(address);
                      setIsEditOpen(true);
                    }}
                    className="p-1 text-gray-400 hover:text-blue-600"
                  >
                    <Edit className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => deleteAddress(address.id)}
                    className="p-1 text-gray-400 hover:text-red-600"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <p className="text-gray-700 mb-2">{address.address}</p>
              <p className="text-sm text-gray-600">Phone: {address.phone}</p>

              {!address.isDefault && (
                <button
                  onClick={() => setDefaultAddress(address.id)}
                  className="mt-3 flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700"
                >
                  <Check className="w-3 h-3" />
                  Set as default
                </button>
              )}
            </div>
          ))}
        </div>

        {addresses.length === 0 && (
          <div className="text-center py-8">
            <MapPin className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500 mb-4">No addresses saved yet</p>
            <button className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              <Plus className="w-4 h-4" />
              Add Your First Address
            </button>
          </div>
        )}
      </ProfileCard>

      {/* Add New Address Form */}
      {addresses.length > 0 && (
        <ProfileCard title="Add New Address">
          <div className="grid md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Address Name (e.g., Home, Work)"
              className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <input
              type="text"
              placeholder="Full Address"
              className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 md:col-span-2"
            />
            <input
              type="text"
              placeholder="City"
              className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <input
              type="text"
              placeholder="Zip Code"
              className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <input
              type="text"
              placeholder="Phone Number"
              className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 md:col-span-2"
            />
          </div>

          <div className="flex items-center gap-4 mt-6">
            <label className="flex items-center gap-2">
              <input type="checkbox" className="rounded text-blue-600" />
              <span className="text-sm text-gray-700">
                Set as default address
              </span>
            </label>
            <button className="ml-auto px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              Save Address
            </button>
          </div>
        </ProfileCard>
      )}

      {/* EDIT ADDRESS MODAL */}
      {isEditOpen && editingAddress && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white w-full max-w-lg rounded-2xl shadow-xl p-6 relative">
            <h3 className="text-lg font-semibold mb-4">Edit Address</h3>

            <div className="space-y-4">
              <input
                type="text"
                value={editingAddress.name}
                onChange={(e) =>
                  setEditingAddress({ ...editingAddress, name: e.target.value })
                }
                className="w-full px-4 py-3 border rounded-lg"
                placeholder="Address Name"
              />

              <input
                type="text"
                value={editingAddress.address}
                onChange={(e) =>
                  setEditingAddress({
                    ...editingAddress,
                    address: e.target.value,
                  })
                }
                className="w-full px-4 py-3 border rounded-lg"
                placeholder="Full Address"
              />

              <input
                type="text"
                value={editingAddress.phone}
                onChange={(e) =>
                  setEditingAddress({
                    ...editingAddress,
                    phone: e.target.value,
                  })
                }
                className="w-full px-4 py-3 border rounded-lg"
                placeholder="Phone Number"
              />

              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={editingAddress.isDefault}
                  onChange={(e) =>
                    setEditingAddress({
                      ...editingAddress,
                      isDefault: e.target.checked,
                    })
                  }
                  className="rounded text-blue-600"
                />
                <span className="text-sm">Set as default address</span>
              </label>
            </div>

            {/* ACTIONS */}
            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setIsEditOpen(false)}
                className="px-4 py-2 border rounded-lg"
              >
                Cancel
              </button>

              <button
                onClick={() => {
                  setAddresses((prev) =>
                    prev.map((addr) =>
                      addr.id === editingAddress.id
                        ? {
                            ...editingAddress,
                            isDefault: editingAddress.isDefault
                              ? true
                              : addr.isDefault,
                          }
                        : editingAddress.isDefault
                        ? { ...addr, isDefault: false }
                        : addr
                    )
                  );
                  setIsEditOpen(false);
                }}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
