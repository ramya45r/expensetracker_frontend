import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BudgetChart from './BudgetChart';
import ExpenseList from './ExpenseList';

const Dashboard = () => {
  const [expenses, setExpenses] = useState([]);
  const [budget, setBudget] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token');
      const res = await axios.get('http://localhost:5000/api/expenses', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setExpenses(res.data.expenses);
      setBudget(res.data.budget);
    };

    fetchData();
  }, []);

  return (
    <div>
      <h2>Expense Dashboard</h2>
      {/* <BudgetChart expenses={expenses} budget={budget} />
      <ExpenseList expenses={expenses} /> */}
    </div>
  );
};

export default Dashboard;
