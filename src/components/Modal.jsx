import React from "react";
import { useForm } from "react-hook-form";

const Modal = ({ element, id, item }) => {
   const {
      register,
      handleSubmit,
      formState: { errors },
   } = useForm();

   const onSubmit = (data) => {
      // dispatch(login(data));
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
                              value={item && item.title}
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
                              value={item && item.description}
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
                           >
                              <option value="todo">Todo</option>
                              <option value="in progress">In Progress</option>
                              <option value="under review">Under Review</option>
                              <option value="rework">Rework</option>
                              <option value="completed">Completed</option>
                           </select>
                        </div>
                        <div className="mb-3">
                           <select
                              className="form-select"
                              aria-label="Default select example"
                           >
                              <option defaultValue>Select a Priority</option>
                              <option value="low">Low</option>
                              <option value="medium">Medium</option>
                              <option value="high">High</option>
                           </select>
                        </div>
                        <div className="mb-3">
                           <input
                              type="date"
                              className="form-control"
                              placeholder="End Date"
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
                        {/* {user.isError && (
                           <p className="text-danger">{user.errorMessage}</p>
                        )} */}

                        <button type="submit" className="btn btn-primary w-100">
                           Update
                        </button>

                        {/* <button
                           type="submit"
                           className={`btn btn-primary w-100 ${
                              user.isFetching ? "disabled" : ""
                           }`}
                        ></button> */}
                     </form>
                  </div>
                  <div className="modal-footer">
                     <button
                        type="button"
                        className="btn btn-secondary"
                        data-bs-dismiss="modal"
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
