import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const login = createAsyncThunk(
   "user/login",
   async (data, { rejectWithValue }) => {
      try {
         const response = await axios.post(
            "http://localhost:4000/users/login",
            data
         );

         console.log(response.status);

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
         const response = await axios.post(
            "http://localhost:4000/users/signup",
            data
         );

         return response.data;
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
         state.loading = false;

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
   },
});

export const { clearState } = userSlice.actions;

export default userSlice.reducer;
