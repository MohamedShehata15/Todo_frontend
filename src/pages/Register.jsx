import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux/es/exports";
import { clearState, signup } from "../redux/userSlice";
import { useForm } from "react-hook-form";
import { Navigate, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import "./pages.css";

const Register = () => {
   const dispatch = useDispatch();
   const user = useSelector((state) => state.user);
   const {
      register,
      handleSubmit,
      formState: { errors },
      watch,
   } = useForm();
   const navigate = useNavigate();
   const password = useRef({});

   password.current = watch("password", "");

   const onSubmit = (data) => {
      dispatch(signup(data));
   };

   useEffect(() => {
      dispatch(clearState());
   }, []);

   useEffect(() => {
      if (user.isSuccess) {
         toast.success(user.successMessage, {
            duration: 8000,
         });
         dispatch(clearState());
         navigate("/login");
      }

      if (user.isError) {
         toast.error(user.errorMessage);
         dispatch(clearState());
      }
   }, [user.isSuccess, user.isError]);

   return localStorage.getItem("userData") ? (
      <Navigate to="/" replace />
   ) : (
      <div className="form-container d-flex justify-content-center align-items-center vh-100">
         <div className="form m-auto">
            <h2 className="text-center mb-3">Register</h2>
            <form className="bg-white p-5" onSubmit={handleSubmit(onSubmit)}>
               <div className="icon d-flex justify-content-center align-items-center">
                  <span className="fa-solid fa-user"></span>
               </div>
               <div className="mb-3">
                  <input
                     type="text"
                     className="form-control"
                     placeholder="Name"
                     {...register("name", {
                        required: "Name is required",
                     })}
                  />
                  {errors.name && (
                     <p className="text-danger">{errors.name.message}</p>
                  )}
               </div>
               <div className="mb-3">
                  <input
                     type="email"
                     className="form-control"
                     placeholder="Email"
                     {...register("email", {
                        required: "Email is required",
                        pattern: {
                           value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                           message: "Invalid email address",
                        },
                     })}
                  />
                  {errors.email && (
                     <p className="text-danger">{errors.email.message}</p>
                  )}
               </div>
               <div className="mb-3">
                  <input
                     type="password"
                     className="form-control"
                     placeholder="Password"
                     name="password"
                     {...register("password", {
                        required: "Password is required",
                     })}
                  />
                  {errors.password && (
                     <p className="text-danger">{errors.password.message}</p>
                  )}
               </div>
               <div className="mb-3">
                  <input
                     type="password"
                     className="form-control"
                     placeholder="Password Confirmation"
                     name="passwordConfirmation"
                     {...register("passwordConfirmation", {
                        required: "Password Confirmation is required",
                        validate: (value) => {
                           if (value !== password.current)
                              return "Passwords do not match";
                        },
                     })}
                  />
                  {errors.passwordConfirmation && (
                     <p className="text-danger">
                        {errors.passwordConfirmation.message}
                     </p>
                  )}
               </div>
               <button
                  type="submit"
                  className={`btn btn-primary w-100  ${
                     user.isFetching ? "disabled" : ""
                  }`}
               >
                  {user.isFetching ? (
                     <div
                        className="spinner-border text-light spinner-border-sm"
                        role="status"
                     ></div>
                  ) : (
                     " Sign up"
                  )}
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
