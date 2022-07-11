import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux/es/exports";

const ProtectedRoute = () => {
   const { token } = useSelector((state) => state.user);

   if (!token) {
      return <Navigate to="/login" replace />;
   }

   return <Outlet />;
};

export default ProtectedRoute;
