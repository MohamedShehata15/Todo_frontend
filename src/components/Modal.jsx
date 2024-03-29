import React, { useRef } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux/es/exports";
import { createTodo, updateTodo } from "../redux/todoSlice";

const Modal = ({ element, id, item, todoIndex, action }) => {
   const {
      register,
      handleSubmit,
      formState: { errors },
   } = useForm();
   const dispatch = useDispatch();

   const closeRef = useRef();

   const onSubmit = (data) => {
      if (action === "update") {
         dispatch(
            updateTodo({
               id: item._id,
               bodyData: data,
               action: {
                  type: "update",
                  data: {
                     todoStatus: item.status,
                     todoIndex,
                     previousTodo: item.status,
                     todoId: item._id,
                  },
               },
            })
         );
      } else if (action === "create") {
         dispatch(createTodo(data));
      }

      if (Object.values(errors).length === 0) {
         closeRef.current.click();
      }
   };

   return (
      <div className="d-inline-block">
         <div
            className="d-inline-block"
            data-bs-toggle="modal"
            data-bs-target={`#${id}`}
         >
            {element}
         </div>

         <div
            className="modal fade"
            id={`${id}`}
            data-bs-keyboard="true"
            tabIndex="-1"
            aria-labelledby={`${id}Label`}
            aria-hidden="true"
         >
            <div className="modal-dialog">
               <div className="modal-content">
                  <div className="modal-header">
                     <h5 className="modal-title" id={`${id}Label`}>
                        Edit Todo
                     </h5>
                     <button
                        type="button"
                        className="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                     ></button>
                  </div>
                  <div className="modal-body">
                     <form
                        className="bg-white p-5"
                        onSubmit={handleSubmit(onSubmit)}
                     >
                        <div className="mb-3">
                           <input
                              type="text"
                              className="form-control"
                              placeholder="Title"
                              name="title"
                              defaultValue={item && item.title}
                              {...register("title", {
                                 required: "Title is required",
                              })}
                           />
                           {errors.title && (
                              <p className="text-danger">
                                 {errors.title.message}
                              </p>
                           )}
                        </div>
                        <div className="mb-3">
                           <input
                              type="text"
                              className="form-control"
                              placeholder="description"
                              {...register("description", {
                                 required: "description is required",
                              })}
                              defaultValue={item && item.description}
                           />
                           {errors.description && (
                              <p className="text-danger">
                                 {errors.description.message}
                              </p>
                           )}
                        </div>
                        <div className="mb-3">
                           <select
                              className="form-select"
                              aria-label="Default select example"
                              defaultValue={item && item.status}
                              {...register("status", {
                                 required: "status is required",
                                 validate: (value) =>
                                    value === "todo" ||
                                    value === "in progress" ||
                                    value === "under review" ||
                                    value === "rework" ||
                                    value === "completed"
                                       ? true
                                       : "status is required",
                              })}
                           >
                              <option defaultValue>Select a Status</option>
                              <option value="todo">Todo</option>
                              <option value="in progress">In Progress</option>
                              <option value="under review">Under Review</option>
                              <option value="rework">Rework</option>
                              <option value="completed">Completed</option>
                           </select>
                           {errors.status && (
                              <p className="text-danger">
                                 {errors.status.message}
                              </p>
                           )}
                        </div>
                        <div className="mb-3">
                           <select
                              className="form-select"
                              aria-label="Default select example"
                              defaultValue={item && item.priority}
                              {...register("priority", {
                                 required: "priority is required",
                                 validate: (value) =>
                                    value === "low" ||
                                    value === "medium" ||
                                    value === "high"
                                       ? true
                                       : "priority is required",
                              })}
                           >
                              <option defaultValue>Select a Priority</option>
                              <option value="low">Low</option>
                              <option value="medium">Medium</option>
                              <option value="high">High</option>
                           </select>
                           {errors.priority && (
                              <p className="text-danger">
                                 {errors.priority.message}
                              </p>
                           )}
                        </div>
                        <div className="mb-3">
                           <input
                              type="date"
                              className="form-control"
                              placeholder="End Date"
                              value={
                                 item &&
                                 new Date(item.endDate)
                                    .toISOString()
                                    .split("T")[0]
                              }
                              {...register("endDate", {
                                 required: "End Date is required",
                              })}
                           />
                           {errors.endDate && (
                              <p className="text-danger">
                                 {errors.endDate.message}
                              </p>
                           )}
                        </div>

                        <button type="submit" className="btn btn-primary w-100">
                           {action === "update" ? "Update" : "Create"}
                        </button>
                     </form>
                  </div>
                  <div className="modal-footer">
                     <button
                        type="button"
                        className="btn btn-secondary"
                        data-bs-dismiss="modal"
                        ref={closeRef}
                     >
                        Close
                     </button>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
};

export default Modal;
