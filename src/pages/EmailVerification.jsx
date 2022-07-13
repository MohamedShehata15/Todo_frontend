import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux/es/exports";
import { useParams } from "react-router-dom";
import { emailVerification } from "../redux/userSlice";
import toast from "react-hot-toast";

import { clearState } from "./../redux/userSlice";

const EmailVerification = () => {
   const user = useSelector((state) => state.user);
   const dispatch = useDispatch();
   const navigate = useNavigate();
   const params = useParams();

   useEffect(() => {
      dispatch(emailVerification(params.token));
   }, []);

   useEffect(() => {
      if (user.isSuccess) {
         toast.success(user.successMessage, {
            duration: 8000,
         });
         dispatch(clearState());
      }

      if (user.isError) {
         toast.error(user.errorMessage);
         dispatch(clearState());
      } else {
         toast.success("Email verified successfully", {
            duration: 8000,
         });
      }

      navigate("/login");
   }, [user.isSuccess, user.isError]);

   return <></>;
};

export default EmailVerification;
