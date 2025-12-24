import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  UserPlus, 
  ArrowLeft,
  Shield,
  CheckCircle,
  ShoppingBag,
  AlertCircle
} from "lucide-react";

export default function Signup() {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    
    // Clear previous messages
    setError("");
    
    // Basic validation
    if (!formData.email || !formData.password) {
      setError("Email and Password are required");
      return;
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError("Please enter a valid email address");
      return;
    }

    // Password length validation
    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters long");
      return;
    }

    setIsLoading(true);

    try {
      const res = await fetch("http://localhost:8080/signup", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify(formData),
      });

      // Handle response
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const text = await res.text();
      
      if (text === "OTP_SENT") {
        // Show success state
        setSuccess(true);
        
        // Navigate to OTP page after 1.5 seconds
        setTimeout(() => {
          navigate("/otp", { 
            state: { 
              email: formData.email,
              message: "OTP sent to your email. Please verify." 
            }
          });
        }, 1500);
      } else {
        setError("Signup failed. Please try again.");
      }
    } catch (err) {
      console.error("Signup error:", err);
      setError("Server error. Please check your connection.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (error) {
      setError("");
    }
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex flex-col">
        {/* Simple Header */}
        <div className="w-full py-4 px-6 border-b border-gray-200 bg-white">
    <div 
    onClick={() => navigate("/")}
    className="flex items-center gap-2 cursor-pointer w-fit hover:opacity-80 transition-opacity"
  >
    {/* Your logo image */}
    <img 
      src="/trolley.png" 
      alt="SuperMarket Logo" 
      className="h-10 w-10" 
    />
    <span className="text-xl font-bold text-gray-800">
      Super<span className="text-blue-600">Market</span>
    </span>
  </div>
</div>

        {/* Main Content */}
        <div className="flex-1 flex items-center justify-center p-4">
          <div className="w-full max-w-md">
            {/* Back Button */}
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 text-gray-600 hover:text-blue-600 mb-6 transition-colors group"
            >
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
              Back to Home
            </button>

            {/* Signup Card */}
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200">
              {/* Status Indicator */}
              <div className="h-2 bg-gradient-to-r from-blue-500 to-purple-500"></div>
              
              <div className="p-8">
                {/* Header */}
                <div className="text-center mb-8">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 mb-4">
                    {success ? (
                      <CheckCircle className="w-8 h-8 text-green-600" />
                    ) : (
                      <UserPlus className="w-8 h-8 text-blue-600" />
                    )}
                  </div>
                  <h2 className="text-3xl font-bold text-gray-800 mb-2">
                    {success ? "OTP Sent!" : "Create Account"}
                  </h2>
                  <p className="text-gray-500">
                    {success 
                      ? "Check your email for verification code" 
                      : "Join SuperMarket today"}
                  </p>
                </div>

                {/* Success Message */}
                {success && (
                  <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl text-center">
                    <div className="flex items-center justify-center gap-3 mb-3">
                      <CheckCircle className="w-6 h-6 text-green-600" />
                      <span className="text-green-800 font-medium">OTP Sent Successfully!</span>
                    </div>
                    <p className="text-green-700 text-sm">
                      We've sent a 6-digit OTP to <strong>{formData.email}</strong>
                    </p>
                    <p className="text-green-600 text-xs mt-2">
                      Redirecting to verification page...
                    </p>
                  </div>
                )}

                {/* Error Message */}
                {error && !success && (
                  <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-red-800 font-medium">Error</p>
                      <p className="text-red-600 text-sm mt-1">{error}</p>
                    </div>
                  </div>
                )}

                {/* Form (only show if not successful yet) */}
                {!success && (
                  <form onSubmit={handleSignup} className="space-y-6">
                    {/* Email Field */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Mail className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          type="email"
                          value={formData.email}
                          onChange={(e) => handleInputChange("email", e.target.value)}
                          className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 bg-gray-50 text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                          placeholder="you@example.com"
                          required
                          disabled={isLoading}
                        />
                      </div>
                      <p className="mt-2 text-xs text-gray-500">
                        We'll send a verification code to this email
                      </p>
                    </div>

                    {/* Password Field */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Password
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Lock className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          type={showPassword ? "text" : "password"}
                          value={formData.password}
                          onChange={(e) => handleInputChange("password", e.target.value)}
                          className="w-full pl-10 pr-12 py-3 rounded-xl border border-gray-300 bg-gray-50 text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                          placeholder="Create a password"
                          required
                          disabled={isLoading}
                          minLength="6"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute inset-y-0 right-0 pr-3 flex items-center"
                          disabled={isLoading}
                        >
                          {showPassword ? (
                            <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                          ) : (
                            <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                          )}
                        </button>
                      </div>
                      <p className="mt-2 text-xs text-gray-500">
                        Must be at least 6 characters long
                      </p>
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2"
                    >
                      {isLoading ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                          Sending OTP...
                        </>
                      ) : (
                        <>
                          <UserPlus className="w-5 h-5" />
                          Sign Up & Send OTP
                        </>
                      )}
                    </button>
                  </form>
                )}


                {/* Login Link */}
                {!success && (
                  <div className="text-center mt-8 pt-6 border-t border-gray-200">
                    <p className="text-gray-600">
                      Already have an account?{" "}
                      <Link
                        to="/login"
                        className="font-semibold text-blue-600 hover:text-blue-800 transition-colors"
                      >
                        Sign in here
                      </Link>
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}