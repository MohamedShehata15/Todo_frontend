import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux/es/exports";
import { useNavigate } from "react-router-dom";

import { login } from "./../redux/userSlice";

import "./pages.css";
import axios from "axios";

const Login = () => {
   const [data, setData] = useState({});
   const user = useSelector((state) => state.user);
   const dispatch = useDispatch();
   const navigate = useNavigate();

   const handleChange = (e) => {
      setData({ ...data, [e.target.name]: e.target.value });
   };

   useEffect(() => {
      if (user.token) {
         navigate("/");
      }
   }, [user]);

   const handleSubmit = async (e) => {
      e.preventDefault();
      dispatch(login(data));
   };

   return (
      <div className="form-container d-flex justify-content-center align-items-center vh-100">
         <div className="form m-auto">
            <h2 className="text-center mb-3">Login {user.data.name}</h2>
            <form className="bg-white p-5" onSubmit={handleSubmit}>
               <div className="icon d-flex justify-content-center align-items-center">
                  <span className="fa-solid fa-user"></span>
               </div>
               <div className="mb-3">
                  <input
                     type="email"
                     className="form-control"
                     placeholder="Email"
                     name="email"
                     onChange={handleChange}
                  />
               </div>
               <div className="mb-3">
                  <input
                     type="password"
                     className="form-control"
                     placeholder="Password"
                     name="password"
                     onChange={handleChange}
                  />
               </div>
               {user.error && (
                  <p className="text-danger">{user.errObj.message}</p>
               )}
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
