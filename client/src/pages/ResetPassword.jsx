import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/Context";
import axios from "axios";
import { toast } from "react-toastify";

export default function ForgotPassword() {
const navigate = useNavigate();
const { API_URL } = useContext(AppContext);

const [email, setEmail] = useState("");
const [otp, setOtp] = useState("");
const [newPassword, setNewPassword] = useState("");
const [confirmPassword, setConfirmPassword] = useState("");
const [otpSent, setOtpSent] = useState(false);
const [loading, setLoading] = useState(false);

const inputClass =
"w-full bg-slate-900 text-slate-100 text-sm rounded-lg px-4 py-2.5 border border-slate-700 outline-none transition-colors duration-150 placeholder-slate-600 focus:border-violet-500";

const handleSendOtp = async () => {
if (!email) {
toast.error("Please enter your email");
return;
}


try {
  setLoading(true);
  axios.defaults.withCredentials = true;

  const { data } = await axios.post(
    `${API_URL}/api/auth/reset-password-otp`,
    { email }
  );

  if (data.success) {
    setOtpSent(true);
    toast.success("OTP sent to your email");
  } else {
    toast.error(data.message);
  }
} catch (error) {
  toast.error(error.response?.data?.message || "Failed to send OTP");
} finally {
  setLoading(false);
}


};

const handleResetPassword = async () => {
if (!otp) {
toast.error("Please enter the OTP");
return;
}


if (!newPassword || !confirmPassword) {
  toast.error("Please enter your new password");
  return;
}

if (newPassword !== confirmPassword) {
  toast.error("Passwords do not match");
  return;
}

try {
  setLoading(true);
  axios.defaults.withCredentials = true;

  const { data } = await axios.post(`${API_URL}/api/auth/reset-password`, {
    email,
    otp: otp.trim(),
    newPassword,
  });

  if (data.success) {
    toast.success("Password reset successfully");
    navigate("/login");
  } else {
    toast.error(data.message);
  }
} catch (error) {
  toast.error(error.response?.data?.message || "Password reset failed");
} finally {
  setLoading(false);
}


};

return ( <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4 py-12"> <div className="w-full max-w-sm">
{/* Header */} <div className="mb-8 text-center"> <h1 className="text-2xl font-black tracking-tight text-white mb-1">
IQ<span className="text-violet-400">orium</span> </h1> <p className="text-slate-500 text-sm">Reset your password</p> </div>


    {/* Card */}
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-xl shadow-black/40">
      <h2 className="text-lg font-bold text-white mb-6">Forgot Password</h2>

      <div className="flex flex-col gap-5">
        {/* Email */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-medium text-slate-400">Email</label>
          <input
            type="email"
            value={email}
            disabled={otpSent}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="john@example.com"
            className={`${inputClass} ${
              otpSent ? "opacity-50 cursor-not-allowed" : ""
            }`}
          />
        </div>

        {!otpSent && (
          <button
            onClick={handleSendOtp}
            disabled={loading}
            className="w-full bg-violet-600 hover:bg-violet-500 text-white text-sm font-semibold py-2.5 rounded-lg transition-colors duration-150 border-0"
          >
            {loading ? "Sending..." : "Send OTP"}
          </button>
        )}

        {otpSent && (
          <>
            {/* OTP */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-slate-400">OTP</label>
              <input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="Enter OTP"
                className={inputClass}
              />
            </div>

            {/* New Password */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-slate-400">
                New Password
              </label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Enter new password"
                className={inputClass}
              />
            </div>

            {/* Confirm Password */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-slate-400">
                Confirm Password
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Re-enter new password"
                className={inputClass}
              />

              {confirmPassword && newPassword !== confirmPassword && (
                <p className="text-xs text-red-400">
                  Passwords do not match
                </p>
              )}

              {confirmPassword && newPassword === confirmPassword && (
                <p className="text-xs text-emerald-400">
                  Passwords match ✓
                </p>
              )}
            </div>

            <button
              onClick={handleResetPassword}
              disabled={loading}
              className="w-full bg-violet-600 hover:bg-violet-500 text-white text-sm font-semibold py-2.5 rounded-lg transition-colors duration-150 border-0"
            >
              {loading ? "Resetting..." : "Reset Password"}
            </button>
          </>
        )}
      </div>
    </div>
  </div>
</div>


);
}
