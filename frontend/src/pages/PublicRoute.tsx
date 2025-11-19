import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth.ts";
import { type ReactNode } from "react";
const PublicRoute = ({ children }: { children?: ReactNode }) => {
  const { user, loading } = useAuth();
  if (loading) return <div>Loading...</div>;

  if (user) return <Navigate to="/home" replace />;

  return children ? children : <Outlet />;
};

export default PublicRoute;
