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
         console.error("error");
         return rejectWithValue(err.response.data);
      }
   }
);

const userSlice = createSlice({
   name: "user",
   initialState: {
      data: {},
      loading: null,
      error: false,
      token: null,
      errObj: {},
   },
   reducers: {},
   extraReducers: {
      [login.pending]: (state, action) => {
         state.loading = true;
      },
      [login.fulfilled]: (state, action) => {
         state.data = action.payload.user;
         state.token = action.payload.token;
         state.loading = false;
         state.error = false;
      },
      [login.rejected]: (state, action) => {
         state.error = true;
         state.errObj = action.payload;
         state.loading = false;
      },
   },
});

export default userSlice.reducer;
