import React from "react";
import { Draggable } from "react-beautiful-dnd";

import "../app.css";

const ListItem = ({ item, index }) => {
   return (
      <Draggable draggableId={`${item.todoId}`} index={index}>
         {(provided, snapshot) => {
            return (
               <div
                  className="drag_item"
                  ref={provided.innerRef}
                  snapshot={snapshot}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
               >
                  <div className="d-flex justify-content-around">
                     <span>{item.title}</span>
                     <span className="priority">{item.priority}</span>
                     <div className="controllers">
                        <em className="fa fa-eye text-info" />
                        <em className="fa fa-edit ms-2 text-primary" />
                        <em className="fa fa-trash ms-2 text-danger" />
                     </div>
                  </div>
               </div>
            );
         }}
      </Draggable>
   );
};

export default ListItem;
