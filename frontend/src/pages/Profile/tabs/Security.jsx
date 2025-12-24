import { Shield, Key, Lock, Eye, EyeOff, CheckCircle, AlertCircle } from "lucide-react";
import { useState } from "react";
import ProfileCard from "../ProfileCard";

export default function Security({ user }) {
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [twoFactorEnabled, setTwoFactorEnabled] = useState(true);
  const [sessions, setSessions] = useState([
    { id: 1, device: "Chrome on Windows", location: "New York, US", lastActive: "Currently active", current: true },
    { id: 2, device: "Safari on iPhone", location: "San Francisco, US", lastActive: "2 hours ago", current: false },
    { id: 3, device: "Firefox on Mac", location: "London, UK", lastActive: "1 week ago", current: false },
  ]);

  const securityScore = 85; // Example score out of 100

  const handlePasswordChange = (e) => {
    setPasswordData({
      ...passwordData,
      [e.target.name]: e.target.value
    });
  };

  const handleChangePassword = () => {
    // Add password change logic here
    console.log("Changing password:", passwordData);
    // Reset form
    setPasswordData({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
  };

  const terminateSession = (id) => {
    setSessions(sessions.filter(session => session.id !== id));
  };

  return (
    <div className="space-y-6">
      {/* Security Score */}
      <ProfileCard>
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Shield className="w-5 h-5 text-green-600" />
              <h3 className="text-lg font-semibold text-gray-900">Security Score</h3>
            </div>
            <p className="text-gray-600">Your account security is good</p>
          </div>
          <div className="relative">
            <div className="w-24 h-24">
              <svg className="w-full h-full" viewBox="0 0 36 36">
                <path
                  d="M18 2.0845
                    a 15.9155 15.9155 0 0 1 0 31.831
                    a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="#E5E7EB"
                  strokeWidth="3"
                />
                <path
                  d="M18 2.0845
                    a 15.9155 15.9155 0 0 1 0 31.831
                    a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="#10B981"
                  strokeWidth="3"
                  strokeDasharray={`${securityScore}, 100`}
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-2xl font-bold">{securityScore}%</span>
              </div>
            </div>
          </div>
        </div>
      </ProfileCard>

      {/* Change Password */}
      <ProfileCard title="Change Password">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Current Password
            </label>
            <div className="relative">
              <input
                type={showCurrentPassword ? "text" : "password"}
                name="currentPassword"
                value={passwordData.currentPassword}
                onChange={handlePasswordChange}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter current password"
              />
              <button
                type="button"
                onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              >
                {showCurrentPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              New Password
            </label>
            <div className="relative">
              <input
                type={showNewPassword ? "text" : "password"}
                name="newPassword"
                value={passwordData.newPassword}
                onChange={handlePasswordChange}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter new password"
              />
              <button
                type="button"
                onClick={() => setShowNewPassword(!showNewPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              >
                {showNewPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Confirm New Password
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                value={passwordData.confirmPassword}
                onChange={handlePasswordChange}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Confirm new password"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              >
                {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          <button
            onClick={handleChangePassword}
            className="w-full py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
          >
            Update Password
          </button>
        </div>
      </ProfileCard>

      {/* Two-Factor Authentication */}
      <ProfileCard title="Two-Factor Authentication">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Key className="w-5 h-5 text-blue-600" />
              <span className="font-medium text-gray-900">2FA Status</span>
            </div>
            <p className="text-sm text-gray-600">
              {twoFactorEnabled 
                ? "Two-factor authentication is enabled" 
                : "Add an extra layer of security"}
            </p>
          </div>
          <button
            onClick={() => setTwoFactorEnabled(!twoFactorEnabled)}
            className={`px-4 py-2 rounded-lg font-medium ${
              twoFactorEnabled
                ? "bg-green-100 text-green-700 hover:bg-green-200"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            {twoFactorEnabled ? "Enabled" : "Enable"}
          </button>
        </div>
      </ProfileCard>

      {/* Active Sessions */}
      <ProfileCard title="Active Sessions">
        <div className="space-y-4">
          {sessions.map((session) => (
            <div key={session.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${
                  session.current ? "bg-blue-50" : "bg-gray-50"
                }`}>
                  <Lock className={`w-4 h-4 ${
                    session.current ? "text-blue-600" : "text-gray-500"
                  }`} />
                </div>
                <div>
                  <div className="font-medium text-gray-900">{session.device}</div>
                  <div className="text-sm text-gray-500">{session.location}</div>
                  <div className="text-xs text-gray-400">{session.lastActive}</div>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                {session.current && (
                  <span className="flex items-center gap-1 text-sm text-green-600">
                    <CheckCircle className="w-4 h-4" /> Current
                  </span>
                )}
                {!session.current && (
                  <button
                    onClick={() => terminateSession(session.id)}
                    className="text-sm text-red-600 hover:text-red-700"
                  >
                    Terminate
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
        
        <button className="w-full mt-4 py-2.5 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-blue-400 hover:text-blue-600 transition-colors">
          See all sessions
        </button>
      </ProfileCard>
    </div>
  );
}