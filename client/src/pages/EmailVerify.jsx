import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/Context";
import axios from "axios";
import { toast } from "react-toastify";

export default function EmailVerify() {
  const navigate = useNavigate();
  const { API_URL, getUserData, userData } = useContext(AppContext);

  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);

  const inputClass =
    "w-full bg-slate-900 text-slate-100 text-sm rounded-lg px-4 py-2.5 border border-slate-700 outline-none transition-colors duration-150 placeholder-slate-600 focus:border-violet-500";

  const handleSendOtp = async () => {
    try {
      if(!userData || email !== userData.email){
        toast.error("Please enter your registered email");
        return;
      }
      axios.defaults.withCredentials = true;
      const { data } = await axios.post(`${API_URL}/api/auth/send-verify-otp`, { email });
      if (data.success) {
        setOtpSent(true);
        toast.success("OTP sent to your email");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to send OTP");
    }
  };

  const handleVerifyOtp = async () => {
    try {
      axios.defaults.withCredentials = true;
      const { data } = await axios.post(`${API_URL}/api/auth/verify-otp`, { email, otp });
      if (data.success) {
        await getUserData();
        toast.success("Email verified successfully");
        navigate("/");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Verification failed");
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-sm">

        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-black tracking-tight text-white mb-1">
            IQ<span className="text-violet-400">orium</span>
          </h1>
          <p className="text-slate-500 text-sm">Verify your email to continue</p>
        </div>

        {/* Card */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-xl shadow-black/40">
          <h2 className="text-lg font-bold text-white mb-6">Email Verification</h2>

          <div className="flex flex-col gap-5">

            {/* Email Row */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-slate-400">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="john@example.com"
                disabled={otpSent}
                className={`${inputClass} ${otpSent ? "opacity-50 cursor-not-allowed" : ""}`}
              />
            </div>

            {/* Send OTP Button — disappears after OTP is sent */}
            {!otpSent && (
              <button
                onClick={handleSendOtp}
                className="w-full bg-violet-600 hover:bg-violet-500 text-white text-sm font-semibold py-2.5 rounded-lg transition-colors duration-150 cursor-pointer border-0"
              >
                Send OTP
              </button>
            )}

            {/* OTP Row — appears after OTP is sent */}
            {otpSent && (
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-medium text-slate-400">OTP</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    placeholder="Enter OTP"
                    className={inputClass}
                  />
                  <button
                    onClick={handleVerifyOtp}
                    className="shrink-0 bg-violet-600 hover:bg-violet-500 text-white text-sm font-semibold px-4 rounded-lg transition-colors duration-150 cursor-pointer border-0"
                  >
                    Verify OTP
                  </button>
                </div>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}