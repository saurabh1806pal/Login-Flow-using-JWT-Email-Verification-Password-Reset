import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AppContext } from "../context/Context";

export default function PublicRoute({ children }) {

  const { isLoggedIn } = useContext(AppContext);

  if (isLoggedIn) {
    return <Navigate to="/" replace />;
  }

  return children;
}