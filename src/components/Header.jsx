import React from "react";
import Modal from "./Modal";

import "../app.css";
import { useSelector } from "react-redux/es/exports";

const Header = () => {
   const username = JSON.parse(localStorage.getItem("userData")).user.name;

   return (
      <header>
         <div className="container d-flex p-3 justify-content-center align-items-center">
            <div className="create_todo me-5">
               <button className="create_todo_btn btn text-white">
                  Create Todo
               </button>
            </div>
            <div className="user">
               Hello, <span className="username">{username}</span>
            </div>
            <div className="logout ms-3">
               <em className="fa fa-sign-out-alt text-danger" />
            </div>
         </div>
      </header>
   );
};

export default Header;
