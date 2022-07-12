import React, { useState, useEffect } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import { useSelector, useDispatch } from "react-redux/es/exports";

import DraggableElement from "./DraggableElement";
import { getAllTodos, updateTodo } from "../redux/todoSlice";

import "../app.css";

const removeFromList = (list, index) => {
   const result = Array.from(list);
   const [removed] = result.splice(index, 1);
   return [removed, result];
};

const addToList = (list, index, element) => {
   const result = Array.from(list);
   result.splice(index, 0, element);
   return result;
};

const lists = ["todo", "in progress", "under review", "rework", "completed"];

function DragList() {
   const [elements, setElements] = useState([]);

   const dispatch = useDispatch();
   const todos = useSelector((state) => state.todos);

   useEffect(() => {
      dispatch(getAllTodos());
   }, [todos.isFetching]);

   useEffect(() => {
      if (todos.todosList.length > 0) {
         const result = lists.reduce(
            (acc, listKey) => ({
               ...acc,
               [listKey]: todos.todosList.filter(
                  (todo) => todo.status === listKey
               ),
            }),
            {}
         );
         setElements(result);
      }
   }, [todos.isSuccess]);

   const onDragEnd = (result) => {
      if (!result.destination) {
         return;
      }
      const listCopy = { ...elements };

      const sourceList = listCopy[result.source.droppableId];

      const [removedElement, newSourceList] = removeFromList(
         sourceList,
         result.source.index
      );

      listCopy[result.source.droppableId] = newSourceList;
      const destinationList = listCopy[result.destination.droppableId];
      listCopy[result.destination.droppableId] = addToList(
         destinationList,
         result.destination.index,
         removedElement
      );

      const data = {
         id: removedElement._id,
         status: result.destination.droppableId,
      };
      dispatch(updateTodo(data));

      setElements(listCopy);
   };

   return todos.isSuccess ? (
      <div className="drag_drop_container p-3">
         <DragDropContext onDragEnd={onDragEnd}>
            <div className="list">
               {lists.length !== 0 &&
                  lists.map((listName, index) => (
                     <DraggableElement
                        name={listName}
                        key={index}
                        todos={elements}
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
