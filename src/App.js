import React from "react";
import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProtectedRoute from "./components/ProtectedRoute";

const App = () => {
   return (
      <div>
         <div>
            <Toaster />
         </div>
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
