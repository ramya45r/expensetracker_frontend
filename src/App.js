import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./components/Dashboard";
import ExpenseForm from "./components/ExpenseForm";

function App() {

  return (
    <React.Fragment>
      <Router>
        <Routes>
      
              
                 <Route
                path="/register"
                element={<Register/>}
              />
              <Route
                path="/login"
                element={<Login/>}
              />
               <Route
                path="/dashboard"
                element={<Dashboard/>}
              />
               <Route
                path="/expenseform"
                element={<ExpenseForm/>}
              />
             
        </Routes>
      </Router>
    </React.Fragment>
  );
}

export default App;
