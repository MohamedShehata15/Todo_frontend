import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import todoSlice from "./todoSlice";

export const store = configureStore({
   reducer: {
      user: userSlice,
      todos: todoSlice,
   },
});
