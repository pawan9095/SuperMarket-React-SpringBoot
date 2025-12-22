import { useState } from "react";
import { useNavigate } from "react-router-dom";


export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = async () => {
    if (!email || !password) {
      alert("Email and Password required");
      return;
    }

    try {
      const res = await fetch("http://localhost:8080/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const text = (await res.text()).trim();

      if (res.ok && text === "OTP_SENT") {
        navigate("/otp", { state: { email } });
      } else {
        alert("Signup failed");
      }
    } catch (err) {
      alert("Server error");
    }
  };

  return (
    <>
      {/* ✅ Navbar */}
      

      {/* ✅ Signup Card */}
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg">
          <h2 className="text-2xl font-bold text-center mb-6">
            Create Account
          </h2>

          <input
            className="w-full mb-4 px-4 py-2 border rounded-lg"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            className="w-full mb-6 px-4 py-2 border rounded-lg"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            onClick={handleSignup}
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Signup
          </button>
        </div>
      </div>
    </>
  );
}
