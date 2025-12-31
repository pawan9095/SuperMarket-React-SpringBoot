import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";

export default function EditProfile() {
  const navigate = useNavigate();
  const storedUser = JSON.parse(localStorage.getItem("user"));

  const [form, setForm] = useState({
    name: storedUser?.name || "",
    email: storedUser?.email || "",
    phone: storedUser?.phone || "",
    dob: storedUser?.dob || "",
    gender: storedUser?.gender || "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("http://localhost:8080/api/users/profile", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${storedUser.token}`,
      },
      body: JSON.stringify(form),
    });

    const updatedUser = await res.json();
    localStorage.setItem("user", JSON.stringify(updatedUser));
    navigate("/profile");
  };

  return (
    <>
      <Navbar />
      <div className="max-w-3xl mx-auto pt-24 px-4">
        <h1 className="text-2xl font-bold mb-6">Edit Profile</h1>

        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow space-y-4">
          <input
            name="name"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg"
          />

          <input
            name="email"
            value={form.email}
            disabled
            className="w-full p-3 border rounded-lg bg-gray-100"
          />

          <input
            name="phone"
            placeholder="Phone"
            value={form.phone}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg"
          />

          <input
            type="date"
            name="dob"
            value={form.dob}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg"
          />

          <select
            name="gender"
            value={form.gender}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg"
          >
            <option value="">Select Gender</option>
            <option value="MALE">Male</option>
            <option value="FEMALE">Female</option>
            <option value="NA">Prefer not to say</option>
          </select>

          <button className="w-full bg-blue-600 text-white py-3 rounded-lg">
            Save Changes
          </button>
        </form>
      </div>
    </>
  );
}
