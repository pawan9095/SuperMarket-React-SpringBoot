import { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { 
  Mail, 
  Shield, 
  ArrowLeft,
  CheckCircle,
  AlertCircle,
  RefreshCw,
  ShoppingBag
} from "lucide-react";

export default function Otp() {
  const location = useLocation();
  const navigate = useNavigate();
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const inputRefs = useRef([]);

  useEffect(() => {
    if (location.state?.email) {
      setEmail(location.state.email);
    } else {
      navigate("/signup");
    }
  }, [location, navigate]);

  const handleChange = (index, value) => {
    if (value.length > 1) {
      // Handle paste
      const pastedValue = value.slice(0, 6).split("");
      const newOtp = [...otp];
      pastedValue.forEach((char, i) => {
        if (index + i < 6) {
          newOtp[index + i] = char;
        }
      });
      setOtp(newOtp);
      
      // Focus next empty field
      const nextIndex = pastedValue.length + index;
      if (nextIndex < 6 && inputRefs.current[nextIndex]) {
        inputRefs.current[nextIndex].focus();
      }
      return;
    }

    // Single character input
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    const otpString = otp.join("");
    
    if (otpString.length !== 6) {
      setError("Please enter all 6 digits");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const res = await fetch("http://localhost:8080/verify-otp", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          email: email,
          otp: parseInt(otpString)
        }),
      });

      const text = await res.text();
      
      if (text === "VERIFIED") {
        setSuccess(true);
        
        // Redirect to login after success
        setTimeout(() => {
          navigate("/login", { 
            state: { 
              message: "Email verified successfully! Please login." 
            }
          });
        }, 2000);
      } else {
        setError("Invalid OTP. Please try again.");
      }
    } catch (err) {
      console.error("OTP verification error:", err);
      setError("Server error. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOtp = async () => {
    setIsLoading(true);
    setError("");

    try {
      const res = await fetch("http://localhost:8080/signup", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          email: email,
          password: "temp" // Backend expects password but won't use it for resend
        }),
      });

      const text = await res.text();
      
      if (text === "OTP_SENT") {
        // Clear OTP fields
        setOtp(["", "", "", "", "", ""]);
        setError("");
        alert("New OTP sent to your email!");
        if (inputRefs.current[0]) {
          inputRefs.current[0].focus();
        }
      } else {
        setError("Failed to resend OTP");
      }
    } catch (err) {
      setError("Failed to resend OTP");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex flex-col">
      {/* Header */}
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
            onClick={() => navigate("/signup")}
            className="flex items-center gap-2 text-gray-600 hover:text-blue-600 mb-6 transition-colors group"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            Back to Signup
          </button>

          {/* OTP Card */}
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200">
            <div className="h-2 bg-gradient-to-r from-blue-500 to-purple-500"></div>
            
            <div className="p-8">
              {/* Header */}
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 mb-4">
                  {success ? (
                    <CheckCircle className="w-8 h-8 text-green-600" />
                  ) : (
                    <Shield className="w-8 h-8 text-blue-600" />
                  )}
                </div>
                <h2 className="text-3xl font-bold text-gray-800 mb-2">
                  {success ? "Verified!" : "Verify OTP"}
                </h2>
                <div className="flex items-center justify-center gap-2 text-gray-500">
                  <Mail className="w-4 h-4" />
                  <span>{email}</span>
                </div>
              </div>

              {/* Success Message */}
              {success && (
                <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl text-center">
                  <div className="flex items-center justify-center gap-3 mb-3">
                    <CheckCircle className="w-6 h-6 text-green-600" />
                    <span className="text-green-800 font-medium">Email Verified Successfully!</span>
                  </div>
                  <p className="text-green-700 text-sm">
                    Redirecting to login page...
                  </p>
                </div>
              )}

              {/* Error Message */}
              {error && !success && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-red-800 font-medium">Verification Failed</p>
                    <p className="text-red-600 text-sm mt-1">{error}</p>
                  </div>
                </div>
              )}

              {/* OTP Form */}
              {!success && (
                <>
                  <div className="mb-8">
                    <p className="text-center text-gray-600 mb-6">
                      Enter the 6-digit code sent to your email
                    </p>
                    
                    <form onSubmit={handleVerify} className="space-y-6">
                      <div className="flex justify-center gap-2">
                        {otp.map((digit, index) => (
                          <input
                            key={index}
                            ref={(el) => (inputRefs.current[index] = el)}
                            type="text"
                            inputMode="numeric"
                            pattern="[0-9]*"
                            maxLength={1}
                            value={digit}
                            onChange={(e) => handleChange(index, e.target.value)}
                            onKeyDown={(e) => handleKeyDown(index, e)}
                            className="w-14 h-14 text-center text-2xl font-bold border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                            disabled={isLoading}
                          />
                        ))}
                      </div>

                      <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center gap-2"
                      >
                        {isLoading ? (
                          <>
                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                            Verifying...
                          </>
                        ) : (
                          <>
                            <Shield className="w-5 h-5" />
                            Verify OTP
                          </>
                        )}
                      </button>
                    </form>
                  </div>

                  {/* Resend OTP */}
                  <div className="text-center">
                    <p className="text-gray-500 mb-4">
                      Didn't receive the code?
                    </p>
                    <button
                      onClick={handleResendOtp}
                      disabled={isLoading}
                      className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <RefreshCw className="w-4 h-4" />
                      Resend OTP
                    </button>
                  </div>
                </>
              )}

              {/* Security Note */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <div className="flex items-start gap-3">
                  <Shield className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-gray-700">Security Notice</p>
                    <p className="text-xs text-gray-500 mt-1">
                      This OTP is valid for a limited time. Never share your OTP with anyone.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}