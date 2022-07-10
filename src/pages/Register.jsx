import React from "react";
import { Link } from "react-router-dom";

import "./pages.css";

const Register = () => {
   return (
      <div className="form-container d-flex justify-content-center align-items-center vh-100">
         <div className="form m-auto">
            <h2 className="text-center mb-3">Register</h2>
            <form className="bg-white p-5">
               <div className="icon d-flex justify-content-center align-items-center">
                  <span className="fa-solid fa-user"></span>
               </div>
               <div className="mb-3">
                  <input
                     type="text"
                     className="form-control"
                     placeholder="Name"
                  />
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
                  <input
                     type="password"
                     className="form-control"
                     placeholder="Password Confirmation"
                  />
               </div>
               <button type="submit" className="btn btn-primary w-100">
                  Sign up
               </button>
            </form>
            <p className="mt-5 text-center">
               Do have an account?{" "}
               <Link to="/login" className="border-bottom-1 py-2">
                  Login
               </Link>
            </p>
         </div>
      </div>
   );
};

export default Register;
