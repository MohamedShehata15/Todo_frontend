import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import authHeader from "./../helpers/authHeader";

const organizeTodos = (todos) => {
   const lists = ["todo", "in progress", "under review", "rework", "completed"];

   const result = lists.reduce(
      (acc, listKey) => ({
         ...acc,
         [listKey]: todos.filter((todo) => todo.status === listKey),
      }),
      {}
   );

   return result;
};

/**
 * @description: Initial state of the todos list
 */
export const getAllTodos = createAsyncThunk(
   "todos/getAll",
   async (_, { rejectWithValue }) => {
      try {
         const response = await axios.get("http://localhost:4000/todos", {
            headers: authHeader(),
         });

         if (response.status === 200) {
            return organizeTodos(response.data.todos);
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
   async (data, { dispatch, rejectWithValue }) => {
      if (data.action.type === "move") dispatch(moveTodo(data.action.data));

      try {
         const response = await axios.patch(
            `http://localhost:4000/todos/${data.id}`,
            data.bodyData,
            {
               headers: authHeader(),
            }
         );
      } catch (err) {
         return rejectWithValue(err.response.data);
      }
   }
);

/**
 * @description: Remove todo list
 */
export const removeTodo = createAsyncThunk(
   "todos/delete",
   async ({ id, todoStatus, todoIndex }, { rejectWithValue, dispatch }) => {
      // Optimistic Delete
      dispatch(deleteTodoState({ id, todoStatus, todoIndex }));
      try {
         await axios.delete(`http://localhost:4000/todos/${id}`, {
            headers: authHeader(),
         });
      } catch (err) {
         return rejectWithValue(err.response.data);
      }
   }
);

const todoSlice = createSlice({
   name: "todo",
   initialState: {
      todosList: {},
      isFetching: false,
      isSuccess: false,
      isError: false,
      errorMessage: "",
      successMessage: "",
      deletedStatus: "",
   },
   reducers: {
      clearTodoState: (state) => {
         state.isError = false;
         state.isSuccess = false;
         state.isFetching = false;

         return state;
      },
      deleteTodoState: (state, action) => {
         state.todosList[action.payload.todoStatus].splice(
            action.payload.todoIndex,
            1
         );

         return state;
      },
      moveTodo: (state, action) => {
         const targetTodo = state.todosList[
            action.payload.source.droppableId
         ].splice(action.payload.source.index, 1);

         state.todosList[action.payload.destination.droppableId].splice(
            action.payload.destination.index,
            0,
            targetTodo[0]
         );

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
         state.todosList = action.payload;
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

   /**
    * Delete Todo
    */
   [removeTodo.pending]: (state) => {
      state.isFetching = true;
   },
   [removeTodo.fulfilled]: (state) => {
      state.isError = false;
      state.isSuccess = true;
   },
   [removeTodo.rejected]: (state) => {
      state.isError = true;
      state.isSuccess = false;
   },
});

export const {
   clearTodoState,
   deleteTodoState,
   removeFromList,
   moveTodo,
} = todoSlice.actions;

export default todoSlice.reducer;
