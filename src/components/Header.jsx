import React from "react";
import Modal from "./Modal";

import "../app.css";
import { useNavigate } from "react-router-dom";

const Header = () => {
   const navigate = useNavigate();
   const username = JSON.parse(localStorage.getItem("userData")).user.name;

   const logout = () => {
      localStorage.clear();
      navigate("/login");
   };

   return (
      <header>
         <div className="container d-flex p-3 justify-content-center align-items-center">
            <div className="create_todo me-5">
               <Modal
                  element={
                     <button className="create_todo_btn btn text-white">
                        Create Todo
                     </button>
                  }
                  action="create"
               />
            </div>
            <div className="user">
               Hello, <span className="username">{username}</span>
            </div>
            <div className="logout ms-3" onClick={logout}>
               <em className="fa fa-sign-out-alt text-danger" />
            </div>
         </div>
      </header>
   );
};

export default Header;
