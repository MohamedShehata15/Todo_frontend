import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import authHeader from "./../helpers/authHeader";

/**
 * @description: Initial state of the todos list
 */
export const getAllTodos = createAsyncThunk(
   "todos/getAll",
   async (data, { rejectWithValue }) => {
      try {
         const response = await axios.get("http://localhost:4000/todos", {
            headers: authHeader(),
         });

         if (response.status === 200) {
            return response.data;
         } else {
            return rejectWithValue(response.data);
         }
      } catch (err) {
         return rejectWithValue(err.response.data);
      }
   }
);

/**
 * @description: Update todo list
 */
export const updateTodo = createAsyncThunk(
   "todos/update",
   async (data, { rejectWithValue }) => {
      try {
         const response = await axios.patch(
            `http://localhost:4000/todos/${data.id}`,
            data,
            {
               headers: authHeader(),
            }
         );
      } catch (err) {
         return rejectWithValue(err.response.data);
      }
   }
);

const todoSlice = createSlice({
   name: "todo",
   initialState: {
      todosList: [],
      isFetching: false,
      isSuccess: false,
      isError: false,
      errorMessage: "",
      successMessage: "",
   },
   reducers: {
      clearTodoState: (state) => {
         state.isError = false;
         state.isSuccess = false;
         state.isFetching = false;

         return state;
      },
   },
   extraReducers: {
      /**
       *
       * @param {Save All User's Todos}
       */
      [getAllTodos.pending]: (state) => {
         state.isFetching = true;
      },
      [getAllTodos.fulfilled]: (state, action) => {
         state.todosList = action.payload.todos;
         state.isError = false;
         state.isSuccess = true;
      },
      [getAllTodos.rejected]: (state, action) => {
         state.isError = true;
         state.isSuccess = false;
         state.errorMessage = action.payload.message;
      },
   },

   /**
    * Update Todo
    */
   [updateTodo.pending]: (state) => {
      state.isFetching = true;
   },
   [updateTodo.fulfilled]: (state, action) => {
      state.isError = false;
      state.isSuccess = true;
   },
   [updateTodo.rejected]: (state, action) => {
      state.isError = true;
      state.isSuccess = false;
      state.errorMessage = action.payload.message;
   },
});

export const { clearTodoState } = todoSlice.actions;

export default todoSlice.reducer;
