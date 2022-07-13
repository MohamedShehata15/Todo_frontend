import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL;

export const login = createAsyncThunk(
   "user/login",
   async (data, { rejectWithValue }) => {
      try {
         const response = await axios.post(`${BASE_URL}users/login`, data);

         if (response.status === 200) {
            localStorage.setItem("userData", JSON.stringify(response.data));

            return response.data;
         } else {
            return rejectWithValue(response.data);
         }
      } catch (err) {
         return rejectWithValue(err.response.data);
      }
   }
);

export const signup = createAsyncThunk(
   "user/signup",
   async (data, { rejectWithValue }) => {
      try {
         const response = await axios.post(`${BASE_URL}users/signup`, data);

         return response.data;
      } catch (err) {
         return rejectWithValue(err.response.data);
      }
   }
);

export const forgotPassword = createAsyncThunk(
   "user/forgot-password",
   async (data, { rejectWithValue }) => {
      try {
         await axios.post(`${BASE_URL}users/forgot-password`, data);
      } catch (err) {
         return rejectWithValue(err.response.data);
      }
   }
);

export const resetPassword = createAsyncThunk(
   "user/reset-password",
   async (data, { rejectWithValue }) => {
      try {
         await axios.patch(
            `${BASE_URL}users/reset-password/${data.resetToken}`,
            data
         );
      } catch (err) {
         return rejectWithValue(err.response.data);
      }
   }
);

export const emailVerification = createAsyncThunk(
   "user/email-verification",
   async (token, { rejectWithValue }) => {
      try {
         await axios.patch(`${BASE_URL}users/email-verification/${token}`);
      } catch (err) {
         return rejectWithValue(err.response.data);
      }
   }
);

const userSlice = createSlice({
   name: "user",
   initialState: {
      userDate: {},
      token: "",
      isFetching: false,
      isSuccess: false,
      isError: false,
      errorMessage: "",
      successMessage: "",
   },
   reducers: {
      clearState: (state) => {
         state.isError = false;
         state.isSuccess = false;
         state.isFetching = false;

         return state;
      },
   },
   extraReducers: {
      // Login
      [login.pending]: (state) => {
         state.isFetching = true;
      },
      [login.fulfilled]: (state, action) => {
         state.userDate = action.payload.user;
         state.token = action.payload.token;
         state.isError = false;
         state.isSuccess = true;

         localStorage.setItem("user", JSON.stringify(state.data));
      },
      [login.rejected]: (state, action) => {
         state.isError = true;
         state.errorMessage = action.payload.message;
         state.isSuccess = false;
      },

      // Signup
      [signup.pending]: (state) => {
         state.isFetching = true;
      },
      [signup.fulfilled]: (state, action) => {
         state.successMessage = action.payload.message;
         state.isError = false;
         state.isSuccess = true;
      },
      [signup.rejected]: (state, action) => {
         state.isError = true;
         state.errorMessage = action.payload.message;
         state.isSuccess = false;
      },

      // forgot password
      [forgotPassword.pending]: (state) => {
         state.isFetching = true;
      },
      [forgotPassword.fulfilled]: (state) => {
         state.isError = false;
         state.isSuccess = true;
         state.successMessage =
            "Password reset link has been sent to your email";
      },
      [forgotPassword.rejected]: (state, action) => {
         state.isError = true;
         state.errorMessage = action.payload.message;
         state.isSuccess = false;
      },

      // Reset Password
      [resetPassword.pending]: (state) => {
         state.isFetching = true;
      },
      [resetPassword.fulfilled]: (state) => {
         state.isError = false;
         state.isSuccess = true;
         state.successMessage =
            "Password has been reset successfully. Please Login to continue";
      },
      [resetPassword.rejected]: (state, action) => {
         state.isError = true;
         state.errorMessage = action.payload.message;
         state.isSuccess = false;
      },

      // Email Verification
      [emailVerification.pending]: (state) => {
         state.isFetching = true;
      },
      [emailVerification.fulfilled]: (state) => {
         state.isError = false;
         state.isSuccess = true;
         state.successMessage = "Email verified successfully";
      },
      [emailVerification.rejected]: (state, action) => {
         state.isError = true;
         state.errorMessage = action.payload.message;
         state.isSuccess = false;
      },
   },
});

export const { clearState } = userSlice.actions;

export default userSlice.reducer;
