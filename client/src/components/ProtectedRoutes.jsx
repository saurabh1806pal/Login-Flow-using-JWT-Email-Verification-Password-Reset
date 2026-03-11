import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AppContext } from "../context/Context";

export default function ProtectedRoute({ children }) {

  const { isLoggedIn, authLoading } = useContext(AppContext);

  // Prevent redirect before auth check finishes
  if (authLoading) {
    return <div className="text-center mt-10 text-slate-400">Loading...</div>;
  }

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  return children;
}