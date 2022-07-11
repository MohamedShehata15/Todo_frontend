import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";

import Login from "./pages/Login";
import Register from "./pages/Register";
import ProtectedRoute from "./hooks/ProtectedRoute";

const App = () => {
   return (
      <div>
         <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="" element={<ProtectedRoute />}>
               <Route path="/" element={<Home />} />
            </Route>
         </Routes>
      </div>
   );
};

export default App;
