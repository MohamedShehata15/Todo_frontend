import React from "react";
import { Draggable } from "react-beautiful-dnd";

import "../app.css";
import { useDispatch } from "react-redux/es/exports";
import { removeTodo } from "./../redux/todoSlice";
import Modal from "./Modal";

const ListItem = ({ item, index }) => {
   const dispatch = useDispatch();

   const handleRemove = (id, todoStatus, todoIndex) => {
      dispatch(removeTodo({ id, todoStatus, todoIndex }));
   };

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

                        <Modal
                           element={
                              <em className="fa fa-edit ms-2 text-primary" />
                           }
                           id={`edit-${item._id}`}
                           item={item}
                           todoIndex={index}
                           action="update"
                        />
                        <em
                           className="fa fa-trash ms-2 text-danger"
                           onClick={() =>
                              handleRemove(item._id, item.status, index)
                           }
                        />
                     </div>
                  </div>
               </div>
            );
         }}
      </Draggable>
   );
};

export default ListItem;
