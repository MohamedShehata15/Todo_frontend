import React from "react";

const ModalView = ({ id, item, element }) => {
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
                        View - {item.title}
                     </h5>
                     <button
                        type="button"
                        className="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                     ></button>
                  </div>
                  <div className="modal-body">
                     <div className="box">
                        <p>
                           <span className="fw-bold">Title: </span>
                           {item.title}
                        </p>
                        <p>
                           <span className="fw-bold">Description: </span>
                           {item.description}
                        </p>
                        <p>
                           <span className="fw-bold">Status: </span>
                           {item.status}
                        </p>
                        <p>
                           <span className="fw-bold">Priority: </span>
                           {item.priority}
                        </p>
                        <p>
                           <span className="fw-bold">Start Date: </span>
                           {item.startDate}
                        </p>
                        <p>
                           <span className="fw-bold">End Date: </span>
                           {item.endDate}
                        </p>
                     </div>
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

export default ModalView;
