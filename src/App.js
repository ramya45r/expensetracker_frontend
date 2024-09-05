import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./components/Dashboard";
import ExpenseForm from "./components/ExpenseForm";
import BudgetForm from "./components/BudgetForm";
import ProtectedRoute from "./ProtectedRoute";

function App() {
  return (
    <React.Fragment>
      <Router>
        <Routes>
          <Route path="/" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<ProtectedRoute element={<Dashboard />} />} />
          <Route path="/expenseform" element={<ProtectedRoute element={<ExpenseForm />} />} />
          <Route path="/budgetform" element={<ProtectedRoute element={<BudgetForm />} />} />
        </Routes>
      </Router>
    </React.Fragment>
  );
}

export default App;
