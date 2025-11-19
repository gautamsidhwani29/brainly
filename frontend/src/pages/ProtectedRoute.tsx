import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth.ts";
import { type ReactNode } from "react";
const ProtectedRoute = ({ children }: { children?: ReactNode }) => {
  const { user ,loading} = useAuth();
  if(loading) return <div>Loading...</div>

  if (!user) return <Navigate to="/login" replace />;

  return children ? children : <Outlet />;
};

export default ProtectedRoute;
