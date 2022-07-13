import React, { useEffect, useRef } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux/es/exports";
import { Navigate, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

import { resetPassword } from "../redux/userSlice";
import { clearState } from "../redux/userSlice";

import "./pages.css";

const ResetPassword = () => {
   const user = useSelector((state) => state.user);
   const params = useParams();
   const dispatch = useDispatch();
   const navigate = useNavigate();
   const {
      register,
      handleSubmit,
      watch,
      formState: { errors },
   } = useForm();
   const password = useRef({});

   password.current = watch("password", "");

   const onSubmit = (data) => {
      dispatch(resetPassword({ ...data, resetToken: params.token }));
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
            <h2 className="text-center mb-3">Login</h2>
            <form className="bg-white p-5" onSubmit={handleSubmit(onSubmit)}>
               <div className="icon d-flex justify-content-center align-items-center">
                  <span className="fa-solid fa-user"></span>
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

               {user.isError && (
                  <p className="text-danger">{user.errorMessage}</p>
               )}

               <button
                  type="submit"
                  className={`btn btn-primary w-100 ${
                     user.isFetching ? "disabled" : ""
                  }`}
               >
                  {user.isFetching ? (
                     <div
                        className="spinner-border text-light spinner-border-sm"
                        role="status"
                     ></div>
                  ) : (
                     "Reset Password"
                  )}
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

export default ResetPassword;
