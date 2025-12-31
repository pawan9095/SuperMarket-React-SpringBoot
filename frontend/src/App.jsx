import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Otp from "./pages/Otp";
import Profile from "./pages/Profile/Profile";
import EditProfile from "./pages/Profile/EditProfile";
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>

        {/* Routes with Navbar & Footer */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="profile" element={<Profile />} />
          <Route path="profile/edit" element={<EditProfile />} /> {/* ✅ FIX */}
        </Route>

        {/* Routes without Navbar & Footer */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/otp" element={<Otp />} />

        {/* Redirect */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
