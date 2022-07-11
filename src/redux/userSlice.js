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

         return response.data;
      } catch (err) {
         return rejectWithValue(err.response.data);
      }
   }
);

export const register = createAsyncThunk(
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
      loading: false,
   },
   reducers: {},
   extraReducers: {
      [login.pending]: (state) => {
         state.loading = true;
         state.isFetching = true;
      },
      [login.fulfilled]: (state, action) => {
         state.userDate = action.payload.user;
         state.token = action.payload.token;
         state.loading = false;
         state.isError = false;
         state.isSuccess = true;

         localStorage.setItem("user", JSON.stringify(state.data));
      },
      [login.rejected]: (state, action) => {
         state.isError = true;
         state.errorMessage = action.payload.message;
         state.isSuccess = false;
         state.loading = false;
      },

      // Register
      [register.pending]: (state) => {
         state.loading = true;
      },
      [register.fulfilled]: (state, action) => {
         state.message = action.payload.message;
         state.loading = false;
         state.error = false;
      },
      [register.rejected]: (state, action) => {
         state.error = true;
         state.errObj = action.payload;
         state.loading = false;
      },
   },
});

export default userSlice.reducer;
