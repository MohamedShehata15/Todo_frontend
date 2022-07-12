import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import jwt_decode from "jwt-decode";
import { toast } from "react-hot-toast";

const ProtectedRoute = () => {
   const user = JSON.parse(localStorage.getItem("userData") || null);

   if (!user) {
      return <Navigate to="/login" replace />;
   }

   if (user.token) {
      try {
         let decoded = jwt_decode(user.token);
         if (decoded.exp < Date.now() / 1000) {
            toast.error("Token expired");
            localStorage.removeItem("userData");
            return <Navigate to="/login" replace />;
         }
      } catch (err) {
         localStorage.removeItem("userData");
         toast.error(err.message);
      }
   } else {
      localStorage.removeItem("userData");
   }

   return <Outlet />;
};

export default ProtectedRoute;
