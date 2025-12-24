import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Otp from "./pages/Otp";
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        {/* Routes with Navbar & Footer */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          {/* Add other pages that need navbar/footer here */}
        </Route>
        
        {/* Routes without Navbar & Footer (Auth pages) */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/otp" element={<Otp />} />
        
        {/* Redirect to home if route not found */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;