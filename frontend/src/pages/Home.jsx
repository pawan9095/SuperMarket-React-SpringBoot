import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import Footer

from "../components/Footer";
export default function Home() {
  const navigate = useNavigate();

  return (
    <>
      <Navbar />

      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
        <h1 className="text-2xl font-bold mb-6">Welcome</h1>

      </div>

       <Footer />
    </>
  );
}
