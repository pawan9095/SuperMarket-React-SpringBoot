import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthCard from "../components/AuthCard";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const login = async () => {
    if (!email || !password) {
      alert("Email & Password required");
      return;
    }

    try {
      const res = await fetch("http://localhost:8080/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      // ❗ backend error handling
      if (!res.ok) {
        alert(await res.text());
        return;
      }

      const user = await res.json(); // ✅ USER OBJECT

      // ✅ save user for navbar
      localStorage.setItem("user", JSON.stringify(user));

      navigate("/home");
    } catch (err) {
      alert("Server error");
    }
  };

  return (
    <div className="mt-10">
      <AuthCard title="Login">
        <input
          className="w-full border p-2 rounded mb-4"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          className="w-full border p-2 rounded mb-4"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={login}
          className="w-full bg-black text-white py-2 rounded"
        >
          Login
        </button>
      </AuthCard>
    </div>
  );
}
