import { useContext } from "react";
import { Navigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import { toast } from "react-toastify";

export default function ProtectedRoute({ children }) {
  const { user } = useContext(AuthContext);
  console.log("ProtectedRoute user:", user);

  // Ha nincs bejelentkezve vagy nincs jogosultság
  if (!user || typeof user.isadmin === "undefined" || user.isadmin < 70) {
    return <Navigate to="/login" replace />;
  }
  return children;
}