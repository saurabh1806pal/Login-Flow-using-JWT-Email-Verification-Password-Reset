import axios from "axios";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "../context/Context";
import { toast } from "react-toastify";

export default function Signup() {
  const navigate = useNavigate();
  const {API_URL, setIsLoggedIn, getUserData } = useContext(AppContext);
  const [form, setForm] = useState({
    firstname: "",
    lastname: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));

    // Live clear error on change
    setErrors((prev) => ({ ...prev, [name]: "" }));

    // Live confirm password check
    if (name === "confirmPassword" || name === "password") {
      const pw = name === "password" ? value : form.password;
      const cpw = name === "confirmPassword" ? value : form.confirmPassword;
      if (cpw && pw !== cpw) {
        setErrors((prev) => ({ ...prev, confirmPassword: "Passwords do not match." }));
      } else {
        setErrors((prev) => ({ ...prev, confirmPassword: "" }));
      }
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!form.firstname.trim()) newErrors.firstname = "First name is required.";
    if (!form.lastname.trim()) newErrors.lastname = "Last name is required.";
    if (!form.username.trim()) newErrors.username = "Username is required.";
    if (!form.email.trim()) newErrors.email = "Email is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      newErrors.email = "Enter a valid email.";
    if (!form.password) newErrors.password = "Password is required.";
    else if (form.password.length < 6)
      newErrors.password = "Password must be at least 6 characters.";
    if (!form.confirmPassword)
      newErrors.confirmPassword = "Please confirm your password.";
    else if (form.password !== form.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match.";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    try{
      axios.defaults.withCredentials = true;
      const {data} = await axios.post(`${API_URL}/api/auth/register`, {
        firstname: form.firstname.trim(),
        lastname: form.lastname.trim(),
        username: form.username.trim(),
        email: form.email.trim(),
        password: form.password
      }); 
      if(data.success){
        setIsLoggedIn(true);
        await getUserData();
        navigate('/');
      }else{
        toast.error(data.message);
      }
    }catch(error){
      toast.error(error.response?.data?.message || "Registration failed");
    }
  };

  const inputClass = (field) =>
    `w-full bg-slate-900 text-slate-100 text-sm rounded-lg px-4 py-2.5 border outline-none transition-colors duration-150 placeholder-slate-600 focus:border-violet-500 ${
      errors[field] ? "border-red-500/70" : "border-slate-700"
    }`;


  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">

        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-black tracking-tight text-white mb-1">
            IQ<span className="text-violet-400">orium</span>
          </h1>
          <p className="text-slate-500 text-sm">Create your account to get started</p>
        </div>

        {/* Card */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-xl shadow-black/40">

          <h2 className="text-lg font-bold text-white mb-6">Sign Up</h2>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">

            {/* First & Last Name */}
            <div className="grid grid-cols-2 gap-3">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-medium text-slate-400">First Name</label>
                <input
                  name="firstname"
                  value={form.firstname}
                  onChange={handleChange}
                  placeholder="John"
                  className={inputClass("firstname")}
                />
                {errors.firstname && (
                  <p className="text-xs text-red-400">{errors.firstname}</p>
                )}
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-medium text-slate-400">Last Name</label>
                <input
                  name="lastname"
                  value={form.lastname}
                  onChange={handleChange}
                  placeholder="Doe"
                  className={inputClass("lastname")}
                />
                {errors.lastname && (
                  <p className="text-xs text-red-400">{errors.lastname}</p>
                )}
              </div>
            </div>

            {/* Username */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-slate-400">Username</label>
              <input
                name="username"
                value={form.username}
                onChange={handleChange}
                placeholder="johndoe"
                className={inputClass("username")}
              />
              {errors.username && (
                <p className="text-xs text-red-400">{errors.username}</p>
              )}
            </div>

            {/* Email */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-slate-400">Email</label>
              <input
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                placeholder="john@example.com"
                className={inputClass("email")}
              />
              {errors.email && (
                <p className="text-xs text-red-400">{errors.email}</p>
              )}
            </div>

            {/* Password */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-slate-400">Password</label>
              <input
                name="password"
                type="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Min. 6 characters"
                className={inputClass("password")}
              />
              {errors.password && (
                <p className="text-xs text-red-400">{errors.password}</p>
              )}
            </div>

            {/* Confirm Password */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-slate-400">Confirm Password</label>
              <input
                name="confirmPassword"
                type="password"
                value={form.confirmPassword}
                onChange={handleChange}
                placeholder="Re-enter your password"
                className={inputClass("confirmPassword")}
              />
              {errors.confirmPassword && (
                <p className="text-xs text-red-400">{errors.confirmPassword}</p>
              )}
              {!errors.confirmPassword && form.confirmPassword && form.password === form.confirmPassword && (
                <p className="text-xs text-emerald-400">Passwords match ✓</p>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="mt-2 w-full bg-violet-600 hover:bg-violet-500 text-white text-sm font-semibold py-2.5 rounded-lg transition-colors duration-150 cursor-pointer border-0"
            >
              Create Account
            </button>

          </form>

          {/* Login Link */}
          <p className="text-center text-sm text-slate-500 mt-6">
            Already have an account?{" "}
            <Link to="/login" className="text-violet-400 hover:text-violet-300 font-medium transition-colors">
              Log in
            </Link>
          </p>

        </div>
      </div>
    </div>
  );
}