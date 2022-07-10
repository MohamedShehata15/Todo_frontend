import React from "react";
import { Link } from "react-router-dom";

import "./pages.css";

const Login = () => {
   return (
      <div className="form-container d-flex justify-content-center align-items-center vh-100">
         <div className="form m-auto">
            <h2 className="text-center mb-3">Login</h2>
            <form className="bg-white p-5">
               <div className="icon d-flex justify-content-center align-items-center">
                  <span className="fa-solid fa-user"></span>
               </div>
               <div className="mb-3">
                  <input
                     type="email"
                     className="form-control"
                     placeholder="Email"
                  />
               </div>
               <div className="mb-3">
                  <input
                     type="password"
                     className="form-control"
                     placeholder="Password"
                  />
               </div>
               <div className="mb-3">
                  <Link
                     to="/reset-password"
                     className="form-link text-decoration-none"
                  >
                     Forgot Password
                  </Link>
               </div>
               <button type="submit" className="btn btn-primary w-100">
                  Login
               </button>
            </form>
            <p className="mt-5 text-center">
               Don't have an account?{" "}
               <Link to="/register" className="border-bottom-1 py-2">
                  Sign up
               </Link>
            </p>
         </div>
      </div>
   );
};

export default Login;
