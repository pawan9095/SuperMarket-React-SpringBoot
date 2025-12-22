import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import AuthCard from "../components/AuthCard";

export default function Otp() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");

  const verify = async () => {
    const res = await fetch("http://localhost:8080/verify-otp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: state.email,
        otp: Number(otp),
      }),
    });

    const text = await res.text();
    if (text === "VERIFIED") navigate("/login");
    else alert("Invalid OTP");
  };

  return (
    <AuthCard title="Verify OTP">
      <input
        className="w-full border p-2 rounded mb-4 text-center tracking-widest"
        placeholder="Enter OTP"
        value={otp}
        onChange={e => setOtp(e.target.value)}
      />
      <button
        onClick={verify}
        className="w-full bg-black text-white py-2 rounded"
      >
        Verify
      </button>
    </AuthCard>
  );
}
