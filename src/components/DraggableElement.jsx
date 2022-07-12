import React from "react";
import { Droppable } from "react-beautiful-dnd";
import ListItem from "./ListItem";

import "../app.css";

const DraggableElement = ({ name, todos }) => {
   return (
      <div className="droppable p-2">
         <p className="text-uppercase mb-2">{name}</p>

         {todos.length === 0 ? (
            <div
               className="spinner-border text-primary position-absolute top-50 start-50"
               role="status"
            ></div>
         ) : (
            <Droppable droppableId={name}>
               {(provided) => (
                  <div
                     {...provided.droppableProps}
                     ref={provided.innerRef}
                     className="h-100"
                  >
                     {todos[name] ? (
                        todos[name].map((item, index) => (
                           <ListItem
                              key={item.todoId}
                              item={item}
                              index={index}
                           />
                        ))
                     ) : (
                        <h1>No</h1>
                     )}
                     {provided.placeholder}
                  </div>
               )}
            </Droppable>
         )}
      </div>
   );
};

export default DraggableElement;
