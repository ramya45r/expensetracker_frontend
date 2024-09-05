import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BudgetChart from './BudgetChart';
import './Dashboard.css'; 
import { useNavigate } from 'react-router-dom';
import { CSVLink } from 'react-csv';

const Dashboard = () => {
  const [expenses, setExpenses] = useState([]);
  const [budget, setBudget] = useState(0);
  const [selectedCurrency, setSelectedCurrency] = useState('USD');
  const [exchangeRate, setExchangeRate] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [minAmount, setMinAmount] = useState('');
  const [maxAmount, setMaxAmount] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
const navigate=useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token');
      try {
        const res = await axios.get('http://localhost:5000/api/expenses', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setExpenses(res.data);
        setBudget(res.data.budget);
      } catch (err) {
        console.error('Error fetching expenses:', err);
      }
    };

    fetchData();
  }, []);

  const handleCurrencyChange = (e) => {
    setSelectedCurrency(e.target.value);
  };

  const convertToSelectedCurrency = (amount) => {
    return (amount * exchangeRate).toFixed(2);
  };

  const filteredExpenses = expenses.filter((expense) => {
    const categoryMatch = !selectedCategory || expense.category === selectedCategory;
    const dateMatch = (!startDate || new Date(expense.date) >= new Date(startDate)) &&
                      (!endDate || new Date(expense.date) <= new Date(endDate));
    return categoryMatch && dateMatch;
  });

  const handleDelete = async (expenseId) => {
    const token = localStorage.getItem('token');
    try {
      await axios.delete(`http://localhost:5000/api/expenses/${expenseId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setExpenses(expenses.filter(expense => expense._id !== expenseId));
    } catch (err) {
      console.error('Error deleting expense:', err);
    }
  };
  const [budgets, setBudgets] = useState([]);

  useEffect(() => {
    const fetchBudgets = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await axios.get('http://localhost:5000/api/budgets', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setBudgets(response.data);
      } catch (err) {
        console.error('Error fetching budgets:', err);
      }
    };

    fetchBudgets();
  }, []);
  const handlenavigate=()=>{
    navigate('/expenseform')
  }
  const handlebudget=()=>{
    navigate('/budgetform')
  }
  const csvData = expenses.map(expense => ({
    Date: new Date(expense.date).toLocaleDateString(),
    Amount: expense.amount,
    Category: expense.category,
    Description: expense.description,
  }));
  return (
    <div className="dashboard-container">
      <h2>Expense Dashboard</h2>
      <div className="currency-select">
        <button onClick={handlenavigate}>Create Expense</button>
        <button onClick={handlebudget}>Create Budget</button>

      </div>
      <BudgetChart expenses={expenses} budget={budgets} />
      <h3>Expense Filters</h3>
      <div className="category-select">
        <label htmlFor="category">Category: </label>
        <select id="category" value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
          <option value="">All</option>
          <option value="Groceries">Groceries</option>
          <option value="Utilities">Utilities</option>
          <option value="Entertainment">Entertainment</option>
          <option value="Travel">Travel</option>
          <option value="Transportation">Transportation</option>
          <option value="Healthcare">Healthcare</option>
          <option value="Education">Education</option>
          <option value="Other">Other</option>
        </select>
      </div>
      <div className="date-filters">
        <div>
          <label htmlFor="startDate">Start Date: </label>
          <input
            type="date"
            id="startDate"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="endDate">End Date: </label>
          <input
            type="date"
            id="endDate"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>
      </div>
      <h3>Expense History</h3>
      <ul className="expense-history">
        {filteredExpenses.map((expense) => (
          <li className="expense-item" key={expense._id}>
            {expense.category}: ${convertToSelectedCurrency(expense.amount)} on {new Date(expense.date).toLocaleDateString()}
            <button className="delete-button" onClick={() => handleDelete(expense._id)}>
              Delete
            </button>
          
          </li>
        ))}
      </ul>
      <CSVLink data={csvData} filename={"expense-report.csv"}>
        <button>Download CSV</button>
      </CSVLink>
    </div>
  );
};

export default Dashboard;
