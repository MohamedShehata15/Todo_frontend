import React, { useState, useEffect } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import { useSelector, useDispatch } from "react-redux/es/exports";

import DraggableElement from "./DraggableElement";
import { getAllTodos, updateTodo } from "../redux/todoSlice";

import "../app.css";
import Modal from "./Modal";

const lists = ["todo", "in progress", "under review", "rework", "completed"];

function DragList() {
   const [elements, setElements] = useState([]);

   const dispatch = useDispatch();
   const todos = useSelector((state) => state.todos);

   useEffect(() => {
      dispatch(getAllTodos());
   }, [todos.isFetching]);

   const onDragEnd = (result) => {
      const data = {
         action: {
            type: "move",
            data: {
               todoId: result.draggableId,
               destination: result.destination,
               source: result.source,
            },
         },
         id:
            todos.todosList[result.source.droppableId][result.source.index]._id,
         bodyData: { status: result.destination.droppableId },
      };

      dispatch(updateTodo(data));
   };

   return todos.isSuccess ? (
      <div className="drag_drop_container p-3">
         <Modal name="test" id="testId" />
         <DragDropContext onDragEnd={onDragEnd}>
            <div className="list">
               {lists.length !== 0 &&
                  lists.map((listName, index) => (
                     <DraggableElement
                        name={listName}
                        key={index}
                        todos={todos.todosList}
                     />
                  ))}
            </div>
         </DragDropContext>
      </div>
   ) : (
      <div
         className="spinner-border text-primary position-absolute top-50 start-50"
         role="status"
      ></div>
   );
}

export default DragList;
